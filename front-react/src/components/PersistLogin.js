import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export const PersistAuth = () => {
  const [loading, setLoading] = useState(true);
  console.log("estamos en persist");
  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(token);
      if (token) {
        /*  actualizar el state dsp */
        return setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "error parsing");
    }
  }, []);
  return loading ? <h1>Loading...</h1> : <Outlet />;
};
