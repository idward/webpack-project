import { render } from "react-dom";
import "./style.scss";
import App from './components/App';

render(<App />, document.getElementById("app"));

if (module.hot) {
  console.log("fdasfas");
  module.hot.accept(["./components/App"], () => {
    render(<App />, document.getElementById("app"));
  });
}
