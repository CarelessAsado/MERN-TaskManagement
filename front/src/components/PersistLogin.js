import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { tareasAPI } from "../API/tareasAPI";
import { actions } from "../Context/reducer";
import { useGlobalContext } from "../Hooks/useGlobalContext";

export const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const { dispatch } = useGlobalContext();
  console.log("estamos en persist");
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      if (user) {
        /*  actualizar el state dsp */
        dispatch({ type: actions.LOGIN, payload: user });
        return setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "error parsing");
    }
  }, [dispatch]);
  return loading ? <h1>Loading...</h1> : <Outlet />;
};
