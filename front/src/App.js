import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

/*-----------PAGES**********************/
import { RegisterOrLogin } from "./pages/Register";
import { Main } from "./pages/Main";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { ForgotChangePassword } from "./pages/ForgotChangePassword";
/*----------JWT RELATED-----------------*/
import { PersistLogin } from "./components/PersistLogin";
import { ProtectedByAuth } from "./components/ProtectedByAuth";
import { useEffect } from "react";
import { useGlobalContext } from "./Hooks/useGlobalContext";
import { actions } from "./Context/reducer";
import { useInterceptorRefreskTkn } from "./Hooks/useInterceptorRefreskTkn";

function App() {
  /*----------------RESET ERRORS ON NAVIGATION*/
  const location = useLocation();
  const { dispatch } = useGlobalContext();
  useEffect(() => {
    dispatch({ type: actions.CLEAR_ERRORS });
  }, [location.pathname, dispatch]);
  /*-----------------------------------------*/
  useInterceptorRefreskTkn();

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
          <Route
            path="/forgot-password/:secretLinkId/changePassword"
            element={<ForgotChangePassword />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
