import * as config from './giphyvision-config';

let searchString;

export default function giphyRequest(term) {
  console.log(`make giphy api request on ${term}`);
  config.uiStatusElem.innerHTML = `Giphyfying: ${term}...`;

  searchString = `${config.GIPHY_API_URL}?q=${encodeURI(term)}+funny&limit=100&api_key=${config.GIPHY_API_KEY}`;

  fetch(searchString).then((response) => {
    // console.log(response);
    if (response.ok) {
      response.json().then((data) => {
        // console.log(data);
        const results = data.data;
        // console.log(results[0].images.original.url);
        if (results.length < 1) {
          config.uiStatusElem.innerHTML = `<p>No gifs matching ${term} :(</p>`;
          return;
        }
        // const randomGifIndex = Math.floor(Math.random() * (results.length + 1));
        const randomGifIndex = Math.floor(Math.random() * (results.length));
        console.log(`Random gif ${randomGifIndex} out of ${results.length}`);
        const gifUrl = results[randomGifIndex].images.original.url;
        config.uiImagePreview.src = gifUrl;
        config.uiVideoElem.setAttribute('style', 'display: none');
        config.uiStatusElem.innerHTML = `Result for '${term}'`;
        config.uiCaptureBtn.setAttribute('style', 'display: none');
        config.uiRepeatBtn.setAttribute('style', 'display: inline-block');
      });
    } else {
      config.uiStatusElem.innerHTML('<p>Giphy api error - Network response was not ok.</p>');
    }
  }).catch((err) => {
    config.uiStatusElem.innerHTML(`<p>Giphy api error - fetch error returned to client: ${err.message}</p>`);
  });
}

