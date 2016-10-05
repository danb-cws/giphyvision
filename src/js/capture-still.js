import * as config from './giphyvision-config';

let dataURL = '';
let canvas = '';
let ctx = '';

export default function captureImage() {
  if (!canvas) {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.id = 'hiddenCanvas';
    canvas.style.display = 'none';
  }
  // todo: need to size canvas at sensible max, eg smartphone hi rez cam, 640 webcam
/*  const MAX_WIDTH = 1024;
  const MAX_HEIGHT = 768;
  if (width/MAX_WIDTH > height/MAX_HEIGHT) {
      if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
      }
  } else {
      if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
      }
  }*/
  // console.log(config.uiVideoElem);
  // console.log(config.uiImagePreview);
  canvas.width = 1024;// config.uiVideoElem.videoWidth;
  canvas.height = 768;// config.uiVideoElem.videoHeight;
  ctx = canvas.getContext('2d');
  ctx.drawImage(config.uiImagePreview, 0, 0, canvas.width, canvas.height);
  dataURL = canvas.toDataURL('image/png');
  // need set for video config.uiImagePreview.src = dataURL;
  return dataURL;
}
