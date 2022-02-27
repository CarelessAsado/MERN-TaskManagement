import React from "react";
import { Header } from "../components/Header";
import { TodoForm } from "../components/TodoForm";
import { useRefreshToken } from "../Hooks/useRefreshToken";

export const Main = () => {
  const refresh = useRefreshToken();
  return (
    <>
      <Header />
      <TodoForm />
      <button onClick={() => refresh()}>REFRESCAR</button>
    </>
  );
};
