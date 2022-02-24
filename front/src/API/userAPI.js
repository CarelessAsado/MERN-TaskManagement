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

/*---------------------FORGOT PASSWORD-----------------------*/
export const forgotPasswordSendMeAnEmail = async (
  e,
  emailUsuario,
  dispatch,
  setSuccess
) => {
  e.preventDefault();
  if (!emailUsuario) {
    return dispatch({
      type: actions.VALIDATION_ERROR,
      payload: "Completar email.",
    });
  }
  try {
    await axiosPRELogin.post(url + "/forgot-password/sendEmail", {
      emailUsuario,
    });
    setSuccess(
      "Email enviado. Revisá tu casilla de mail para continuar con el proceso."
    );
    return;
  } catch (error) {
    tareasAPI.logErrorAPI(
      error,
      dispatch,
      "FORGOT PASSWORD SEND ME AN EMAIL PROCESS"
    );
  }
};
export const forgotPasswordCHANGEPWD = async (
  e,
  contraseña,
  contraseña2,
  dispatch,
  setSuccess,
  secretLinkId
) => {
  /*-----------chequear q los names de las pwd coincidan en el back*/
  e.preventDefault();
  /*-----------VER SI VALIDO EN LA OTRA CARPETA*/
  /*   if (!emailUsuario) {
    return dispatch({
      type: actions.VALIDATION_ERROR,
      payload: "Completar email.",
    });
  } */
  /*---------------*/
  try {
    await axiosPRELogin.put(
      url + "/forgot-password/" + secretLinkId + "/changePassword",
      {
        contraseña,
        contraseña2,
      }
    );
    setSuccess("Operación exitosa. Ya podés iniciar sesión.");
    return;
  } catch (error) {
    tareasAPI.logErrorAPI(
      error,
      dispatch,
      "FORGOT PASSWORD CHANGE PWD FINISHING PROCEDURE"
    );
  }
};
