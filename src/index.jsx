import * as React from "react";
import * as ReactDOM from "react-dom/client";
import * as RRD from "react-router-dom";
import App from "./app";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RRD.BrowserRouter>
      <App />
    </RRD.BrowserRouter>
  </React.StrictMode>
);
