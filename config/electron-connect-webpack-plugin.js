
//
// Use electron-connect to start electron and to reload the page when source changes.
//
var electronConnect = require('electron-connect').server;

function MainPlugin(server, readyCallback) {
  this.server = server;
  this.readyCallback = readyCallback
}

MainPlugin.prototype.apply = function (compiler) {
  let self = this;
  let first = true;

  compiler.plugin('done', () => {
    if (first) {
      self.readyCallback();
      first = false;
    } else {
      self.server.restart();
    }
  });
};

function RendererPlugin(server, readyCallback) {
  RendererPlugin.prototype.server = server;
  RendererPlugin.prototype.readyCallback = readyCallback
}

RendererPlugin.prototype.apply = function (compiler) {
  let self = this;
  let first = true;

  compiler.plugin('done', () => {
    if (first) {
      self.readyCallback();
      first = false;
    } else {
      self.server.reload();
    }
  });
};



function ElectronConnectPlugin(args, options) {
  this.count = 0;
  let server = electronConnect.create(options);

  let self = this;
  let ready = () => {
    self.count++;
    if (self.count == 2) {
      server.start(args, (state) => {
        if (state == 'stopped') {
          // stop webpack
          process.exit();
        }
      });
    }
  }

  this.mainPlugin = new MainPlugin(server, ready);
  this.rendererPlugin = new RendererPlugin(server, ready);
}

module.exports = ElectronConnectPlugin;
