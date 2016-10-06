import * as config from './giphyvision-config';

let imgNaturalHeight = 0;
let imgNaturalWidth = 0;
let videoNaturalHeight = 0;
let videoNaturalWidth = 0;
let containerWidth = 0;
let containerHeight = 0;
let containerRatio = 0;


export function getDims() {
  config.uiImagePreview.onload = () => {
    console.log('preview img loaded');
    imgNaturalWidth = config.uiImagePreview.naturalWidth;
    imgNaturalHeight = config.uiImagePreview.naturalHeight;
    console.log(`imgNaturalWidth: ${imgNaturalWidth}`);
    console.log(`imgNaturalHeight: ${imgNaturalHeight}`);
  };
  config.uiVideoElem.onloadedmetadata = () => {
    console.log('video loaded');
    videoNaturalWidth = config.uiVideoElem.videoWidth;
    videoNaturalHeight = config.uiVideoElem.videoHeight;
    console.log(`videoNaturalWidth: ${videoNaturalWidth}`);
    console.log(`videoNaturalHeight: ${videoNaturalHeight}`);
  };
}


export function ratioCalc() {
  containerWidth = config.uiVideo.clientWidth;
  containerHeight = config.uiVideo.clientHeight;
  containerRatio = containerWidth / containerHeight;
  if (containerRatio < 1) {
    config.uiVideo.classList.toggle('portrait');
  }
}

