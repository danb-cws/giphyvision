import '../sass/base.scss';
import './test';

// import '../img/mickey_small.gif';

// require('file?name=[path][name].[ext]!../index.html');
// require('file?name=[path][name].[ext]!../index.html');
// require('file?name=[path][name].[ext]!../img/mickey_small.gif');
// require('../img/mickey_small.gif');

console.log('logging from base.js');

if (module.hot) {
  module.hot.accept();
}
