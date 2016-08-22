'use strict';// eslint-disable-line

const express = require('express');
const router = express.Router();// eslint-disable-line new-cap
// const staticDataImport = require('./data/static_data');

// router.templateConfig = {
//   fileHash: null,
// };

router.get('/hello', (req, res) => {
  let result = '';
  result = '<h1>hello world</h1>';
  res.send(result);
});

// router.get('/', (req, res) => {
//   res.render('index', {
//     config: router.templateConfig,
//     staticData: staticDataImport,
//     pageTitle: 'gifvision',
//     title: 'gifvision',
//     job: 'test project',
//     likes: [
//       'Webpack build system',
//       'Cloud Vision API',
//       'Giphy API',
//     ],
//   });
// });

module.exports = router;
