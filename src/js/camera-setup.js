/**
 *   1. Feature detect webcam
 *   Errors could be: no camera, no support for gUm, camera already in use, permission denied
 *   return a MediaStream object or an error
 *   2. Get how many cameras, if description ('label') of any of them contains 'back' or 'rear' default to that one,
 *   if > 1 set up cam toggle ui (no user permission required for this)
 */
import '../sass/cam-toggle.scss';
import * as config from './giphyvision-config';
import './get-user-media-polyfill';

let cameraId = 0;
let videoTrack;
const availableVideoInputs = [];
let currCamIndex = 0;
let camToggleElem;

const constraints = { audio: false, video: { facingMode: 'environment', deviceId: cameraId } }; // facingMode is not yet working in browsers

/* 1. */
export function cameraInit() {
  // console.log(`camera init:camerId is: ${cameraId}`);
  return new Promise((resolve, reject) => {
    function cameraSuccess(stream) {
      videoTrack = stream.getVideoTracks();
      resolve(stream);
    }
    function cameraFail(err) {
      reject(err);
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(cameraSuccess)
      .catch(cameraFail);
  });
}

export function cameraStop() {
  if (videoTrack) {
    videoTrack[0].stop();
  }
}

export function cameraRestart() {
  cameraInit().then((response) => {
    // config.uiVideoElem.src = window.URL.createObjectURL(response);
    config.uiVideoElem.srcObject = response;
  });
}

function cycleCameras(e) {
  e.preventDefault();
  cameraId = availableVideoInputs[currCamIndex].deviceId;
  videoTrack[0].stop();
  if (currCamIndex < (availableVideoInputs.length - 1)) { // cycle through cameras
    currCamIndex += 1;
  } else {
    currCamIndex = 0;
  }
  cameraInit().then((response) => {
    // config.uiVideoElem.src = window.URL.createObjectURL(response);
    config.uiVideoElem.srcObject = response;
  });
}

/* 2. */
export function enumerateDevices() {
  // if (typeof navigator.mediaDevices.enumerateDevices !== 'undefined') {
  if (navigator.mediaDevices || navigator.mediaDevices.enumerateDevices) {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          if (device.kind === 'videoinput') {
            availableVideoInputs.push(device);
            if (device.label.indexOf('back' || 'rear')) { // then set as default
              cameraId = device.deviceId;
            }
          }
        });
        if (availableVideoInputs.length > 1) {
          // console.log('multiple cameras detected');
          config.uiCaptureCtrls.insertAdjacentHTML('beforeend', `<a href="#" id="${config.uiCameraToggleId}">Toggle</a>`);
          camToggleElem = document.getElementById(`${config.uiCameraToggleId}`);
          camToggleElem.addEventListener('click', cycleCameras, false);
        }
      })
      .catch((err) => {
        console.log(`!!! enumerateDevices error: ${err.name}: ${err.message}`);
      });
  }
}
