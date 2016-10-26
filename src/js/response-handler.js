/*
process logic on response json from gCloud vision api
extracts search term
future ideas include prioritising logo recognition
to be revisited...
for now, just take the first match that's not in the boringMatches array
*/

import giphyRequest from './giphy-request';

let labelsLength;
const boringMatches = ['room', 'property', 'image', 'black', 'white', 'color', 'interior design', 'real estate', 'person', 'man made object'];

export default function responseHandler(data) {
  const labels = data.responses[0].labelAnnotations;
  if (labels === undefined) {
    giphyRequest(null); // will invoke error msg
    return;
  }
  labelsLength = labels.length;
  for (let i = 0; i < labelsLength; i += 1) {
    if (boringMatches.indexOf(labels[i].description) < 0) {
      giphyRequest(labels[i].description); // we found a match thats not in the boring list, so submit and bail here
      return;
    }
  }
  giphyRequest(null); // if labels exist but they are all boring
}
