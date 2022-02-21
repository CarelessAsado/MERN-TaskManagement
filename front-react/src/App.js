import "./App.css";
import { Routes, Route } from "react-router-dom";

/*-----------PAGES**********************/

import { Register } from "./pages/Register";
import { Main } from "./pages/Main";
import { CheckAuth } from "./components/CheckAuth";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route element={CheckAuth}>
            <Route path="/" element={<Main />}></Route>
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Register />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
