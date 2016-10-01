/* GiphyVision client script:


- UI - go button invokes:
1. MODULE feature detect webcam, return reference to handleVideo or error.
Errors: no camera, no support for gUm, camera already in use, permission denied

2. MODULE show video stream, take image and export as base64

3. UI put base64 to preview, button to submit to service

*/

import * as config from './giphyvision-config';
import { camSetup, camStart } from './camera-setup';

console.log(`module says: ${camSetup()}`);


let canvas = '';

// camStart();
/* // lots of prefixes...
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia || navigator.mediaDevices.getUserMedia;

function handleVideo(stream) {
  config.uiVideoElem.src = window.URL.createObjectURL(stream);
}

function videoError(err) {
  console.log(`Failed (prob did not allow camera access?), error: ${err}`);
}

if (navigator.getUserMedia) {
  navigator.getUserMedia({ video: true, audio: false }, handleVideo, videoError);
} else {
  console.log('Failed, no support for getUserMedia');
} */

function sendImgData(base64data) {
  fetch(config.SERVICEURL, {
    method: 'post',
    mode: 'cors',
    body: base64data,
    headers: new Headers({
      'Content-Type': 'text/plain',
    }),
  }).then((response) => {
    if (response.ok) {
//    console.log(`yo, the response to browser is: ${response}`);
//    console.log( response.json());
      response.json().then((data) => {
        console.log(data);
      });
    } else {
      console.log('Network response was not ok.');
    }
  }).catch((err) => {
    console.log(`Fetch error returned to client: ${err.message}`);
  });
}

function captureImage() {
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'hiddenCanvas';
    canvas.style = 'display: none';
    document.body.appendChild(canvas);
  }
  canvas.width = config.uiVideoElem.videoWidth;
  canvas.height = config.uiVideoElem.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(config.uiVideoElem, 0, 0, canvas.width, canvas.height);
  // save canvas image as data url
  const dataURL = canvas.toDataURL();
  // set preview image src to dataURL
  config.uiImagePreview.src = dataURL;
  // send to sender fn
  sendImgData(dataURL);
}

function activateCam() {
  camStart();
  config.uiOnboardingElem.style = 'display: none';
}


// Bind a click to button to start webcam, ask permission
config.uiStartBtn.addEventListener('click', activateCam, false);

// Bind a click to button to capture an image from the video stream
config.uiCaptureBtn.addEventListener('click', captureImage, false);
