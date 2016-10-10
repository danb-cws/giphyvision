import * as config from './giphyvision-config';
import responseHandler from './response-handler';

export default function gcloudRequest(base64data) {
  fetch(config.SERVICEURL, {
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
        // config.uiDebugElem.innerHTML = `Recognised: ${data.responses['0'].labelAnnotations['0'].description}`;
      });
    } else {
      console.log('Network response was not ok.');
    }
  }).catch((err) => {
    console.log(`Fetch error returned to client: ${err.message}`);
  });
}
