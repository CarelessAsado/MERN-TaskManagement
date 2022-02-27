import axiosPOSTLogin from "./url";
import { tareasAPI } from "./tareasAPI";

export const refreshTokenAPI = {
  refreshToken: async (dispatch) => {
    try {
      const { data } = await axiosPOSTLogin.get("/refresh", {
        withCredentials: true,
      });
      console.log(data, "ver si vuelve algo");
      /*-----------VER SI LLEGAN LAS COOKIES, sino poner with credentials true*/
      /*------Actualizar headers*/
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
