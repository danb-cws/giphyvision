/**
 * 1. MODULE feature detect webcam, return reference to handleVideo or error.
 *   Errors: no camera, no support for gUm, camera already in use, permission denied
 *   return a MediaStream object or an error
 *   if iOS, try file upload?
 */

import * as config from './giphyvision-config';

console.log('cam init');
// adapted polyfill from MDN:
function promisifiedOldGUM(constraints) {
  // First get hold of getUserMedia, if present
  const getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia);

  // if no getUserMedia - return a rejected promise with an error
  if (!getUserMedia) {
    console.log('no gum');
    return Promise.reject(new Error(`${config.errorTxtNoGum}`));
  }

  // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
  return new Promise((resolve, reject) => {
    getUserMedia.call(navigator, constraints, resolve, reject);
  });
}

// Older browsers might not implement mediaDevices at all, so we set an empty object first
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// Some browsers partially implement mediaDevices. We can't just assign an object
// with getUserMedia as it would overwrite existing properties.
// Here, we will just add the getUserMedia property if it's missing.
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
}
const constraints = { video: { facingMode: 'environment' }, audio: false };

export default function cameraInit() {
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


  // todo: stop any tracks currently running, eg mediaStream.getVideoTracks()[0].stop();

