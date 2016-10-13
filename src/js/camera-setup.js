/**
 *   1. Feature detect webcam, return reference to handleVideo or error.
 *   Errors could be: no camera, no support for gUm, camera already in use, permission denied
 *   return a MediaStream object or an error
 *   2. Get how many cameras, if description matched 'back' use that one, if > 1 set up cam toggle ui
 */

import './get-user-media-polyfill';

let cameraId;
// const cameraId = '32949025b7e252647d4c6294ab19bd75c9607ce6cb83304a2384bedb5e9efa43';
let availableVideoInputs = 0;

function getConstraints() {
  return { audio: false, video: { facingMode: 'environment', deviceId: cameraId } };
}

export function cameraInit() {
  // console.log(cameraId);
  console.log(getConstraints());
  return new Promise((resolve, reject) => {
    function cameraSuccess(stream) {
      resolve(stream);
    }
    function cameraFail(err) {
      reject(err);
    }
    navigator.mediaDevices.getUserMedia(getConstraints())
      .then(cameraSuccess)
      .catch(cameraFail);
  });
}

export function enumerateDevices() {
  if (typeof navigator.mediaDevices.enumerateDevices !== 'undefined') {
    // console.log('enumerateDevices: ', navigator.mediaDevices.enumerateDevices());
    // List cameras.
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          if (device.kind === 'videoinput') {
            availableVideoInputs += 1;
            console.log(`availableVideoInputs: ${availableVideoInputs}`);
            console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
            if (device.label.indexOf('back')) {
              cameraId = device.deviceId;
              console.log(device.deviceId);
            }
          }
        });
      })
      .catch((err) => {
        console.log(`${err.name}: ${err.message}`);
      });
  }
}
