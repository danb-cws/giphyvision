/**
 * 1. MODULE feature detect webcam, return reference to handleVideo or error.
 *   Errors: no camera, no support for gUm, camera already in use, permission denied
 */

import * as config from './giphyvision-config';

export function camStart() {
  // lots of prefixes...
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
  }
}

export function camSetup() {
  return 'hello from cam setup!';
}

export function waveWilly() {
  return 'willy waver!';
}

