if (module.hot) {
  module.hot.accept();
}

import '../sass/base.scss';
import './test.js';

// import '../img/mickey_small.gif';

// require('file?name=[path][name].[ext]!../index.html');
// require('file?name=[path][name].[ext]!../index.html');
// require('file?name=[path][name].[ext]!../img/mickey_small.gif');
// require('../img/mickey_small.gif');

console.log('logging from base.js');
