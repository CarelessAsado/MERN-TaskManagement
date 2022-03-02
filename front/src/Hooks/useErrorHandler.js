import { logout } from "../API/userAPI";
import { actions } from "../Context/reducer";
import { useNavigate } from "react-router-dom";

export const useErrorHandler = (dispatch, deleteUserStorage) => {
  const navigate = useNavigate();
  const handleMyError = (error, etapa) => {
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
      return logout(dispatch, deleteUserStorage, navigate);
    }
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

  return handleMyError;
};
