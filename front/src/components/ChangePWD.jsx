import React from "react";

export const ChangePWD = ({ changeOverlay }) => {
  return (
    <div className="containerChangePWD">
      <div className="container">
        <i class="fa fa-times" aria-hidden="true" onClick={changeOverlay}></i>
        <form>
          <label htmlFor="pwd">Nueva contraseña</label>
          <input type="password" name="" id="pwd" />
          <label htmlFor="pwd2">Confirmar nueva contraseña</label>
          <input type="password" name="" id="pwd2" />
          <input type="submit" value="Cambiar contraseña" />
        </form>
      </div>
    </div>
  );
};
