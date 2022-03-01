import { refreshTokenAPI } from "../API/refreshTokenAPI";
import { useGlobalContext } from "./useGlobalContext";

export const useRefreshAPI = () => {
  const { dispatch } = useGlobalContext();
  const refresh = async () => {
    const data = await refreshTokenAPI.refreshToken(dispatch);
    return data;
  };
  return refresh;
};