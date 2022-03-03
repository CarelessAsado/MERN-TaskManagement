import { actions } from "../Context/reducer";
import { errorHandler } from "./errorHandler";
import axiosPOSTLogin, {
  axiosPRELogin,
  keyStorage,
  setHeadersPostLogin,
  urlPathModel,
} from "./url";

const url = urlPathModel.AUTH;
export const registerPost = async (usuario, navigate, setSuccess, dispatch) => {
  try {
    await axiosPRELogin.post(url + "/register", usuario);
    setSuccess("Te registraste exitosamente. Podés iniciar sesión.");
    navigate("/login");
    return;
  } catch (error) {
    await errorHandler(error, dispatch, "REGISTER");
  }
};

export const loginPost = async (
  { email, pwd },
  dispatch,
  navigate,
  setUserLocalStorage
) => {
  dispatch({ type: actions.START_ACTION });
  try {
    const emailUsuario = email.current.value;
    const contraseña = pwd.current.value;
    const { data } = await axiosPRELogin.post(
      url + "/login",
      { emailUsuario, contraseña },
      {
        withCredentials: true,
      }
    );
    dispatch({ type: actions.LOGIN, payload: data });
    /*-------------PONER TOKEN DINAMICAMENTE--------------*/
    const { accessToken } = data;
    setHeadersPostLogin(accessToken);
    /*-------------custom hook pal local storage*/
    setUserLocalStorage(data);
    /*---Vaciar inputs del submit*/
    pwd.current.value = "";
    email.current.value = "";
    navigate("/");
  } catch (error) {
    errorHandler(error, dispatch, "LOGIN");
  }
};
/*-------------------ACA YA USO AXIOS INSTANCE POSTLOGIN--------*/
export const logout = async (dispatch) => {
  try {
    dispatch({ type: actions.START_ACTION });
    /*---borrar el local storage y headers*/
    localStorage.removeItem(keyStorage);
    setHeadersPostLogin("");
    await axiosPOSTLogin.get(url + "/logout");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch({ type: actions.LOGOUT });
    window.location.replace("/login");
  }
};

/*---------------------FORGOT PASSWORD-----------------------*/
export const forgotPasswordSendMeAnEmail = async (
  e,
  emailUsuario,
  dispatch,
  setSuccess
) => {
  setSuccess("");
  e.preventDefault();
  if (!emailUsuario) {
    return dispatch({
      type: actions.VALIDATION_ERROR,
      payload: "Completar email.",
    });
  }
  dispatch({ type: actions.START_ACTION });
  try {
    await axiosPRELogin.post(url + "/forgot-password/sendEmail", {
      emailUsuario,
    });
    setSuccess(
      "Email enviado. Revisá tu casilla de mail para continuar con el proceso."
    );
    return;
  } catch (error) {
    errorHandler(error, dispatch, "FORGOT PASSWORD SEND ME AN EMAIL PROCESS");
  }
};
export const forgotPasswordCHANGEPWD = async (
  contraseñas,
  dispatch,
  secretLinkId,
  setSuccess
) => {
  setSuccess("");
  dispatch({ type: actions.START_ACTION });
  try {
    await axiosPRELogin.put(
      url + "/forgot-password/" + secretLinkId + "/changePassword",
      contraseñas
    );
    setSuccess("Operación exitosa. Ya podés iniciar sesión.");

    return;
  } catch (error) {
    console.log(error, "holaaaaaa");
    await errorHandler(
      error,
      dispatch,
      "FORGOT PASSWORD CHANGE PWD FINISHING PROCEDURE"
    );
  }
};
