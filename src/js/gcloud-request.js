import * as config from './giphyvision-config';
import responseHandler from './response-handler';

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
      config.uiStatusElem.innerHTML = 'gCloud - Network response was not ok.';
    }
  }).catch((err) => {
    config.uiStatusElem.innerHTML = `gCloud - fetch error returned to client: ${err.message}`;
  });
}
