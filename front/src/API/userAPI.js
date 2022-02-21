import axios from "./url";
const url = "users/auth";
export const registerPost = (usuario) => {
  return axios.post(url + "/register", usuario);
};

export const loginPost = (usuario) => {
  return axios.post(url + "/login", usuario);
};
