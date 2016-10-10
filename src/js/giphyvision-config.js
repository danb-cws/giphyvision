/**
 * Config
 */

/* SELECTORS for UI elements */

export const uiOnboardingElem = document.querySelector('.onboarding');
export const uiVideo = document.querySelector('.video');
export const uiVideoElem = document.querySelector('.video-element');
export const uiStartBtn = document.querySelector('.start-button');
export const uiCaptureBtn = document.querySelector('.capture-button');
export const uiImagePreview = document.querySelector('.preview');
export const uiDebugElem = document.querySelector('.debug');
export const uiFallbackFileInputLinkId = 'invokeFileBrowser';

/* Constants */
export const SERVICE_URL = 'https://giphyvision.herokuapp.com/cloud-vision';
// 'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC  ';
export const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';
export const GIPHY_API_KEY = 'dc6zaTOxFJmzC';

/* messaging */
export const errorTxtNoGum = 'Unfortunately your browser doesn\'t (yet) support "getUserMedia" (includes Safari desktop, Safari/Chrome on iOS), which allows integration of the camera output into the UI.';
export const errorTxtCameraStart = 'Could not access camera. Error: ';
export const errorTxtNoPromises = '<strong>It\'s not going to work...</strong> <br>GiphyVision uses javascript "Promises" which are not supported in old browsers. <br><br>Please come back with Chrome, Firefox or Edge!';
export const uiFallbackFileInputCopy = `Fret not! You can use the slightly clunky <a href="#" id="${uiFallbackFileInputLinkId}">file browser</a> approach instead`;
