import * as config from './giphyvision-config';

let mediaType = 'image';
let videoAspectRatio = 0;
let containerWidth = 0;
let containerHeight = 0;
let containerAspectRatio = 0;

export function whichMedia() {
  return mediaType;
}

export function aspectRatioSet() {
  containerWidth = config.uiVideo.clientWidth;
  containerHeight = config.uiVideo.clientHeight;
  containerAspectRatio = containerWidth / containerHeight;
  if (containerAspectRatio <= videoAspectRatio) {
    config.uiVideo.classList.add('portrait');
    config.uiVideo.classList.remove('landscape');
  } else {
    config.uiVideo.classList.remove('portrait');
    config.uiVideo.classList.add('landscape');
  }
}
export function mediaOnload() {
  config.uiImagePreview.onload = () => {
    if (config.uiImagePreview.classList.contains('giphy')) {
      config.uiImagePreview.classList.remove('giphy');
      config.uiSpinner.classList.remove('shown');
    }
    videoAspectRatio = config.uiImagePreview.naturalWidth / config.uiImagePreview.naturalHeight;
    aspectRatioSet();
  };
  config.uiVideoElem.onloadedmetadata = () => {
    videoAspectRatio = config.uiVideoElem.videoWidth / config.uiVideoElem.videoHeight;
    mediaType = 'video';
    aspectRatioSet();
  };
}
