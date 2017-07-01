const electron = require('electron');
const Path = require('path');

// Module to control application life.
const { app, ipcMain, globalShortcut } = electron;
// Module to create native browser window.
const { BrowserWindow } = electron;


let client;
if (process.env.ENV !== 'production') {
  client = require('electron-connect').client;
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  var img;
  if (process.platform === 'win32') {
    img = require('./assets/images/angular.ico');
  } else {
    img = require('./assets/images/angular.png');
  }
  var icon = Path.resolve(__dirname, img);

  // Create the browser window.
  win = new BrowserWindow({
    icon: icon,
    frame: false,
    width: 1281, height: 800, minWidth: 1281, minHeight: 800
  });
  win.setMenu(null);


  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);
  console.log(`loading file://${__dirname}/index.html`);
  //win.show();
  //win.maximize();
  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  globalShortcut.register('ctrl+d', function () {
    win.webContents.openDevTools();
  });

  globalShortcut.register('ctrl+r', function () {
    win.reload();
  });

  if (client) {
    // Use electron-connect to reload page when source changes
    client.create(win, {
      logLevel: 0
    });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// Event communication
ipcMain.on('close-main-window', function () {
  app.quit();
});

ipcMain.on('turn-on-full-screen-mode', function (event, arg) {
  win.setFullScreen(true);
  event.sender.send('resize');
});

ipcMain.on('turn-off-full-screen-mode', function (event, arg) {
  win.setFullScreen(false);
  event.sender.send('resize');
});
