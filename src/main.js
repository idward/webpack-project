const path = require("path");
const { app, BrowserWindow } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
  });

  win.webContents.openDevTools();

  const indexPage = `file://${path.resolve(__dirname, "../dist/index.html")}`;
  console.log('AAAAAAAAA');
  console.log(indexPage);

  win.loadURL(indexPage);

  win.on("close", function () {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
