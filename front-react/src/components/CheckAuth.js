import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const CheckAuth = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        return setLoading(false);
      }
      useNavigate("/login");
    } catch (error) {
      console.log(error, "error parsing");
    }
  }, []);
  return loading ? <h1>Loading...</h1> : <Outlet />;
};
