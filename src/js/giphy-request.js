import * as config from './giphyvision-config';
import againRoute from './uiHandler';

let searchString;

export default function giphyRequest(term) {
  if (term === null) {
    config.uiStatusElem.innerHTML = 'Couldn\'t identify anything';
    setTimeout(() => {
      againRoute();
    }, 3000);
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
          setTimeout(() => {
            config.uiStatusElem.innerHTML = '';
            config.uiCaptureBtn.setAttribute('style', 'display: none');
            config.uiRepeatBtn.setAttribute('style', 'display: inline-block');
          }, 3000);
          return;
        }
        const gifUrl = results.images.original.url;
        config.uiImagePreview.src = gifUrl;
        config.uiVideoElem.setAttribute('style', 'display: none');
        config.uiStatusElem.innerHTML = `Result for '${term}'`;
        config.uiCaptureBtn.setAttribute('style', 'display: none');
        config.uiRepeatBtn.setAttribute('style', 'display: inline-block');
      });
    } else {
      config.uiStatusElem.innerHTML = 'Giphy api error - Network response was not ok.';
    }
  }).catch((err) => {
    config.uiStatusElem.innerHTML = `Giphy api error - fetch error returned to client: ${err.message}`;
  });
}

