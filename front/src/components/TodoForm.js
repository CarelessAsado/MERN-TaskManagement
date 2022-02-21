import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TodoItem } from "./TodoItem";
import { tareasAPI } from "../API/tareasAPI";
import { useGlobalContext } from "../Hooks/useGlobalContext";
import { actions } from "../Context/reducer";

export const TodoForm = () => {
  const { tasks, dispatch, error } = useGlobalContext();
  /*---------REDIRECT---------------------*/
  let navigate = useNavigate();
  /*/-----------------------------------*/
  const [tareas, setTareas] = useState([]);

  const [inputNuevaTarea, setInputNuevaTarea] = useState("");

  /*---------------------------SECCION FILTRO---------------------*/
  /*--------------------------------------------------------------*/
  const [stateFilter, setStateFilter] = useState("Todas");
  const [filteredTodos, setFilteredTodos] = useState([]);
  /*----en base al stateFilter voy a decidir de mostrar todas, algunas u otras*/
  useEffect(() => {
    if (stateFilter === "Todas") {
      return setFilteredTodos(tasks);
    } else if (stateFilter === "Completadas") {
      return setFilteredTodos(tasks.filter((item) => item.completada === true));
    }
    return setFilteredTodos(tasks.filter((item) => item.completada === false));
  }, [tasks, stateFilter]);

  /*-------CONEXION DATABASE------------*/
  /*------get tareas ON LOAD*/

  const token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    async function fetchAPI() {
      if (!token) {
        return navigate("/login");
      }
      try {
        const data = await tareasAPI.fetchTareasTodas(dispatch, token);
        setTareas(data);
      } catch (error) {
        console.log(error, "ERROR FETCH");
        console.log(error.message);
        if (error.message === "Failed to fetch") {
          /* return setError(["Hubo un problema en la conexión."]); */
        }
        /*   setError([error.message]); */
      }
    }
    fetchAPI();
    // eslint-disable-next-line
  }, []);
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
    tareasAPI.guardarTareaPost(
      { descripcion: inputNuevaTarea },
      dispatch,
      token
    );
    setInputNuevaTarea("");
  }

  function beginUpdateDescripcion(inputAModificar, setIsEditing) {
    setIsEditing(true);
    inputAModificar.current.focus();
    inputAModificar.current.removeAttribute("readonly");
  }
  async function finishUpdateDescripcion(
    id,
    setIsEditing,
    inputAModificar,
    inputTarea,
    descripcionOriginal,
    setInputTarea
  ) {
    if (!inputTarea) {
      return dispatch({
        type: actions.VALIDATION_ERROR,
        payload: "No puede haber campos vacíos",
      });
    }
    if (inputTarea.trim() === descripcionOriginal) {
      setInputTarea(descripcionOriginal);
      return;
    }
    try {
      let { completada } = tasks.find((item) => item.id === id);
      await tareasAPI.actualizarTarea(
        id,
        {
          descripcion: inputTarea,
          completada,
        },
        dispatch,
        token
      );

      inputAModificar.current.setAttribute("readonly", true);
      setIsEditing(false);
    } catch (error) {
      /*      if (error.message === "Network Error") {
        setInputTarea(descripcionOriginal);
        setIsEditing(false);
        return setError(["Hubo un problema en la conexión."]);
      }
      setError([error.response.data]); */
    }
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
            <TodoItem
              key={item.id}
              tarea={item}
              beginUpdateDescripcion={beginUpdateDescripcion}
              finishUpdateDescripcion={finishUpdateDescripcion}
              tareas={tareas}
            ></TodoItem>
          ))
        )}
      </section>
    </section>
  );
};
