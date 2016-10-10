import * as config from './giphyvision-config';

let searchString;

export default function giphyRequest(term) {
  console.log(`make giphy api request on ${term}`);
  config.uiDebugElem.innerHTML = `Giphyfying: ${term}`;

  searchString = `${config.GIPHY_API_URL}?q=${term}&api_key=${config.GIPHY_API_KEY}`;

  fetch(searchString).then((response) => {
    console.log(response);
    if (response.ok) {
      response.json().then((data) => {
        console.log(data);
        const results = data.data;
        console.log(results[0].images.original.url);
        const gifUrl = results[0].images.original.url;
        config.uiImagePreview.src = gifUrl;
      });
    } else {
      console.log('giphy api - Network response was not ok.');
    }
  }).catch((err) => {
    console.log(`??? giphy api - fetch error returned to client: ${err.message}`);
  });
}

