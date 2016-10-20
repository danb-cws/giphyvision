import * as config from './giphyvision-config';
import responseHandler from './response-handler';
// import againRoute from './uiHandler';

export default function gcloudRequest(base64data) {
  config.uiStatusElem.innerHTML = 'Analysing image...';
  fetch(config.SERVICE_URL, {
    method: 'post',
    mode: 'cors',
    body: base64data,
    headers: new Headers({
      'Content-Type': 'text/plain',
    }),
  }).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        responseHandler(data);
      });
    } else {
      config.uiStatusElem.innerHTML = '<span class="error">CloudVision - Network response was not ok.</span>';
      setTimeout(() => {
        config.uiStatusElem.innerHTML = '';
        config.uiCaptureCtrls.setAttribute('style', 'display: none');
        config.uiRepeatBtn.setAttribute('style', 'display: inline-block');
      }, 3000);
    }
  }).catch((err) => { // bug: Safari - fetch polyfill dosn't seem to catch err as expected?
    config.uiStatusElem.innerHTML = `<span class="error">CloudVision error: "${err.message}"</span>`;
    setTimeout(() => {
      config.uiStatusElem.innerHTML = '';
      config.uiCaptureCtrls.setAttribute('style', 'display: none');
      config.uiRepeatBtn.setAttribute('style', 'display: inline-block');
    }, 3000);
  });
}
