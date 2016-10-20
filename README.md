# GiphyVision
Experimenting and learning with device camera, Google Cloud Vision and Giphy API's. Working with Heroku and Firebase, using Webpack workflow.

Objective: use device camera to take a picture of an object etc, submit to Cloud Vision which will return a description, this will be passed to Giphy which returns a... gif

An image is passed as base64 data to a service on Heroku, the code for which is in a separate repo but looks like:

	const http = require('http');
	const gcloud = require('google-cloud')({
		keyFilename: './xxx.json',// obfuscated
		projectId: 'xxx',
	});
	const vision = gcloud.vision();
	const types = ['labels'];
	http.createServer((request, response) => {
		request.on('error', (err) => {
			console.error(err);
			response.statusCode = 400;
			response.end();
		});
		response.on('error', (err) => {
			console.error(err);
		});
		if ((request.url.split('?')[0]) === '/cloud-vision') {
			response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
			let imgData = '';
			request.on('data', (chunk) => {
				imgData += chunk.toString();
			});
			request.on('end', () => {
				imgData = imgData.replace('data:image/png;base64,', '');
				const buffer = new Buffer(imgData, 'base64');
				vision.detect(buffer, types, (err, detections, apiResponse) => {
					console.log('detections? ', detections);
					console.log('apiresponse? ', apiResponse);
					response.write(JSON.stringify(apiResponse, null, 20));
					response.end();
				});
			});
		} else {
			response.statusCode = 404;
			response.end();
		}
	}).listen(process.env.PORT || 5000);

This service makes the request to cloud vision with my api key and returns a list of "labelAnnotations" to the clientside code which then makes the request to Giphy.

TODO:

* ~~Scaffold and build system basics~~
* ~~Setup Google Cloud account~~
* ~~Basic POC camera acquisition~~
* ~~Initial build of image handling service on Heroku~~
* ~~POC of sending base64 image to gcloud api and getting response on client~~
* ~~Tidy up POC and, refine scaffold and build system~~
* ~~Layout 1st pass for client page, more scaffolding~~
* ~~Module refactoring~~
* ~~file input fallback for UA's with no getUserMedia~~
* Service worker and caching, PWA structure
* ~~Screen transition basic setup, more UI~~
* ~~Scripting for camera permission~~
* ~~defaulting to back camera~~
* logic for welcome view? cookie etc
* ~~response processing logic~~
* ~~giphy api request and POC display of gif~~
* about screen
* refinements
* more refinements...
