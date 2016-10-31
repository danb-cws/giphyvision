/* GiphyVision client script:


- UI - go button invokes:
1. MODULE feature detect webcam, return reference to handleVideo or error.
Errors: no camera, no support for gUm, camera already in use, permission denied

2. MODULE show video stream, take image and export as base64

3. UI put base64 to preview, button to submit to service

*/

import '../sass/spinner.scss';

import * as config from './giphyvision-config';
import * as cameraSetup from './camera-setup';
import captureStill from './capture-still';
import gcloudRequest from './gcloud-request';
import * as fileInputFallback from './file-input-fallback';
import * as mediaHandler from './media-handler';
import * as uiHandler from './uiHandler';
import debounce from './utils/debounce';

function activateCam(e) {
  e.preventDefault();
  if (typeof Promise === 'undefined') {
    config.uiOnboardingElem.innerHTML = `<p>${config.errorTxtNoPromises} </p>`;
    return;
  }

  cameraSetup.cameraInit().then((response) => {
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
  config.uiCaptureBtn.setAttribute('disabled', 'disabled');
  gcloudRequest(captureStill());
  cameraSetup.cameraStop();
  config.uiSpinner.classList.add('shown');
}

// Bind a click to button to start webcam, ask permission etc
config.uiStartBtn.addEventListener('click', activateCam, false);

// Bind a click to button to capture an image from the video stream
config.uiCaptureBtn.addEventListener('click', captureImageAndSubmit, false);

// Bind a click to reset button to try again
config.uiRepeatBtn.addEventListener('click', uiHandler.againRoute, false);

// adds class on portrait (note resize event also happens on orientationchange)
const debouncedResize = debounce(() => {
  mediaHandler.aspectRatioSet();
}, 250);
window.addEventListener('resize', debouncedResize, false);

// work out how many cameras, if possible which is back one
window.addEventListener('load', cameraSetup.enumerateDevices, false);

// error handler on image load, eg if user tries to upload non-image file
config.uiImagePreview.onerror = () => {
  config.uiStatusElem.innerHTML = '<span class="error">Not a valid image</span>';
  config.uiCaptureCtrls.setAttribute('style', 'display: none');
  config.uiRepeatBtn.setAttribute('style', 'display: inline-block');
  // config.uiCaptureBtn.setAttribute('disabled', 'disabled');
  // config.uiImagePreview.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent blank
  // uiHandler.againRoute();
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
