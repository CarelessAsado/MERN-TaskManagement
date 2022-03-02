import { useEffect, useState } from "react";
import "./UserProfile.css";
import { ChangePWD } from "../../components/ChangePWD";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { userProfileAPI } from "../../API/userProfileAPI";
export const UserProfile = () => {
  const { user, dispatch, errorHandler } = useGlobalContext();
  const [showOverlay, setShowOverlay] = useState(false);
  const { nombre = "Usuario", emailUsuario, _id } = user;
  useEffect(() => {
    userProfileAPI.getUserProfile(_id, dispatch, errorHandler);
  }, [_id, dispatch]);
  function changeOverlay() {
    setShowOverlay(!showOverlay);
  }
  return (
    <>
      <div>UserProfile</div>
      <h2>{nombre}</h2>
      <div>{emailUsuario}</div>
      <button
        className="changePwd"
        type="submit"
        onClick={() => setShowOverlay(!showOverlay)}
      >
        Cambiar contraseña
      </button>
      {showOverlay && <ChangePWD changeOverlay={changeOverlay} />}
      <button className="closeAccount">Cerrar cuenta</button>
    </>
  );
};
