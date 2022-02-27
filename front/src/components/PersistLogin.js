import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { setHeadersPostLogin } from "../API/url";
import { actions } from "../Context/reducer";
import { useGlobalContext } from "../Hooks/useGlobalContext";

export const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const { dispatch, user } = useGlobalContext();
  console.log("estamos en persist");
  useEffect(() => {
    function checkStorage() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(
          user,
          "USER EN EL PERSIST, previo a chequear si despachamos login o no"
        );
        if (user) {
          /*  actualizar el state dsp */
          const { accessToken, ...remaining } = user;
          dispatch({ type: actions.LOGIN, payload: remaining });
          setHeadersPostLogin(accessToken);
          return setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error, "error parsing en PersistLogin");
      }
    }
    user ? setLoading(false) : checkStorage();
  }, [dispatch, user]);
  return loading ? <h1>Loading...</h1> : <Outlet />;
};
