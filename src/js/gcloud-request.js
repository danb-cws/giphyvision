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
        config.uiStatusElem.innerHTML = `Recognised: ${data.responses['0'].labelAnnotations['0'].description}`;
      });
    } else {
      config.uiStatusElem.innerHTML('<p>gCloud - Network response was not ok.</p>');
    }
  }).catch((err) => {
    config.uiStatusElem.innerHTML(`<p>gCloud - fetch error returned to client: ${err.message}</p>`);
  });
}
