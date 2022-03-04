import { useEffect } from "react";
import axiosPOSTLogin, {
  headersAccessTokenString,
  urlPathModel,
} from "../API/url";
import { refreshTokenAPI } from "../API/refreshTokenAPI";
export const useInterceptorRefreskTkn = () => {
  useEffect(
    () => {
      const responseInterceptor = axiosPOSTLogin.interceptors.response.use(
        (response) => {
          return response;
        },
        /*---le agrego async ya q voy a potencialmente llamar al refresh api*/
        async (error) => {
          const previousRequest = error?.config;
          /*-------OJO Q EL INTERCEPTOR TMB TE INTERCEPTA LAS API/REFRESH RESPONSEs, asi q si devolves un cod 403 de esa call en particular, esa response va a pasar x el conditional de abajo (tiene cod 403, y el .sent todavia no lo pasamos a la response config ya q hay q esperar a q termine la async call para q recien surta efecto) y va a haber un endless loop. Yo cambié el code a 402 en el backend, pero tratar de agregar otro condicional, x ej url, o algo*/
          if (
            error?.response?.status === 403 &&
            !previousRequest?.sent &&
            error.config.url !== urlPathModel.REFRESH
          ) {
            /*agrego una property nueva p/evitar un infinite loop*/
            previousRequest.sent = true;

            const data = await refreshTokenAPI.refreshToken();
            /*----no sirve usar la funcion de setHeaders aca, hay q devolver si o si la instance con los headers modificados en el config*/
            /*--chequea q refresh devuelva headers y no un error, xq si es error no seteo headers nuevamente. Originalmente pensaba directamente llamar a Promise.reject, pero dsp me di cuenta q no seteaba .sent en la axios instance, y eso lo uso dsp de condicional para redirigr en el logerror API*/
            if (data?.accessToken) {
              previousRequest.headers[headersAccessTokenString] =
                data.accessToken;
            }
            return axiosPOSTLogin(previousRequest);
          }
          /*----ESTO ERA PARA LOGUEAR EN CASO DE REFRESH TOKEN VENCIDO, al final preferí devolver el error al errorHandler y redirigir ahi*/
          /*         if (
          previousRequest?.sent &&
          error.config.url !== urlPathModel.REFRESH
        ) {
          return logout(dispatch);
        } */
          /*---este error dsp termina dentro del errorHandler*/
          return Promise.reject(error);
        }
      );
      return () => {
        axiosPOSTLogin.interceptors.response.eject(responseInterceptor);
      };
    },
    [
      /* refresh */
    ]
  );

  return undefined;
};
