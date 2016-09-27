const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssNext = require('postcss-cssnext');
const precss = require('precss');

const htmlMinifyOptions = { removeComments: false, collapseWhitespace: true, collapseInlineTagWhitespace: true };

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    './js/base.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:8080/', // absolute path req here for assets in css to work with sourcemaps on. Must be actual numeric ip to access over lan.
    filename: 'js/[name].js',
  },
  profile: true, // show times for build of each chunk etc, to debug slow builds
  debug: true,
  devtool: 'source-map',
  eslint: {
    configFile: './.eslintrc',
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.s?css$/,
        include: /sass/,
        loader: 'style!css?sourceMap!postcss?sourceMap',
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        loaders: [
          'url?limit=8192&name=[path][name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 2, pngquant:{quality: "65-80", speed: 6}}',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /js/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          compact: false,
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main', // Move dependencies to our main file
      children: true, // Look for common dependencies in all children,
      minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      cache: true,
      template: 'indexPOC.html',
      minify: htmlMinifyOptions,
      // todo: favicon path
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.css', '.sass'],
  },
};
