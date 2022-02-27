import { useEffect } from "react";
import { refreshTokenAPI } from "../API/refreshTokenAPI";
import axiosPOSTLogin, { headersAccessTokenString } from "../API/url";
import { useGlobalContext } from "./useGlobalContext";
export const useInterceptorRefreskTkn = () => {
  const { dispatch } = useGlobalContext();
  useEffect(() => {
    const responseInterceptor = axiosPOSTLogin.interceptors.response.use(
      (response) => response,
      /*---le agrego async ya q voy a potencialmente llamar al refresh api*/
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          /*agrego una property nueva p/evitar un infinite loop*/
          previousRequest.sent = true;

          const data = await refreshTokenAPI.refreshToken(dispatch);
          /*----no sirve usar la funcion de setHeaders aca, hay q devolver si o si la instance con los headers modificados en el config*/
          previousRequest.headers[headersAccessTokenString] = data.accessToken;
          return axiosPOSTLogin(previousRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPOSTLogin.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return undefined;
};
