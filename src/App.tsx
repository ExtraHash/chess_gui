import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./stylesheets/style.scss";
import Router from "./Router";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
