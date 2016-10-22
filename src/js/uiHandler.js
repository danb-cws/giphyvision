import * as config from './giphyvision-config';
import * as mediaHandler from './media-handler';
import * as fileInputFallback from './file-input-fallback';

export function againRoute(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  if (mediaHandler.whichMedia() === 'image') {
    fileInputFallback.pseudoClickFileInput();
  } else {
    config.uiStatusElem.innerHTML = '';
    config.uiRepeatBtn.setAttribute('style', 'display: none');
    config.uiCaptureCtrls.setAttribute('style', 'display: inline-block');
    config.uiCaptureBtn.disabled = false;
    config.uiVideoElem.setAttribute('style', 'display: block');
    config.uiImagePreview.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent blank
  }
}

function resetUI() {
  config.uiStatusElem.innerHTML = '';
  config.uiCaptureCtrls.setAttribute('style', 'display: none');
}

export function delayedResetUI() {
  setTimeout(() => {
    resetUI();
  }, 2800);
}
