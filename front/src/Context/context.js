import React, { useReducer } from "react";
import { reducerTasksUser } from "./reducer";

export const AppContext = React.createContext({});
const initialState = { user: null, tasks: [], error: false, token: "" };
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerTasksUser, initialState);
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
