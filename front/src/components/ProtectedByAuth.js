import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useGlobalContext } from "../Hooks/useGlobalContext";

export const ProtectedByAuth = () => {
  const { user } = useGlobalContext();
  const location = useLocation();
  console.log("PROTECTED BY AUTH");
  return user ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};
