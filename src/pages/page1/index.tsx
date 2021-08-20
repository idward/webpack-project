import React from "react";
import ReactDOM from "react-dom";
import "../../style.scss";
import "./page1.scss";
import App from "../../components/App";


ReactDOM.hydrate(<App />, document.getElementById("app"));
