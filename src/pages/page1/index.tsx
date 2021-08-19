import React from "react";
import ReactDOM from "react-dom";
import "../../style.scss";
import "./page1.scss";
import Logo from "../../assets/MarketplaceArtwork.png";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  console.log("this is test");
  return (
    <div className="container">
      <h1>This is page 1!</h1>
      <p className="myColor">XXXXXXXXXXXXX</p>
      <img src={Logo} alt="logo" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));