import * as config from './giphyvision-config';

let dataURL = '';
let canvas = '';
let ctx = '';

export default function captureImage() {
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'hiddenCanvas';
    canvas.style = 'display: none';
    document.body.appendChild(canvas);
  }
  canvas.width = config.uiVideoElem.videoWidth;
  canvas.height = config.uiVideoElem.videoHeight;
  ctx = canvas.getContext('2d');
  ctx.drawImage(config.uiVideoElem, 0, 0, canvas.width, canvas.height);
  // save canvas image as data url
  dataURL = canvas.toDataURL();
  // set preview image src to dataURL
  config.uiImagePreview.src = dataURL;
  return dataURL;
}
