import React, { useState } from "react";
import { forgotPasswordSendMeAnEmail } from "../../API/userAPI";
import { actions } from "../../Context/reducer";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import "./ForgotPassword.css";
export const ForgotPassword = () => {
  const { dispatch, error } = useGlobalContext();
  const [emailUsuario, setEmailUsuario] = useState("");
  const [success, setSuccess] = useState("");
  return (
    <>
      <form
        id="forgotPwdForm"
        onSubmit={(e) =>
          forgotPasswordSendMeAnEmail(e, emailUsuario, dispatch, setSuccess)
        }
      >
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
        <label htmlFor="email">Escribí tu email.</label>
        <input
          type="text"
          value={emailUsuario}
          onChange={(e) => setEmailUsuario(e.target.value)}
          id="email"
          placeholder="Email *"
        />

        <input type="submit" value="Enviar" />
        <div className="info">
          Te vamos a enviar un mail. Seguí los pasos ahí indicados y vas a poder
          recuperar tu cuenta.
        </div>
      </form>
    </>
  );
};
