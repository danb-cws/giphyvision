/*
processes logic on response json
extracts search term with business logic etc
ideas include prioritising logo recognition, blacklist boring matches
to be revisited...
for now, just take the first match
*/

// import * as config from './giphyvision-config';
import giphyRequest from './giphy-request';

export default function responseHandler(data) {
  // console.log('data in response handler: ', data);
  giphyRequest(data.responses['0'].labelAnnotations['0'].description);
  // console.log(data);
  // recognisedLabelsLength = data.responses[0].labelAnnotations.length;
  // for (let i = 0; i <= recognisedLabelsLength; i += 1) {
    /* eslint-disable */
    // label = 'data.responses["0"].labelAnnotations["' + i + '"].description';
    /* eslint-enable */
    // label = data.responses['0'].labelAnnotations[' + i + '].description;
    // label = `data.responses['0'].labelAnnotations['${i}'].description `;
    // label = data.responses[0].labelAnnotations[0].description;
    // console.log('label: ', label);
    // labels += `${label} `;
  // }
  // config.uiStatusElem.innerHTML = labels;
  //
  // config.uiStatusElem.innerHTML = `Recognised: ${data.responses['0'].labelAnnotations['0'].description}`;
}
