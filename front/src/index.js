import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { ContextProvider } from "./Context/context";

ReactDOM.render(
  <BrowserRouter>
    <ContextProvider>
      <Navbar></Navbar>
      <App />
    </ContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
