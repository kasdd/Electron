const electron = require("electron");

const countdown = require("./countdown.js");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

const windows = [];

app.on("ready", _ => {
  [1, 2, 3].forEach(_ => {
    let win = new BrowserWindow({
      height: 400,
      width: 400
    });

    win.loadURL(`file://${__dirname}/countdown.html`);
    // win.webContents.openDevTools();

    win.on("closed", _ => {
      console.log("The window is closed");
      mainWindow = null;
    });

    windows.push(win);
  });
});

ipc.on("countdown-start", _ => {
  countdown(count => {
      windows.forEach(win => {
        win.webContents.send("countdown", count);
      });
  });
});
