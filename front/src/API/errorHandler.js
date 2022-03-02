import { actions } from "../Context/reducer";
import { logout } from "./userAPI";

export const errorHandler = async (error, dispatch, etapa) => {
  //logout:DELETEUSESTORAGE,navigate,
  console.log(
    error?.response?.data,
    JSON.stringify(error),
    "hubo un error estamos el logERROR API. Sector: " + etapa
  );
  if (error?.config?.sent) {
    console.log(
      "aca es un error de refresh token AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      error.config
    );
    return await logout(dispatch);
  }
  //agregar 401 UNAUTHORIZED
  if (
    error.message === "Network Error" ||
    error.message === "Failed to fetch"
  ) {
    return dispatch({
      type: actions.FAILURE_ACTION,
      payload: "Hubo un problema en la conexión.",
    });
  }
  dispatch({
    type: actions.FAILURE_ACTION,
    payload: error?.response?.data,
  });
};
