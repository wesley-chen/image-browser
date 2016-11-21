var commonConfig = require('./webpack.common.js');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

const CLIENT = process.env.CLIENT = 'desktop';

module.exports = [
  {
    name: "main",

    entry: {
      'index': './src/index.js',
    },

    module: {
      loaders: [
        {
          test: /angular\.(png|ico)$/,
          loader: 'file?name=[name].[ext]'
      },
      ]
    },

    node: {
      __dirname: false,
      __filename: false
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'CLIENT': JSON.stringify(CLIENT)
        }
      }),
      new webpack.IgnorePlugin(new RegExp("^(spawn-sync|bufferutil|utf-8-validate)$"))
    ],

    target: "electron"
  },
  webpackMerge(commonConfig, {
    name: "renderer",

    target: "electron-renderer"
  })
];
