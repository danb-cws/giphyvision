/* GiphyVision client script:


- UI - go button invokes:
1. MODULE feature detect webcam, return reference to handleVideo or error.
Errors: no camera, no support for gUm, camera already in use, permission denied

2. MODULE show video stream, take image and export as base64

3. UI put base64 to preview, button to submit to service

*/

import * as config from './giphyvision-config';
import cameraInit from './camera-setup';
import captureStill from './capture-still';
import gcloudRequest from './gcloud-request';


function activateCam(e) {
  e.preventDefault();
  cameraInit().then((response) => {
    config.uiVideoElem.src = window.URL.createObjectURL(response);
    config.uiOnboardingElem.classList.add('hide');
  }, (error) => {
    if (error === 'noGUM') {
      config.uiOnboardingElem.innerHTML = `<p>${config.errorTxtNoGum}</p>`;
    } else {
      config.uiOnboardingElem.innerHTML = `<p>${config.errorTxtCameraStart} ${error.name} </p>`;
    }
  });
}


function captureImageAndSubmit(e) {
  e.preventDefault();
  gcloudRequest(captureStill());
}

// Bind a click to button to start webcam, ask permission etc
config.uiStartBtn.addEventListener('click', activateCam, false);

// Bind a click to button to capture an image from the video stream
config.uiCaptureBtn.addEventListener('click', captureImageAndSubmit, false);
