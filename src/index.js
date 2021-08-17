import ReactDOM from "react-dom";
import "./style.scss";

const App = () => {
  console.log("this is test");
  return (
    <div className="container">
      <h1>Hello World!</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
