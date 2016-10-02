/**
 * 1. MODULE feature detect webcam, return reference to handleVideo or error.
 *   Errors: no camera, no support for gUm, camera already in use, permission denied
 *   return a MediaStream object or an error
 *   if iOS, try file upload?
 */

import * as config from './giphyvision-config';

let output = '';

export default function camStart() {
  // lots of prefixes...
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia || navigator.mediaDevices.getUserMedia;
  // navigator.getUserMedia = 0;

  function handleVideo(stream) {
    output = stream;
    console.log(stream);
    config.uiVideoElem.src = window.URL.createObjectURL(stream);
  }

  function videoError(err) {
    output = `Failed (prob did not allow camera access?), error: ${err.name}`;
  }

  if (navigator.getUserMedia) {
    navigator.getUserMedia({ video: { facingMode: { exact: 'environment' } }, audio: false }, handleVideo, videoError);
  } else {
    output = 'Failed, no support for getUserMedia';
  }
  return output;
}
