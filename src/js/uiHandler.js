import * as config from './giphyvision-config';
import * as mediaHandler from './media-handler';
import * as fileInputFallback from './file-input-fallback';

export default function againRoute(e) {
  console.log('AGAIN route');
  if (e !== undefined) {
    e.preventDefault();
  }
  if (mediaHandler.whichMedia() === 'image') {
    fileInputFallback.pseudoClickFileInput();
  } else {
    config.uiStatusElem.innerHTML = '';
    config.uiRepeatBtn.setAttribute('style', 'display: none');
    config.uiCaptureBtn.setAttribute('style', 'display: inline-block');
    config.uiCaptureBtn.disabled = false;
    config.uiVideoElem.setAttribute('style', 'display: block');
    config.uiImagePreview.src = '';
  }
}
