var ExtractTextPlugin = require('extract-text-webpack-plugin');
var desktopConfig = require('./webpack.desktop.js');
var helpers = require('./helpers');
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

var mainConfig = desktopConfig.filter((item) => item.name === "main");
var rendererConfig = desktopConfig.filter((item) => item.name === "renderer");

module.exports = [
  webpackMerge(mainConfig, {
    output: {
      path: helpers.root('dist'),
      filename: '[name].js',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'ENV': JSON.stringify(ENV)
        }
      })
    ]
  }),
  webpackMerge(rendererConfig, {
    devtool: 'source-map',

    output: {
      path: helpers.root('dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
      minimize: false // workaround for ng2
    },

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
        mangle: {
          keep_fnames: true
        }
      }),
      new ExtractTextPlugin('[name].[hash].css'),
      new webpack.DefinePlugin({
        'process.env': {
          'ENV': JSON.stringify(ENV)
        }
      })
    ]
  })
];
