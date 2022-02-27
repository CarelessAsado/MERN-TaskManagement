import axiosPOSTLogin from "./url";
import { tareasAPI } from "./tareasAPI";

export const refreshTokenAPI = {
  refreshToken: async (dispatch) => {
    try {
      const { data } = await axiosPOSTLogin.get("/refresh", {
        withCredentials: true,
      });
      /*-----------VER SI LLEGAN LAS COOKIES, sino poner with credentials true*/
      /*------Actualizar headers*/
      /*-al final no actualizo los headers aca ya q estoy obligado a actualizarlos dentro del error.config del axios interceptor, el cual dsp debo devolver dentro de la axiosPOSTLogin instance*/
      /*--------Actualizar state, no es necesario localStoragear el ACCESSTOKEN ahora*/
      /*-------Podria haber puesto el saveItem del localStorage como un useEffect???*/

      return data;
    } catch (error) {
      tareasAPI.logErrorAPI(
        error,
        dispatch,
        "REFRESH TOKEN IF ACCESS TOKEN EXPIRED"
      );
    }
  },
};
