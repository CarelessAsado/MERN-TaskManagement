import "./App.css";
import { Routes, Route } from "react-router-dom";

/*-----------PAGES**********************/
import { Register } from "./pages/Register";
import { Main } from "./pages/Main";
/*----------JWT RELATED-----------------*/
import { PersistLogin } from "./components/PersistLogin";
import { ProtectedByAuth } from "./components/ProtectedByAuth";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route element={<PersistLogin />}>
            <Route element={<ProtectedByAuth />}>
              <Route path="/" element={<Main />}></Route>
            </Route>
          </Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Register />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
