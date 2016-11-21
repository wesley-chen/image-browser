var ExtractTextPlugin = require('extract-text-webpack-plugin');
var desktopConfig = require('./webpack.desktop.js');
var helpers = require('./helpers');
var webpackMerge = require('webpack-merge');

var mainConfig = desktopConfig.filter((item) => item.name === "main");
var rendererConfig = desktopConfig.filter((item) => item.name === "renderer");

var distDir = 'dist-dev';

var mainPlugin = new helpers.ElectronMainWebpackPlugin({
  logLevel: 0,
  path: helpers.root(distDir)
});

module.exports = [
  webpackMerge(mainConfig, {
    output: {
      path: helpers.root(distDir),
      filename: '[name].js',
    },
    plugins: [
      mainPlugin
    ]
  }),
  webpackMerge(rendererConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
      path: helpers.root(distDir),
      filename: '[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js'
    },

    plugins: [
      new ExtractTextPlugin('[name].css'),
      new helpers.ElectronRendererWebpackPlugin(mainPlugin, {
        logLevel: 0,
        path: helpers.root(distDir)
      })
    ],
  })
];
