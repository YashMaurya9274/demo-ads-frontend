import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      {" "}
      {/* StateProvider creates data layer */}
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
