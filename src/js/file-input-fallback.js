/* Camera fallback - if getUserMedia not supported, we can use hidden file input which allows camera input on iOS, android
* 1. create hidden file input
* 2. Bind click to link as specified in config
* 3. Set src of preview area to returned file
* */

import * as config from './giphyvision-config';
import * as mediaHandler from './media-handler';

let fileInput;
let fileInputCopyNode;
let inputFilesRef;
let hasCamToggle;

function copyToImageElem() {
  hasCamToggle = document.querySelector(`#${config.uiCameraToggleId}`);
  if (hasCamToggle) { // edge case: hide cam toggle if 1)has 2 cams and 2)user has refused permission for gUm
    hasCamToggle.setAttribute('style', 'display: none');
  }
  inputFilesRef = window.URL.createObjectURL(fileInput.files[0]);
  config.uiImagePreview.src = inputFilesRef;
  mediaHandler.mediaOnload();
  config.uiStatusElem.innerHTML = '';
  config.uiRepeatBtn.setAttribute('style', 'display: none');
  config.uiCaptureCtrls.setAttribute('style', 'display: inline-block');
  config.uiCaptureBtn.removeAttribute('disabled');
  config.uiOnboardingElem.classList.add('hidden');
  setTimeout(() => {
    config.uiCaptureBtn.click();
  }, 300);
}

function nullFileInput() { // to fix issue of choosing same file again not firing onchange
  this.value = null;
}

export function pseudoClickFileInput(event) {
  if (event !== undefined) {
    event.preventDefault();
  }
  fileInput.click();
}

export function invokeFileInput() {
  if (!fileInput) {
    fileInputCopyNode = document.createElement('p');
    fileInputCopyNode.innerHTML = `${config.uiFallbackFileInputCopy}`;
    config.uiOnboardingElem.appendChild(fileInputCopyNode);
    fileInput = document.createElement('input');
    fileInput.id = 'fileInput';
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.capture = 'camera';
    fileInput.style.visibility = 'hidden';
    fileInput.addEventListener('click', nullFileInput, false);
    fileInput.addEventListener('change', copyToImageElem, false);
    config.uiOnboardingElem.appendChild(fileInput);
    document.querySelector(`#${config.uiFallbackFileInputLinkId}`).addEventListener('click', pseudoClickFileInput, false);
  }
}
