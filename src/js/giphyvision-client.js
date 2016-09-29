/* GiphyVision client script
1. feature detect webcam
2. take image submit to server as base64 */

// const startBtn = document.querySelector('#start-btn');
const videoElem = document.querySelector('.video-element');
const captureBtn = document.querySelector('.capture-button');
const imagePreview = document.querySelector('.preview');
let canvas = '';

// lots of prefixes...
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia || navigator.mediaDevices.getUserMedia;

function handleVideo(stream) {
  videoElem.src = window.URL.createObjectURL(stream);
}

function videoError(err) {
  console.log(`Failed (prob did not allow camera access?), error: ${err}`);
}

if (navigator.getUserMedia) {
  navigator.getUserMedia({ video: true, audio: false }, handleVideo, videoError);
} else {
  console.log('Failed, no support for getUserMedia');
}

function sendImgData(base64data) {
  fetch('https://giphyvision.herokuapp.com/cloud-vision', {
    method: 'post',
    mode: 'cors',
    body: base64data,
    headers: new Headers({
      'Content-Type': 'text/plain',
    }),
  }).then((response) => {
    if (response.ok) {
//    console.log(`yo, the response to browser is: ${response}`);
//    console.log( response.json());
      response.json().then((data) => {
        console.log(data);
      });
    } else {
      console.log('Network response was not ok.');
    }
  }).catch((err) => {
    console.log(`Fetch error returned to client: ${err.message}`);
  });
}

function captureImage() {
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'hiddenCanvas';
    canvas.width = videoElem.videoWidth;
    canvas.height = videoElem.videoHeight;
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
  // save canvas image as data url
  const dataURL = canvas.toDataURL();
  // set preview image src to dataURL
  imagePreview.src = dataURL;
  // send to sender fn
  sendImgData(dataURL);
}


// Bind a click to button to capture an image from the video stream
captureBtn.addEventListener('click', captureImage, false);
