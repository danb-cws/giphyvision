/* GiphyVision client script:


- UI - go button invokes:
1. MODULE feature detect webcam, return reference to handleVideo or error.
Errors: no camera, no support for gUm, camera already in use, permission denied

2. MODULE show video stream, take image and export as base64

3. UI put base64 to preview, button to submit to service

*/

import * as config from './giphyvision-config';
import { gUmFeatureDetect, camStart } from './camera-setup';
import captureStill from './capture-still';
import gcloudRequest from './gcloud-request';


function activateCam(e) {
  e.preventDefault();
  // todo: logic here for error handling. Cookie logic?

  if (!gUmFeatureDetect()) {
    config.uiOnboardingElem.innerHTML = config.errorTxtNoGum;
  } else {
    camStart();
  }
}

function captureImageAndSubmit(e) {
  e.preventDefault();
  gcloudRequest(captureStill());
}

// Bind a click to button to start webcam, ask permission
config.uiStartBtn.addEventListener('click', activateCam, false);

// Bind a click to button to capture an image from the video stream
config.uiCaptureBtn.addEventListener('click', captureImageAndSubmit, false);
