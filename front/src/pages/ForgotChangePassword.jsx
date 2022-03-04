import { useState } from "react";
import { useParams } from "react-router-dom";
import { forgotPasswordCHANGEPWD } from "../API/userAPI";
import { actions } from "../Context/reducer";
import { useGlobalContext } from "../Hooks/useGlobalContext";

export const ForgotChangePassword = () => {
  const { secretLinkId } = useParams();
  const { dispatch, error, loading } = useGlobalContext();
  const [success, setSuccess] = useState("");
  /*-------------INPUT NEW PWD + PWD2---------------------*/
  const [pwdsUsuario, setPwdsUsuario] = useState({
    contraseña: "",
    confirmaContraseña: "",
  });
  function getInputNewPwd(e) {
    const name = e.target.name;
    setPwdsUsuario({ ...pwdsUsuario, [name]: e.target.value });
  }
  /*--------------------------------------------------*/
  function handleSubmitNewPwd(e) {
    e.preventDefault();
    if (!pwdsUsuario.contraseña || !pwdsUsuario.confirmaContraseña) {
      return dispatch({
        type: actions.VALIDATION_ERROR,
        payload: "Completar contraseñas.",
      });
    }
    /*---------------*/
    forgotPasswordCHANGEPWD(pwdsUsuario, dispatch, secretLinkId, setSuccess);
  }
  return (
    <form id="forgotPwdForm" onSubmit={handleSubmitNewPwd}>
      <h2>Te olvidaste tu contraseña?</h2>
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
      <label htmlFor="contraseña">Escribí tu nueva contraseña.</label>
      <input
        type="password"
        onChange={getInputNewPwd}
        id="contraseña"
        name="contraseña"
        placeholder="Contraseña *"
      />
      <label htmlFor="confirmaContraseña">Confirmá tu contraseña.</label>
      <input
        type="password"
        onChange={getInputNewPwd}
        id="confirmaContraseña"
        name="confirmaContraseña"
        placeholder="Confirmá tu contraseña *"
      />

      <input
        type="submit"
        disabled={loading}
        value={loading ? "Cargando..." : "Enviar"}
      />
      <div className="info">
        Último paso! Elegí tu nueva contraseña y ya estas listo para iniciar
        sesión.
      </div>
    </form>
  );
};
