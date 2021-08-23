import React from "react";
import '../style.scss';

interface AppProps {}

class HelloWebpack extends React.Component<AppProps> {
  render() {
    return (
      <div className="container">
        <h1>Hello Webpack</h1>
        <p className="myColor">this is hello webpack page</p>
      </div>
    );
  }
}

export default HelloWebpack;