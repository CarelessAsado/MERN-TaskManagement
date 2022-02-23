import React, { useState } from "react";
import { forgotPasswordSendMeAnEmail } from "../API/userAPI";
import { useGlobalContext } from "../Hooks/useGlobalContext";

export const ForgotPassword = () => {
  const { dispatch } = useGlobalContext();
  const [emailUsuario, setEmailUsuario] = useState("");
  return (
    <div className="container">
      <form
        onSubmit={(e) => forgotPasswordSendMeAnEmail(e, emailUsuario, dispatch)}
      >
        <div>Te olvidaste tu contraseña?</div>
        <label htmlFor="email">Escribí tu email.</label>
        <input
          type="text"
          value={emailUsuario}
          onChange={(e) => setEmailUsuario(e.target.value)}
          id="email"
        />

        <input type="submit" value="Enviar" />
        <div>
          Te vamos a enviar un mail. Seguí los pasos ahí indicados y vas a poder
          recuperar tu cuenta.
        </div>
      </form>
    </div>
  );
};
