import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { setHeadersPostLogin } from "../API/url";
import { actions } from "../Context/reducer";
import { useGlobalContext } from "../Hooks/useGlobalContext";

export const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const { dispatch, user, userLocalStorage } = useGlobalContext();
  console.log("estamos en persist", user);
  useEffect(() => {
    function checkStorage() {
      try {
        console.log(
          userLocalStorage,
          "USER EN EL PERSIST, previo a chequear si despachamos login o no"
        );
        if (userLocalStorage) {
          /*  actualizar el state dsp */
          const { accessToken } = userLocalStorage;
          dispatch({ type: actions.LOGIN, payload: userLocalStorage });
          setHeadersPostLogin(accessToken);
          return setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error, "error parsing en PersistLogin");
      }
    }
    user ? setLoading(false) : checkStorage();
  }, [dispatch, user, userLocalStorage]);

  return loading ? <h1>Loading...</h1> : <Outlet />;
};
