'use strict';// eslint-disable-line
// strict still required in currrent node version
const express = require('express');
// const favicon = require('serve-favicon');
// const path = require('path');
// const compress = require('compression');
const webpack = require('webpack');
const router = require('./router');
let webpackConfig;
let compiler;

const app = express();
app.set('port', (process.env.PORT || 5000));
// app.use(compress());
app.use(express.static('dist', { maxAge: 31536000000 })); // one year
// app.use(favicon('favicon.ico'));
app.use('/', router);

// app.set('views', path.join(__dirname, '/views'));
// app.engine('dust', adaro.dust());
// app.set('view engine', 'dust');
// app.set('view cache', true);
app.disable('x-powered-by');

// start app
function startListening() {
  app.listen(app.get('port'), () => {
    console.log('*** Running on port', app.get('port'));
    console.log(`*** process.env.NODE_ENV: ${process.env.NODE_ENV}`);
  });
}

if (process.env.NODE_ENV !== 'production') {
  console.log('*** BUILDING DEV ***\nPlease WAIT for webpack to build bundle...');
  webpackConfig = require('../webpack.dev.config.js');
  compiler = webpack(webpackConfig);
  // const webpackDevMiddleware = require('webpack-dev-middleware');
  // const webpackHotMiddleware = require('webpack-hot-middleware');

  // app.use(webpackDevMiddleware(compiler, {
  //   noInfo: true,
  //   publicPath: webpackConfig.output.publicPath,
  //   stats: { colors: true },
  // }));
  //
  // app.use(webpackHotMiddleware(compiler, {
  //   log: console.log,
  //   path: '/__webpack_hmr',
  //   heartbeat: 10 * 1000,
  //   reload: true,
  // }));
  startListening();
} else {
  console.log('*** BUILDING PROD ***');
  webpackConfig = require('../webpack.prod.config.js');
  compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err) {
      console.log('!!! error webpack prod build: ', err);
    }
    // console.log(stats.toJson().assetsByChunkName);
    // router.templateConfig.fileHash = stats.toJson().hash;
	console.log('*** file hash: ', stats.toJson().hash);
    startListening();
  });
}
