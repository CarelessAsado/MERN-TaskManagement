import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { ContextProvider } from "./Context/context";

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <Navbar></Navbar>
      <App />
    </BrowserRouter>
  </ContextProvider>,
  document.getElementById("root")
);
