import "./App.css";
import { Routes, Route } from "react-router-dom";

/*-----------PAGES**********************/
import { RegisterOrLogin } from "./pages/Register";
import { Main } from "./pages/Main";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { ForgotPassword } from "./pages/ForgotPassword";
/*----------JWT RELATED-----------------*/
import { PersistLogin } from "./components/PersistLogin";
import { ProtectedByAuth } from "./components/ProtectedByAuth";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Routes>
          {/* --------------PROTECTED ROUTES------------ */}
          <Route element={<PersistLogin />}>
            <Route element={<ProtectedByAuth />}>
              <Route path="/" element={<Main />}></Route>
              <Route path="/profile/:userId" element={<UserProfile />}></Route>
            </Route>
          </Route>
          {/* NON PROTECTED ROUTES */}
          <Route path="/register" element={<RegisterOrLogin />}></Route>
          <Route path="/login" element={<RegisterOrLogin />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
