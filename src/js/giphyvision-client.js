/* GiphyVision client script:


- UI - go button invokes:
1. MODULE feature detect webcam, return reference to handleVideo or error.
Errors: no camera, no support for gUm, camera already in use, permission denied

2. MODULE show video stream, take image and export as base64

3. UI put base64 to preview, button to submit to service

*/

import * as config from './giphyvision-config';
import * as cameraInit from './camera-setup';
import captureStill from './capture-still';
import gcloudRequest from './gcloud-request';
import * as fileInputFallback from './file-input-fallback';
import * as mediaHandler from './media-handler';
import debounce from './utils/debounce';

function activateCam(e) {
  e.preventDefault();
  if (typeof Promise === 'undefined') {
    config.uiOnboardingElem.innerHTML = `<p>${config.errorTxtNoPromises} </p>`;
    return;
  }

  cameraInit.cameraInit().then((response) => {
    config.uiVideoElem.src = window.URL.createObjectURL(response);
    mediaHandler.mediaOnload();
    config.uiOnboardingElem.classList.add('hidden');
    config.uiCaptureBtn.removeAttribute('disabled');
  }, (error) => {
    if (error.message !== 'noGetUserMediaSupport') {
      config.uiOnboardingElem.innerHTML = `<p>${config.errorTxtCameraStart} ${error.name} </p>`;
      fileInputFallback.invokeFileInput();
    } else { // no getusermedia, so prob on ios or safari desktop
      config.uiOnboardingElem.innerHTML = `<p>${config.errorTxtNoGum}</p>`;
      fileInputFallback.invokeFileInput();
    }
  });
}

function captureImageAndSubmit(e) {
  e.preventDefault();
  config.uiCaptureBtn.disabled = true;
  gcloudRequest(captureStill());
}

function againRoute(e) {
  e.preventDefault();
  if (mediaHandler.whichMedia() === 'image') {
    fileInputFallback.pseudoClickFileInput();
  } else {
    config.uiStatusElem.innerHTML = '';
    config.uiRepeatBtn.setAttribute('style', 'display: none');
    config.uiCaptureBtn.setAttribute('style', 'display: inline-block');
    config.uiCaptureBtn.disabled = false;
    config.uiVideoElem.setAttribute('style', 'display: block');
    config.uiImagePreview.src = '';
  }
}

// Bind a click to button to start webcam, ask permission etc
config.uiStartBtn.addEventListener('click', activateCam, false);

// Bind a click to button to capture an image from the video stream
config.uiCaptureBtn.addEventListener('click', captureImageAndSubmit, false);

// Bind a click to reset button to try again
config.uiRepeatBtn.addEventListener('click', againRoute, false);

// adds class on portrait (note resize also runs on orientationchange)
const debouncedResize = debounce(() => {
  mediaHandler.aspectRatioSet();
}, 250);
window.addEventListener('resize', debouncedResize, false);

// work out how many cameras, which is back one
window.addEventListener('load', cameraInit.enumerateDevices, false);

// just to wake up dyno potentially a bit earlier in the ui flow (sleeps after 30min on heroku free plan)
fetch(`${config.SERVICE_URL}-ping`, {
  method: 'post',
  mode: 'cors',
  body: 'dummyReq',
  headers: new Headers({
    'Content-Type': 'text/plain',
  }),
});
