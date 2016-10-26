import * as config from './giphyvision-config';
import * as uiHandler from './uiHandler';

let searchString;

export default function giphyRequest(term) {
  if (term === null) {
    config.uiStatusElem.innerHTML = 'Couldn\'t identify anything';
    uiHandler.delayedResetUI();
    return;
  }
  config.uiStatusElem.innerHTML = `Giphyfying: ${term}...`;

  searchString = `${config.GIPHY_API_URL}?s=${encodeURI(term)}&api_key=${config.GIPHY_API_KEY}`;

  fetch(searchString).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        const results = data.data;
        if (results.length === 0) {
          config.uiStatusElem.innerHTML = `No gifs matching ${term} :(`;
          uiHandler.delayedResetUI();
          return;
        }
        config.uiImagePreview.src = results.images.original.url;
        config.uiVideoElem.setAttribute('style', 'display: none');
        config.uiStatusElem.innerHTML = `Gif for '${term}'`;
        config.uiCaptureCtrls.setAttribute('style', 'display: none');
        config.uiRepeatBtn.setAttribute('style', 'display: inline-block');
      });
    } else {
      config.uiStatusElem.innerHTML = '<span class="error">Giphy api error - Network response was not "ok".</span>';
      uiHandler.delayedResetUI();
    }
  }).catch((err) => { // bug: Safari - fetch polyfill dosn't seem to catch err as expected?
    config.uiStatusElem.innerHTML = `<span class="error">Giphy api error: "${err.message}"</span>`;
    uiHandler.delayedResetUI();
  });
}

