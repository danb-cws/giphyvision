/**
 * Config
 */

/* SELECTORS for UI elements */

export const uiOnboardingElem = document.querySelector('.onboarding');
export const uiVideoElem = document.querySelector('.video-element');
export const uiStartBtn = document.querySelector('.start-button');
export const uiCaptureBtn = document.querySelector('.capture-button');
export const uiImagePreview = document.querySelector('.preview');
export const uiDebugElem = document.querySelector('.debug');
export const uiFallbackFileInputLinkId = 'invokeFileBrowser';

/* Constants */
export const SERVICEURL = 'https://giphyvision.herokuapp.com/cloud-vision';

/* messaging */
export const errorTxtNoGum = `Unfortunately your browser doesn't (yet) support "getUserMedia" (includes Safari desktop, Safari/Chrome on iOS), which allows integration of the camera output into the UI. <br><br>Fret not! You can use the slightly clunky <a href="#" id="${uiFallbackFileInputLinkId}">file browser</a> approach instead`;
export const errorTxtCameraStart = 'Could not access camera. ';
export const errorTxtNoPromises = '<strong>Browser not supported</strong>: GiphyVision uses javascript "Promises" which are not supported in old browsers. <br>Please come back with Chrome, Firefox or Edge!';
