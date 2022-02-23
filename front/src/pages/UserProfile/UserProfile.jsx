import { useEffect, useState } from "react";
import "./UserProfile.css";
import axios from "../../API/url";
import { ChangePWD } from "../../components/ChangePWD";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
import { userProfileAPI } from "../../API/userProfileAPI";
export const UserProfile = () => {
  const { user, dispatch } = useGlobalContext();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    userProfileAPI.getUserProfile(user._id, dispatch);
  }, [user._id, dispatch]);
  function changeOverlay() {
    setShowOverlay(!showOverlay);
  }
  return (
    <>
      {" "}
      <div>UserProfile</div>
      <h2>Under construction</h2>
      <div>{user.emailUsuario}</div>
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
