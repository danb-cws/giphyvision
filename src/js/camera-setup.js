/**
 * 1. MODULE feature detect webcam, return reference to handleVideo or error.
 *   Errors: no camera, no support for gUm, camera already in use, permission denied
 *   return a MediaStream object or an error
 *   if iOS, try file upload?
 */

// import * as config from './giphyvision-config';


function gUmFeatureDetect() {
  if (navigator.mediaDevices.getUserMedia !== undefined) {
    console.log('mediaDevices supported');
  }
  // lots of prefixes...
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia);
  // const hasGetUserMedia = 0;
  if (navigator.getUserMedia) {
    return true;
  }
  return false;
}


  // todo: stop any tracks currently running, eg mediaStream.getVideoTracks()[0].stop();


export default function cameraInit() {
  return new Promise((resolve, reject) => {
    if (!gUmFeatureDetect()) {
      reject({ noGetUserMediaSupport: true });
      return;
    }
    function cameraSuccess(stream) {
      resolve(stream);
    }
    function cameraFail(err) {
      reject(err);
    }
    navigator.getUserMedia({ video: { facingMode: 'environment' }, audio: false }, cameraSuccess, cameraFail);
  });
}
