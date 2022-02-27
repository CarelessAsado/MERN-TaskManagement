import axios from "axios";

const url =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://react-task-management.herokuapp.com/api/";
/*------------------PRELOGIN AND POST LOGIN INSTANCE-----*/
export const axiosPRELogin = axios.create({
  baseURL: url,
});
const axiosPOSTLogin = axios.create({
  baseURL: url,
  withCredentials: true,
});
export default axiosPOSTLogin;
/*-------------------PATH MODEL------------*/
export const urlPathModel = { AUTH: "users/auth" };
/*----------------ver si esto lo meto en hook------------------------------------------*/
export const headersAccessTokenString = "auth";
export function setHeadersPostLogin(accessToken) {
  axiosPOSTLogin.defaults.headers[headersAccessTokenString] = accessToken; //en caso de Logout paso empty string
}
/* axiosPOSTLogin.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
); */
