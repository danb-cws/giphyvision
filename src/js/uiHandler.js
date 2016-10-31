import * as config from './giphyvision-config';
import * as mediaHandler from './media-handler';
import * as fileInputFallback from './file-input-fallback';
import * as cameraInit from './camera-setup';

function resetUI() {
  config.uiStatusElem.innerHTML = '';
  if (mediaHandler.whichMedia() === 'image') {
    config.uiRepeatBtn.setAttribute('style', 'display: inline-block');
    config.uiCaptureCtrls.setAttribute('style', 'display: none');
  } else {
    cameraInit.cameraRestart();
    config.uiRepeatBtn.setAttribute('style', 'display: none');
    config.uiCaptureCtrls.setAttribute('style', 'display: inline-block');
    config.uiVideoElem.setAttribute('style', 'display: block');
    config.uiCaptureBtn.removeAttribute('disabled');
    config.uiImagePreview.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent blank
  }
}

export function againRoute(e) {
  if (e !== undefined) {
    e.preventDefault();
  }
  if (mediaHandler.whichMedia() === 'image') {
    fileInputFallback.pseudoClickFileInput();
  } else {
    resetUI();
  }
}

export function delayedResetUI() {
  config.uiSpinner.classList.remove('shown');
  setTimeout(() => {
    resetUI();
  }, 2800);
}
