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
import againRoute from './uiHandler';
import debounce from './utils/debounce';

function activateCam(e) {
  console.log('++ activate cam fn');
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

// Bind a click to button to start webcam, ask permission etc
config.uiStartBtn.addEventListener('click', activateCam, false);

// Bind a click to button to capture an image from the video stream
config.uiCaptureBtn.addEventListener('click', captureImageAndSubmit, false);

// Bind a click to reset button to try again
config.uiRepeatBtn.addEventListener('click', againRoute, false);

// adds class on portrait (note resize event also happens on orientationchange)
const debouncedResize = debounce(() => {
  mediaHandler.aspectRatioSet();
}, 250);
window.addEventListener('resize', debouncedResize, false);

// work out how many cameras, if possible which is back one
window.addEventListener('load', cameraInit.enumerateDevices, false);

// error handler on image load, eg if user tries to upload non-image file
config.uiImagePreview.onerror = () => {
  config.uiStatusElem.innerHTML = '<span class="error">Error loading image</span>';
  config.uiCaptureCtrls.setAttribute('style', 'display: none');
  config.uiRepeatBtn.setAttribute('style', 'display: inline-block');
};

function toggleAbout(e) {
  e.preventDefault();
  config.uiAbout.classList.toggle('shown');
}
// Bind a click to h1 or x to toggle about screen (for now)
config.uiShowAbout.addEventListener('click', toggleAbout, false);
config.uiCloseAbout.addEventListener('click', toggleAbout, false);

// just to wake up dyno potentially a bit earlier in the ui flow (sleeps after 30min on heroku free plan)
fetch(`${config.SERVICE_URL}-ping`, {
  method: 'post',
  mode: 'cors',
  body: 'dummyReq',
  headers: new Headers({
    'Content-Type': 'text/plain',
  }),
});
