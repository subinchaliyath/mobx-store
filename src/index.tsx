import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TodoStore } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <App todoStore={TodoStore} />
  </React.StrictMode>,
  document.getElementById("root")
);
