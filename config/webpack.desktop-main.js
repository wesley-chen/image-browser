var helpers = require('./helpers');

module.exports = {
  name: "main",

  entry: {
    'index': './src/index.js',
  },

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
  },

  node: {
    __dirname: false,
    __filename: false
  },

  target: 'electron'
};
