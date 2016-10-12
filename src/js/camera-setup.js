/**
 *   feature detect webcam, return reference to handleVideo or error.
 *   Errors could be: no camera, no support for gUm, camera already in use, permission denied
 *   return a MediaStream object or an error
 */

import './get-user-media-polyfill';

const constraints = { video: { facingMode: 'environment' }, audio: false };

export default function cameraInit() {
  if (typeof navigator.mediaDevices.enumerateDevices !== 'undefined') {
    console.log('enumerateDevices: ', navigator.mediaDevices.enumerateDevices());
    // List cameras and microphones.
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
        });
      })
      .catch((err) => {
        console.log(`${err.name}: ${err.message}`);
      });
  }
  return new Promise((resolve, reject) => {
    function cameraSuccess(stream) {
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

