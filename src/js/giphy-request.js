import * as config from './giphyvision-config';

export default function giphyRequest(term) {
  console.log(`make giphy api request on ${term}`);
  config.uiDebugElem.innerHTML = `Recognised: ${term}`;
}
