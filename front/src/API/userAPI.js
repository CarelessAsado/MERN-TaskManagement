import { actions } from "../Context/reducer";
import axios from "./url";
const url = "users/auth";
export const registerPost = async (usuario) => {
  try {
    return await axios.post(url + "/register", usuario);
  } catch (error) {
    console.log(error);
  }
};

export const loginPost = async (usuario, dispatch) => {
  dispatch({ type: actions.START_ACTION });
  try {
    const { data } = await axios.post(url + "/login", usuario);
    /*-------------PONER TOKEN DINAMICAMENTE--------------*/
    dispatch({ type: actions.LOGIN, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
