import { useEffect } from "react";
import axiosPOSTLogin, { headersAccessTokenString } from "../API/url";
import { useRefreshToken } from "./useRefreshToken";
export const useInterceptorRefreskTkn = () => {
  const refresh = useRefreshToken();
  useEffect(() => {
    const responseInterceptor = axiosPOSTLogin.interceptors.response.use(
      (response) => response,
      /*---le agrego async ya q voy a potencialmente llamar al refresh api*/
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 403 && !previousRequest?.sent) {
          /*agrego una property nueva p/evitar un infinite loop*/
          previousRequest.sent = true;

          const data = await refresh();
          /*----no sirve usar la funcion de setHeaders aca, hay q devolver si o si la instance con los headers modificados en el config*/
          previousRequest.headers[headersAccessTokenString] = data.accessToken;
          return axiosPOSTLogin(previousRequest);
        }
        /*     if (error?.response?.status === 401) {
          return navigate("/login");
        } */
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPOSTLogin.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh]);

  return undefined;
};
