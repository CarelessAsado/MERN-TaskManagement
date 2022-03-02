import React, { useReducer } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { reducerTasksUser } from "./reducer";
import { keyStorage } from "../API/url";

export const AppContext = React.createContext({});
const initialState = { user: null, tasks: [], error: false, loading: false };
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerTasksUser, initialState);
  const [userLocalStorage, setUserLocalStorage] = useLocalStorage(
    keyStorage,
    null
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        userLocalStorage,
        setUserLocalStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
