const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssNext = require('postcss-cssnext');
const precss = require('precss');

module.exports = {
  context: `${__dirname}/src`,
  entry: [
    './js/base.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'js/[name].js',
  },
  debug: false,
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        include: /sass/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        loaders: [
          'url?limit=8192&name=[path][name].[ext]?[hash]',
          'image-webpack?{progressive:true, optimizationLevel: 5, pngquant:{quality: "65-80", speed: 4}}',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /js/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  postcss(wp) {
    return [
      postcssImport({ addDependencyTo: wp }), // Must be first item in list
      precss,
      postcssNext({ browsers: ['last 2 versions'] }),
    ];
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('./css/[name].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      hash: true,
      template: 'start.html',
      minify: { removeComments: true, collapseWhitespace: true },
      // todo: favicon path
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      template: '404.html',
      minify: { removeComments: true, collapseWhitespace: true },
      // todo: favicon path
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main', // Move dependencies to our main file
      children: true, // Look for common dependencies in all children,
      minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.css', '.sass'],
  },
};

