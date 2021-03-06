/**
 * Config
 */

/* SELECTORS for UI elements */

export const uiOnboardingElem = document.querySelector('.onboarding');
export const uiVideo = document.querySelector('.display');
export const uiVideoElem = document.querySelector('.video-element');
export const uiStartBtn = document.querySelector('.start-button');
export const uiCaptureCtrls = document.querySelector('.capture-controls');
export const uiCaptureBtn = document.querySelector('.capture-button');
export const uiRepeatBtn = document.querySelector('.repeat-button');
export const uiImagePreview = document.querySelector('.preview');
export const uiStatusElem = document.querySelector('.status');
export const uiFallbackFileInputLinkId = 'invokeFileBrowser';
export const uiCameraToggleId = 'camToggle';
export const uiSpinner = document.querySelector('.spinner');
export const uiAbout = document.querySelector('.about');
export const uiShowAbout = document.querySelector('.show-about');
export const uiCloseAbout = document.querySelector('.close-about');

/* Constants */
export const SERVICE_URL = 'https://giphyvision.herokuapp.com/cloud-vision';
/* export const SERVICE_URL = 'http://localhost:5000/cloud-vision';*/
export const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/translate';
export const GIPHY_API_KEY = 'OSWleZiTZ7uBqSAmNK9JP5BWzoSNtuq9';

/* messaging */
export const errorTxtNoGum = 'Unfortunately your browser doesn\'t (yet) support "getUserMedia", which allows integration of the camera output into the UI.';
export const errorTxtCameraStart = 'Could not access camera, error: ';
export const errorTxtNoPromises = '<strong>It\'s not going to work...</strong> <br>GiphyVision uses javascript "Promises" which are not supported in old browsers. <br><br>Please come back with Chrome, Firefox or Edge!';
export const uiFallbackFileInputCopy = `Fret not! You can use the slightly clunky <a href="#" id="${uiFallbackFileInputLinkId}">file&nbsp;browser</a> approach instead`;
