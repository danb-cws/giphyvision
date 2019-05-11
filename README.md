# GiphyVision

##NB: Broken :( Need to fix CORS  errors from Giphy

Experimenting and learning with device camera, Google Cloud Vision and Giphy API's. Working with Heroku and Firebase, using Webpack workflow and ES6 modules.

Objective: use device camera to take a picture of an object etc, submit to Cloud Vision which will analyse the image and return a description, this will be passed to Giphy which returns a... gif

A workaround for  browsers which don't support getUserMedia allows use of a camera shot or local image file via a hidden file input, this route is also for "have no camera" or "camera permission denied" scenarios.

The image is passed as base64 data to a service on Heroku, the code for which is in a separate repo but looks very much like:

    'use strict';// eslint-disable-line   
    
    const http = require('http');
    const gcloud = require('google-cloud')({
      keyFilename: './obfuscated.json',
      projectId: 'obfuscated',
    });
    
    const ipWhitelist = ['https://giphyvision.firebaseapp.com', 'http://localhost:8080', 'https://localhost:8080']; // plus my isp ip for devices testing
    
    const vision = gcloud.vision(); 
    // Choices are: faces, landmarks, labels, logos, properties, safeSearch, text - each one costs individually!
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
    
      let validIp = false;
      const ipOrigin = request.headers.origin;
      if (ipWhitelist.indexOf(ipOrigin) > -1) {
        validIp = true;
      }
    
      if (validIp && (request.url.split('?')[0]) === '/cloud-vision-ping') { // just to wake up dyno potentially a bit earlier in the ui flow (sleeps after 30min on heroku free plan)
        response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': ipOrigin });
        response.statusCode = 200;
        response.end();
      }
    
      if (validIp && (request.url.split('?')[0]) === '/cloud-vision') {
        response.writeHead(200, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': ipOrigin });
    
        let imgData = '';
        request.on('data', (chunk) => {
          imgData += chunk.toString();
        });
    
        request.on('end', () => {
          imgData = imgData.replace('data:image/png;base64,', '');
          const buffer = new Buffer(imgData, 'base64');
          vision.detect(buffer, types, (err, detections, apiResponse) => {
            response.write(JSON.stringify(apiResponse, null, 20));
            response.end();
          });
        });
      } else {
        response.statusCode = 404;
        response.end();
      }
    }).listen(process.env.PORT || 5000);
    
    console.log('detection service now running');


This service makes the request to cloud vision with my api key and returns a list of "labelAnnotations" to the client code which then does some crude filtering and then makes the request to Giphy.

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
* logic for welcome view? cookie etc on homescreen launch
* ~~response processing logic~~
* ~~giphy api request and POC display of gif~~
* about screen, options
* refinements
* more refinements...

NPM SCRIPTS:
* build - build asset only, with prod config
* serve-dev-secure - serves https in-memory with debug and HMR
* serve-prod-secure - serves https in-memory without debug and HMR
* release - builds assets and deploys to firebase

KNOWN BUGS
* Firefox dosn't seem to want to play animated gifs after the first one returned, subsequent gifs only show first frame. (Common bug... "won't fix")
