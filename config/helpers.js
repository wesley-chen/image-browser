var path = require('path');

var _root = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

exports.root = root;

// ElectronMainWebpackPlugin
//
// Use electron-connect start electron and to reload the page when source changes.
//
var electronConnect = require('electron-connect').server;

function ElectronMainWebpackPlugin(options) {
  ElectronMainWebpackPlugin.prototype.server = null;
  ElectronMainWebpackPlugin.prototype.options = options;
}

ElectronMainWebpackPlugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('done', () => {
    if (self.server === null) {
      self.server = electronConnect.create(self.options);
      self.server.start();
    } else {
      self.server.restart();
    }
  });
};

exports.ElectronMainWebpackPlugin = ElectronMainWebpackPlugin;

//
//
//
//
function ElectronRendererWebpackPlugin(mainPlugin, options) {
  ElectronRendererWebpackPlugin.prototype.mainPlugin = mainPlugin;
  ElectronRendererWebpackPlugin.prototype.options = options;
}

ElectronRendererWebpackPlugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('done', () => {
    if (self.mainPlugin.server) {
      self.mainPlugin.server.reload();
    }
  });
};

exports.ElectronRendererWebpackPlugin = ElectronRendererWebpackPlugin;
