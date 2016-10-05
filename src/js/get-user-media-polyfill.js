// adapted polyfill from MDN
// polyfills mediaDevices.getUserMedia, if no gUm support (safari, iOS) returns error.message 'noGetUserMediaSupport'
function promisifiedOldGUM(constraints) {
  // First get hold of getUserMedia, if present
  const getUserMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGetUserMedia);
  // if no getUserMedia - return a rejected promise with an error
  if (!getUserMedia) {
    return Promise.reject(new Error('noGetUserMediaSupport'));
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
