import React, { useReducer } from "react";
import { reducerTasksUser } from "./reducer";

export const AppContext = React.createContext({ user: null, tasks: [] });

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerTasksUser);
  return (
    <AppContext.Provider value={(state, dispatch)}>
      {children}
    </AppContext.Provider>
  );
};
