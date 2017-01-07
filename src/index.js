const electron = require('electron');
const Path = require('path');
// Module to control application life.
const {app, ipcMain} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

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
    width: 1624, height: 1024,
    minWidth: 800, minHeight: 600,
    icon: icon
  });
  win.setMenu(null);

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);
  console.log(`loading file://${__dirname}/index.html`);
  win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
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

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.sender.send('asynchronous-reply', 'pong')
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
