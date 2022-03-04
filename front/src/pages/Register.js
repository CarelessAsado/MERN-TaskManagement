import { useRef, useState } from "react";
import "./Register.css";
import { registerPost, loginPost } from "../API/userAPI";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Hooks/useGlobalContext";
import { actions } from "../Context/reducer";

export const RegisterOrLogin = () => {
  const email = useRef();
  const pwd = useRef();
  const [confirmaContraseña, setConfirmaContraseña] = useState("");
  const [nombre, setNombre] = useState("");
  const [success, setSuccess] = useState("");
  /*---------------------------------------*/
  const { dispatch, error, setUserLocalStorage, loading } = useGlobalContext();
  /*----------------REDIRECT------------------------------*/
  let navigate = useNavigate();
  /*-----------------------REGISTER-----------------------*/
  function handleSubmitRegister(e) {
    const emailUsuario = email.current.value;
    const contraseña = pwd.current.value;
    e.preventDefault();
    if (!emailUsuario || !contraseña || !confirmaContraseña || !nombre) {
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
        nombre,
      },
      navigate,
      setSuccess,
      dispatch
    );
  }
  /*--------------------------------HACER LOGIN-----------------------------------------------------*/
  async function handleSubmitLogin(e) {
    e.preventDefault();
    const contraseña = pwd.current.value;
    const emailUsuario = email.current.value;
    if (!emailUsuario || !contraseña) {
      return dispatch({
        type: actions.VALIDATION_ERROR,
        payload: "No puede haber campos vacíos.",
      });
    }
    loginPost({ email, pwd }, dispatch, navigate, setUserLocalStorage);
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
      {error && (
        <div className="errorContainer">
          <div>{error}</div>
          <i
            className="fas fa-times"
            onClick={() => dispatch({ type: actions.CLEAR_ERRORS })}
          ></i>
        </div>
      )}
      {success && (
        <div className="errorContainer success">
          <div>{success}</div>
          <i className="fas fa-times" onClick={() => setSuccess("")}></i>
        </div>
      )}
      {window.location.pathname === "/register" && (
        <div className="formControl">
          <label htmlFor="nombre"></label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre *"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
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
          ref={email}
        />
        <label htmlFor="emailUsuario"></label>
      </div>
      <div className="formControl">
        <input
          type="password"
          id="contraseña"
          placeholder="Contraseña"
          ref={pwd}
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
        disabled={loading}
        type="submit"
        value={
          loading
            ? "Cargando..."
            : window.location.pathname === "/register"
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
      {window.location.pathname === "/login" && (
        <Link to="/forgot-password">
          <div>Me olvidé la contraseña</div>
        </Link>
      )}
    </form>
  );
};
