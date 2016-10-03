/**
 * 1. MODULE feature detect webcam, return reference to handleVideo or error.
 *   Errors: no camera, no support for gUm, camera already in use, permission denied
 *   return a MediaStream object or an error
 *   if iOS, try file upload?
 */

// import * as config from './giphyvision-config';


function gUmFeatureDetect() {
  // lots of prefixes...
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia || navigator.mediaDevices.getUserMedia;
  // navigator.getUserMedia = 0;
  if (navigator.getUserMedia) {
    return true;
  }
  return false;
}

/*
function handleVideo(stream) {
  // console.log(stream);
  config.uiVideoElem.src = window.URL.createObjectURL(stream);
  config.uiOnboardingElem.classList.add('hide');
}

function videoError(err) {
  config.uiOnboardingElem.innerHTML = `<p>${config.errorTxtCameraStart} ${err.name} </p>`;
}

 function camStart() {
  // todo: stop any tracks running, eg mediaStream.getVideoTracks()[0].stop();
  navigator.getUserMedia({ video: { facingMode: 'environment' }, audio: false }, handleVideo, videoError);
} */

// reafactor to promise

export default function cameraInit() {
  return new Promise((resolve, reject) => {
    if (!gUmFeatureDetect()) {
      reject('noGUM');
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
