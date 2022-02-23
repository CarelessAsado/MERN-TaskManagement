import React, { useState, useRef } from "react";
import { tareasAPI } from "../API/tareasAPI";
import { useGlobalContext } from "../Hooks/useGlobalContext";

export const TodoItem = ({ tarea, finishUpdateDescripcion }) => {
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
    inputAModificar.current.removeAttribute("readonly");
  }
  /*-----------------------------------------------*/
  return (
    <div className="tareaItem ">
      <input
        className={`${isEditing ? "edit" : ""} ${
          tarea.completada ? "completada" : ""
        } `}
        readOnly
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
              finishUpdateDescripcion(
                tarea.id,
                setIsEditing,
                inputAModificar,
                inputTarea,
                tarea.descripcion,
                setInputTarea
              );
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
