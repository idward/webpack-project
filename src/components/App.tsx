import React from "react";
import '../style.scss';

interface AppProps {}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div className="container">
        <h1>This is page 1!</h1>
        <p className="myColor">XXXXXXXXXXXXX</p>
      </div>
    );
  }
}

export default App;
