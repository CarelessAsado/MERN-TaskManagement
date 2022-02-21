import { useContext } from "react";
import { AppContext } from "../Context/context";

export const useGlobalContext = () => {
  return useContext(AppContext);
};
