import React from "react";
import Logo from "../assets/MarketplaceArtwork.png";
import path from "path";
import Electron, { remote } from "electron";
// const Logo = require('../assets/MarketplaceArtwork.png');
type Win = Electron.BrowserWindow | null;
interface AppProps {}

const App: React.FC<AppProps> = () => {
  const handleBtnClick = () => {
    const appPath = remote.app.getAppPath();
    console.log(appPath);

    const modalPath = `file://${path.resolve(
      __dirname,
      appPath,
      "dist/index.html"
    )}`;

    let win: Win = new remote.BrowserWindow({
      width: 400,
      height: 320,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      },
    });

    win.on("close", function () {
      win = null;
    });

    win.loadURL(modalPath);

    win.show();
  };

  return (
    <div className="container">
      <h1>This is page 1!</h1>
      <p className="myColor">XXXXXXXXXXXXX</p>
      <img src={Logo} alt="logo" />

      <button onClick={handleBtnClick}>open page</button>
    </div>
  );
};

export default App;
