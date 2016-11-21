var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var rendererConfig = require('./webpack.desktop-renderer.js');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge(rendererConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
