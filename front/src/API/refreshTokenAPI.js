import axiosPOSTLogin from "./url";

export const refreshTokenAPI = {
  refreshToken: async () => {
    try {
      const { data } = await axiosPOSTLogin.get("/refresh", {
        withCredentials: true,
      });
      /*------Actualizar headers*/
      /*-al final no actualizo los headers aca ya q estoy obligado a actualizarlos dentro del error.config del axios interceptor, el cual dsp debo devolver dentro de la axiosPOSTLogin instance*/
      /*--------Actualizar state, no es necesario localStoragear el ACCESSTOKEN ahora*/
      /*-------Podria haber puesto el saveItem del localStorage como un useEffect???*/
      return data;
    } catch (error) {
      /*---devuelvo el error al interceptor, asi dsp se llama al logErrorAPI con la original call, no la del interceptor*/
      return error;
      /*       tareasAPI.logErrorAPI(
        error,
        dispatch,
        "REFRESH TOKEN IF ACCESS TOKEN EXPIRED"
      ); */
    }
  },
};
