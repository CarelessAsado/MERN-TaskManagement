import { actions } from "../Context/reducer";
import axios, { axiosPRELogin } from "./url";
import { tareasAPI } from "./tareasAPI";
const url = "users/auth";
export const registerPost = async (usuario, dispatch, navigate, setSuccess) => {
  try {
    await axiosPRELogin.post(url + "/register", usuario);
    setSuccess("Te registraste exitosamente. Podés iniciar sesión.");
    navigate("/login");
    return;
  } catch (error) {
    tareasAPI.logErrorAPI(error, dispatch, "REGISTER");
  }
};

export const loginPost = async (usuario, dispatch, navigate) => {
  dispatch({ type: actions.START_ACTION });
  try {
    const { data } = await axiosPRELogin.post(url + "/login", usuario);
    /*-------------PONER TOKEN DINAMICAMENTE--------------*/
    dispatch({ type: actions.LOGIN, payload: data });
    localStorage.setItem("user", JSON.stringify(data));
    axios.defaults.headers["auth"] = data.accessToken;
    navigate("/");
  } catch (error) {
    tareasAPI.logErrorAPI(error, dispatch, "LOGIN");
  }
};
export const logout = async (dispatch, navigate) => {
  dispatch({ type: actions.LOGOUT });
  localStorage.removeItem("user");
  axios.defaults.headers["auth"] = "";
  console.log("Navegando hacia el espacio");
  navigate("login");
};
