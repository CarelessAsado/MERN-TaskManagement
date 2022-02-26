import axios from "axios";

const url =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://react-task-management.herokuapp.com/api/";

export const axiosPRELogin = axios.create({
  baseURL: url,
});
const axiosPOSTLogin = axios.create({
  baseURL: url,
});
export default axiosPOSTLogin;
export function setHeadersPostLogin(accessToken) {
  axiosPOSTLogin.defaults.headers["auth"] = accessToken; //en caso de Logout paso empty string
}
/* axios.interceptors.request.use(
  () => {
    alert("hola estas en interceptors");
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
); */
