import { actions } from "../Context/reducer";
import axios from "./url";
const url = "users/auth";
export const registerPost = async (usuario) => {
  try {
    return axios.post(url + "/register", usuario);
  } catch (error) {
    console.log(error);
  }
};

export const loginPost = async (usuario, dispatch) => {
  dispatch({ type: actions.START_ACTION });
  try {
    const { data } = axios.post(url + "/login", usuario);
    console.log(data, "ver user");
    /*  dispatch({ type: actions.LOGIN }); */
  } catch (error) {
    console.log(error.message);
  }
};
