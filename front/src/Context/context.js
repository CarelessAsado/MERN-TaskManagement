import React, { useReducer } from "react";
import { useErrorHandler } from "../Hooks/useErrorHandler";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { reducerTasksUser } from "./reducer";

export const AppContext = React.createContext({});
const initialState = { user: null, tasks: [], error: false, loading: false };
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerTasksUser, initialState);
  const [userLocalStorage, setUserLocalStorage, deleteUserStorage] =
    useLocalStorage("user", null);

  const errorHandler = useErrorHandler(dispatch, deleteUserStorage);
  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        userLocalStorage,
        setUserLocalStorage,
        deleteUserStorage,
        errorHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
