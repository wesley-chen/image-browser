var helpers = require('./helpers');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'index': './src/index.js',
  },

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
  },

  resolve: {
    root: path.resolve('./node_modules'),
    extensions: ['', '.ts', '.js', '.json', '.css', '.html']
  },

  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts',
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        loaders: ["raw-loader", "sass"],
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  target: 'electron',

  node: {
    __dirname: false,
    __filename: false
  },
};
