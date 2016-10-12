import * as config from './giphyvision-config';
import * as mediaHandler from './media-handler';

let media;
let dataURL = '';
let canvas = '';
let ctx = '';

export default function captureImage() {
  if (!canvas) {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.display = 'none';
    canvas.id = 'hiddenCanvas';
  }
  // todo: need to size canvas at sensible max, eg. smartphone hi rez cam, 640 webcam
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
  media = mediaHandler.whichMedia();
  // console.log(`media: ${media}`);
  if (media === 'video') {
    canvas.width = config.uiVideoElem.videoWidth;
    canvas.height = config.uiVideoElem.videoHeight;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(config.uiVideoElem, 0, 0, canvas.width, canvas.height);
    dataURL = canvas.toDataURL('image/png');
    config.uiImagePreview.src = dataURL;
  } else if (media === 'image') {
    canvas.width = config.uiImagePreview.clientWidth;
    canvas.height = config.uiImagePreview.clientHeight;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(config.uiImagePreview, 0, 0, canvas.width, canvas.height);
    dataURL = canvas.toDataURL('image/png');
  } else {
    config.uiStatusElem.innerHTML('<p>Error: media is undefined in media-handler</p>');
  }
  return dataURL;
}

// var head = 'data:image/png;base64,';
// var imgFileSize = Math.round((dataURL.length - head.length)*3/4) ;
