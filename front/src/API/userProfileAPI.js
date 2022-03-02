import axios from "./url";
import { actions } from "../Context/reducer";
export const userProfileAPI = {
  getUserProfile: async (userId, dispatch, errorHandler) => {
    try {
      const { data } = await axios.get("/user/profile/" + userId);
      /*----------DESPACHEO LOGIN, ver dsp de hacer algo especifico---------*/
      dispatch({ type: actions.LOGIN, payload: data });
    } catch (error) {
      errorHandler(error, "GET USER PROFILE with Id");
    }
  },
};
