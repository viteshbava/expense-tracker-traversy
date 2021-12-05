import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AddEditContextProvider from "./store/addEdit-context";

ReactDOM.render(
  <React.StrictMode>
    <AddEditContextProvider>
      <App />
    </AddEditContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
