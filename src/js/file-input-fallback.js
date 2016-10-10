/* Camera fallback - if getUserMedia not supported, we can use hidden file input which allows camera on iOS
* 1. create hidden file input
* 2. Bind click to link as specified in config
* 3. Set src of preview area to returned file
* */

import * as config from './giphyvision-config';
import * as mediaHandler from './media-handler';

let fileInput;

function copyToVideoElem() {
  const inputFilesRef = window.URL.createObjectURL(fileInput.files[0]);
  config.uiImagePreview.src = inputFilesRef;
  mediaHandler.mediaOnload();
  config.uiOnboardingElem.classList.add('hidden');
}

function pseudoClickFileInput(event) {
  event.preventDefault();
  fileInput.click();
}

export default function fileInputFallBack() {
  if (!fileInput) {
    const fileInputCopyNode = document.createElement('p');
    fileInputCopyNode.innerHTML = `${config.uiFallbackFileInputCopy}`;
    config.uiOnboardingElem.appendChild(fileInputCopyNode);
    fileInput = document.createElement('input');
    fileInput.id = 'fileInput';
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.visibility = 'hidden';
    fileInput.addEventListener('change', copyToVideoElem, false);
    config.uiOnboardingElem.appendChild(fileInput);
    document.querySelector(`#${config.uiFallbackFileInputLinkId}`).addEventListener('click', pseudoClickFileInput, false);
  }
}
