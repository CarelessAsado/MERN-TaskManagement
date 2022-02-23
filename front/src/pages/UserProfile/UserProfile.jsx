import { useEffect, useState } from "react";
import "./UserProfile.css";
import axios from "../../API/url";
import { ChangePWD } from "../../components/ChangePWD";
import { actions } from "../../Context/reducer";
import { useGlobalContext } from "../../Hooks/useGlobalContext";
export const UserProfile = () => {
  const { user, dispatch } = useGlobalContext();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        const { data } = await axios.get("/user/profile/" + user._id);
        dispatch({ type: actions.LOGIN, payload: data });
      } catch (error) {
        console.log(error.response.data);
      }
    }
    getUser();
  }, [user._id]);
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
