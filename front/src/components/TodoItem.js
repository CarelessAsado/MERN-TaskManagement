import React, { useState, useRef } from "react";
import { tareasAPI } from "../API/tareasAPI";
import { actions } from "../Context/reducer";
import { useGlobalContext } from "../Hooks/useGlobalContext";

export const TodoItem = ({ tarea }) => {
  const [inputTarea, setInputTarea] = useState(tarea.descripcion);
  const [isEditing, setIsEditing] = useState(false);
  const { dispatch, tasks } = useGlobalContext();
  /*-----------------------*/
  const inputAModificar = useRef();
  /*------------------------------------*/
  const token = JSON.parse(localStorage.getItem("token"));
  async function deleteTarea(id) {
    tareasAPI.borrarTarea(id, dispatch, token);
  }
  async function changeCompletada(id) {
    let { descripcion, completada } = tasks.find((item) => item.id === id);
    tareasAPI.actualizarTarea(
      id,
      {
        descripcion,
        completada: !completada,
      },
      dispatch,
      token
    );
  }
  /*-------------------BEGIN UPDATE DESCRIPCION-----------*/
  function beginUpdateDescripcion() {
    setIsEditing(true);
    inputAModificar.current.focus();
    /* inputAModificar.current.removeAttribute("readonly"); */
  }
  /*-----------------------------------------------*/
  async function finishUpdateDescripcion(id, descripcionOriginal) {
    setIsEditing(false);
    if (!inputTarea) {
      setInputTarea(descripcionOriginal);
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

      /*  inputAModificar.current.setAttribute("readonly", true); */
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
    <div className="tareaItem ">
      <input
        className={`${isEditing ? "edit" : ""} ${
          tarea.completada ? "completada" : ""
        } `}
        readOnly={!isEditing}
        value={inputTarea}
        onChange={(e) => {
          setInputTarea(e.target.value);
        }}
        ref={inputAModificar}
      ></input>
      <div className="funcionalidadTareaItem">
        <i
          className="fas fa-check"
          onClick={() => changeCompletada(tarea.id)}
        ></i>
        {isEditing ? (
          <i
            className="far fa-save"
            onClick={() => {
              finishUpdateDescripcion(tarea.id, tarea.descripcion);
            }}
          ></i>
        ) : (
          <i className="fas fa-pen" onClick={beginUpdateDescripcion}></i>
        )}

        <i
          className="fas fa-trash"
          onClick={() => {
            deleteTarea(tarea.id);
          }}
        ></i>
      </div>
    </div>
  );
};
