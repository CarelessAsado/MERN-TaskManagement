import React, { useReducer } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { reducerTasksUser } from "./reducer";

export const AppContext = React.createContext({});
const initialState = { user: null, tasks: [], error: false, loading: false };
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerTasksUser, initialState);
  const [userLocalStorage, setUserLocalStorage, deleteUserStorage] =
    useLocalStorage("user", null);
  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        userLocalStorage,
        setUserLocalStorage,
        deleteUserStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
