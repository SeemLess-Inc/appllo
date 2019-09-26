import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import Root from "./views/Root";
import "./assets/fomantic/dist/semantic.css";
import "./index.css";

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

