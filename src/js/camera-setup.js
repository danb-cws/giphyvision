/**
 *   1. Feature detect webcam, return reference to handleVideo or error.
 *   Errors could be: no camera, no support for gUm, camera already in use, permission denied
 *   return a MediaStream object or an error
 *   2. Get how many cameras, if description matched 'back' use that one, if > 1 set up cam toggle ui
 */
import '../sass/cam-toggle.scss';
import * as config from './giphyvision-config';
import './get-user-media-polyfill';

let cameraId;
let videoTrack;
const availableVideoInputs = [];
let currCamIndex = 0;
let camToggleElem;

function getConstraints() {
  return { audio: false, video: { facingMode: 'environment', deviceId: cameraId } };
}

export function cameraInit() {
  // console.log(`camera init:camerId is: ${cameraId}`);
  // console.log(getConstraints());
  return new Promise((resolve, reject) => {
    function cameraSuccess(stream) {
      videoTrack = stream.getVideoTracks();
      resolve(stream);
    }
    function cameraFail(err) {
      reject(err);
    }
    // if (window.stream) {
    //   window.stream.getTracks().forEach((track) => {
    //     track.stop();
    //   });
    // }
    navigator.mediaDevices.getUserMedia(getConstraints())
      .then(cameraSuccess)
      .catch(cameraFail);
  });
}

function cycleCameras(e) {
  e.preventDefault();
  cameraId = availableVideoInputs[currCamIndex].deviceId;
  videoTrack[0].stop();
  cameraInit().then((response) => {
    config.uiVideoElem.src = window.URL.createObjectURL(response);
  });
  if (currCamIndex < (availableVideoInputs.length - 1)) { // cycle through cameras
    currCamIndex += 1;
  } else {
    currCamIndex = 0;
  }
}

export function enumerateDevices() {
  if (typeof navigator.mediaDevices.enumerateDevices !== 'undefined') {
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
