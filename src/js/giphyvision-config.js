/**
 * Config
 */

/* SELECTORS for UI elements */

export const uiOnboardingElem = document.querySelector('.onboarding');
export const uiVideoElem = document.querySelector('.video-element');
export const uiStartBtn = document.querySelector('.start-button');
export const uiCaptureBtn = document.querySelector('.capture-button');
export const uiImagePreview = document.querySelector('.preview');

/* Constants */
export const SERVICEURL = 'https://giphyvision.herokuapp.com/cloud-vision';

/* messaging */
export const errorTxtNoGum = 'Unfortunately your browser does not (yet) support "getUserMedia." (includes Safari, old IE).';
export const errorTxtCameraStart = 'Could not access camera, error:';
