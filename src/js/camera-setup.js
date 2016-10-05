/**
 * 1. MODULE feature detect webcam, return reference to handleVideo or error.
 *   Errors: no camera, no support for gUm, camera already in use, permission denied
 *   return a MediaStream object or an error
 *   if iOS, try file upload?
 */

import './get-user-media-polyfill';

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

