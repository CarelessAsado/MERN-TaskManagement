import React, { useState, useEffect } from "react";
/* import { useNavigate } from "react-router-dom"; */
import { TodoItem } from "./TodoItem";
import { tareasAPI } from "../API/tareasAPI";
import { useGlobalContext } from "../Hooks/useGlobalContext";
import { actions } from "../Context/reducer";

export const TodoForm = () => {
  const { tasks, dispatch, error, errorHandler } = useGlobalContext();
  /*/-----------------------------------*/
  const [inputNuevaTarea, setInputNuevaTarea] = useState("");
  /*-------CONEXION DATABASE------------*/
  /*------get tareas ON LOAD*/
  useEffect(() => {
    function fetchAPI() {
      tareasAPI.fetchTareasTodas(dispatch, errorHandler);
    }
    fetchAPI();
  }, [dispatch]);
  /*---------------------------SECCION FILTRO---------------------*/
  /*--------------------------------------------------------------*/
  const [stateFilter, setStateFilter] = useState("Todas");
  const [filteredTodos, setFilteredTodos] = useState([]);
  /*----en base al stateFilter voy a decidir de mostrar todas, algunas u otras*/
  useEffect(() => {
    if (!tasks) {
      return;
    }
    if (stateFilter === "Todas") {
      return setFilteredTodos(tasks);
    } else if (stateFilter === "Completadas") {
      return setFilteredTodos(tasks.filter((item) => item.completada === true));
    }
    return setFilteredTodos(tasks.filter((item) => item.completada === false));
  }, [tasks, stateFilter]);

  /*------------GUARDAR TAREAS CON AXIOS.POST---------------*/
  //aca hay q mandar el TOKEN en Headers
  async function handleSubmit(e) {
    e.preventDefault();
    if (!inputNuevaTarea) {
      return dispatch({
        type: actions.VALIDATION_ERROR,
        payload: "No puede haber campos vacíos",
      });
    }
    tareasAPI.guardarTareaPost({ descripcion: inputNuevaTarea }, dispatch);
    setInputNuevaTarea("");
  }
  return (
    <section className="main">
      {error && (
        <div className="errorContainer">
          <div>{error}</div>
          <i
            className="fas fa-times"
            onClick={() => dispatch({ type: actions.CLEAR_ERRORS })}
          ></i>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="blockSubmitInput">
          <input
            className="nuevaTarea"
            type="text"
            value={inputNuevaTarea}
            onChange={(e) => {
              setInputNuevaTarea(e.target.value);
            }}
            placeholder="Ingresar tarea"
            autoFocus
          />
          <button>+</button>
        </div>
        <div className="select">
          <select
            value={stateFilter}
            onChange={(e) => {
              setStateFilter(e.target.value);
            }}
          >
            <option value="Todas">Todas las tareas</option>
            <option value="Completadas">Completadas</option>
            <option value="Inconclusas">Inconclusas</option>
          </select>
        </div>
      </form>
      <section className="containerTareaItems">
        {filteredTodos.length === 0 ? (
          <h4>No hay tareas para mostrar.</h4>
        ) : (
          filteredTodos?.map((item) => (
            <TodoItem key={item.id} tarea={item}></TodoItem>
          ))
        )}
      </section>
    </section>
  );
};
