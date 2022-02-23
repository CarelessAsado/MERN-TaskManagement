import { actions } from "../Context/reducer";
import axios, { axiosPRELogin } from "./url";

const url = "users/auth";
export const registerPost = async (usuario) => {
  try {
    return await axiosPRELogin.post(url + "/register", usuario);
  } catch (error) {
    console.log(error);
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
    console.log(error.message);
  }
};
