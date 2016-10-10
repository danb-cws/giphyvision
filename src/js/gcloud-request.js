import * as config from './giphyvision-config';

let recognisedLabelsLength = 0;

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
        recognisedLabelsLength = data.responses[0].labelAnnotations.length;
        for (let i = 0; i <= recognisedLabelsLength; i += 1) {
          /* eslint-disable */
          // label = 'data.responses["0"].labelAnnotations["' + i + '"].description';
          /* eslint-enable */
          // label = data.responses['0'].labelAnnotations[' + i + '].description;
          // label = `data.responses['0'].labelAnnotations['${i}'].description `;
          // label = data.responses[0].labelAnnotations[0].description;
          // console.log('label: ', label);
          // labels += `${label} `;
        }
        // config.uiDebugElem.innerHTML = labels;
        //
        config.uiDebugElem.innerHTML = `Recognised: ${data.responses['0'].labelAnnotations['0'].description}`;
      });
    } else {
      console.log('Network response was not ok.');
    }
  }).catch((err) => {
    console.log(`Fetch error returned to client: ${err.message}`);
  });
}
