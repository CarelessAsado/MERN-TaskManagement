import { useState } from "react";
import "./Register.css";
import { registerPost, loginPost } from "../API/userAPI";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Hooks/useGlobalContext";
import { actions } from "../Context/reducer";
export const RegisterOrLogin = () => {
  const [emailUsuario, setEmailUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmaContraseña, setConfirmaContraseña] = useState("");
  const [success, setSuccess] = useState("");
  /*---------------------------------------*/
  const { dispatch, error } = useGlobalContext();
  /*----------------REDIRECT------------------------------*/
  let navigate = useNavigate();
  /*-----------------------REGISTER-----------------------*/
  function handleSubmitRegister(e) {
    e.preventDefault();
    if (!emailUsuario || !contraseña || !confirmaContraseña) {
      return dispatch({
        type: actions.VALIDATION_ERROR,
        payload: "No puede haber campos vacíos.",
      });
    }
    return registerPost(
      {
        emailUsuario,
        contraseña,
        confirmaContraseña,
      },
      dispatch,
      navigate,
      setSuccess
    );
  }
  /*----------HACER LOGIN---------*/
  function handleSubmitLogin(e) {
    e.preventDefault();
    if (!emailUsuario || !contraseña) {
      return dispatch({
        type: actions.VALIDATION_ERROR,
        payload: "No puede haber campos vacíos.",
      });
    }
    loginPost({ emailUsuario, contraseña }, dispatch, navigate);
  }
  return (
    <form
      onSubmit={
        window.location.pathname === "/register"
          ? handleSubmitRegister
          : handleSubmitLogin
      }
    >
      <header>
        <h2>
          {window.location.pathname === "/register"
            ? "Registrate"
            : "Iniciá sesión"}
        </h2>
      </header>
      {error ? (
        <div className="errorContainer">
          <div>{error}</div>
          <i
            className="fas fa-times"
            onClick={() => dispatch({ type: actions.CLEAR_ERRORS })}
          ></i>
        </div>
      ) : (
        ""
      )}
      {success && (
        <div className="errorContainer success">
          <div>{success}</div>
          <i className="fas fa-times" onClick={() => setSuccess("")}></i>
        </div>
      )}
      <div className="formControl">
        <input
          type="text"
          id="emailUsuario"
          placeholder={
            window.location.pathname === "/register"
              ? "Email nuevo usuario"
              : "Email"
          }
          value={emailUsuario}
          onChange={(e) => {
            setEmailUsuario(e.target.value);
          }}
        />
        <label htmlFor="emailUsuario"></label>
      </div>
      <div className="formControl">
        <input
          type="password"
          id="contraseña"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => {
            setContraseña(e.target.value);
          }}
        />
        <label htmlFor="contraseña"></label>
      </div>
      {window.location.pathname === "/register" && (
        <div className="formControl">
          <input
            type="password"
            id="confirmaContraseña"
            placeholder="Confirmá la contraseña"
            value={confirmaContraseña}
            onChange={(e) => {
              setConfirmaContraseña(e.target.value);
            }}
          />
          <label htmlFor="confirmaContraseña"></label>
        </div>
      )}

      <input
        type="submit"
        value={
          window.location.pathname === "/register"
            ? "Registrarse"
            : "Iniciar sesión"
        }
      />
      <div className="marginLine"></div>
      <Link
        to={window.location.pathname === "/register" ? "/login" : "/register"}
      >
        <button className="redirect">
          {window.location.pathname === "/register"
            ? "Iniciar sesión"
            : "Crear cuenta nueva"}
        </button>
      </Link>
    </form>
  );
};
