import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';

let win, dev;
const args = process.argv.slice(1);
console.log(args)
dev = args.some(val => val === '--dev');

if (dev) {
  require('electron-reload')(__dirname, {
  });
}

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height
  });


  // Open the DevTools.
  if (dev) {
    win.webContents.on('did-fail-load', () => {
      setTimeout(() => win.reload(), 2000);
    })
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    // and load the index.html of the app.
    win.loadURL('file://' + __dirname + '/index.html');
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

try {

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

} catch (e) {
  // Catch Error
  // throw e;
}
