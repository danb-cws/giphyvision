import * as config from './giphyvision-config';

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
//    console.log(`yo, the response to browser is: ${response}`);
//    console.log( response.json());
      response.json().then((data) => {
        console.log(data);
      });
    } else {
      console.log('Network response was not ok.');
    }
  }).catch((err) => {
    console.log(`Fetch error returned to client: ${err.message}`);
  });
}
