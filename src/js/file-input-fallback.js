/* Camera fallback - if getUserMedia not supported, we can use hidden file input which allows camera on iOS
* 1. create hidden file input
* 2. Bind click to link as specified in config
* 3. Set src of preview area to retuened file
* */

import * as config from './giphyvision-config';

let fileInput = 0;

function copyToPreviewElem() {
  const filesRef = window.URL.createObjectURL(fileInput.files[0]);
  config.uiVideoElem.src = filesRef;
  config.uiImagePreview.src = filesRef;
  config.uiOnboardingElem.classList.add('hide');
}

function pseudoClickFileInput() {
  event.preventDefault();
  fileInput.click();
}

export default function fileInputFallBack() {
  if (!fileInput) {
    fileInput = document.createElement('input');
    fileInput.id = 'fileInput';
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.visibility = 'hidden';
    fileInput.addEventListener('change', copyToPreviewElem, false);
    config.uiOnboardingElem.appendChild(fileInput);
    document.querySelector(`#${config.uiFallbackFileInputLinkId}`).addEventListener('click', pseudoClickFileInput, false);
  }
}
