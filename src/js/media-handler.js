import * as config from './giphyvision-config';

// let imgNaturalHeight = 0;
// let imgNaturalWidth = 0;
// let videoNaturalHeight = 0;
// let videoNaturalWidth = 0;

// let videoRenderedWidth = 0;
// let videoRenderedHeight = 0;
let mediaType;
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
  // console.log(`container ar: ${containerAspectRatio}`);
  if (containerAspectRatio <= videoAspectRatio) {
    console.log('ar handler portrait');
    config.uiVideo.classList.add('portrait');
    config.uiVideo.classList.remove('landscape');
  } else {
    console.log('ar handler land');
    config.uiVideo.classList.remove('portrait');
    config.uiVideo.classList.add('landscape');
  }
}
export function mediaOnload() {
  config.uiImagePreview.onload = () => {
    console.log('preview img loaded');
    videoAspectRatio = config.uiImagePreview.naturalWidth / config.uiImagePreview.naturalHeight;
    mediaType = 'image';
    // console.log(`video (img) ar: ${videoAspectRatio}`);
    aspectRatioSet();
  };
  config.uiVideoElem.onloadedmetadata = () => {
    console.log('video loaded');
    videoAspectRatio = config.uiVideoElem.videoWidth / config.uiVideoElem.videoHeight;
    // console.log(`video ar: ${videoAspectRatio}`);
    mediaType = 'video';
    aspectRatioSet();
  };
}
