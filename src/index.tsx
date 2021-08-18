import React from "react";
import ReactDOM from "react-dom";
import "./style.scss";
import Logo from "./assets/MarketplaceArtwork.png";

interface AppProps {
    
}

const App: React.FC<AppProps> = () => {
  console.log("this is test");
  return (
    <div className="container">
      <h1>Hello World!</h1>
      <img src={Logo} alt="logo" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
