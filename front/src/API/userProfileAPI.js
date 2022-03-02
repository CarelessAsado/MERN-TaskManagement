import axiosPOSTLogin from "./url";
import { actions } from "../Context/reducer";
import { errorHandler } from "./errorHandler";

export const userProfileAPI = {
  getUserProfile: async (userId, dispatch) => {
    dispatch({ type: actions.START_ACTION });
    try {
      const { data } = await axiosPOSTLogin.get("/user/profile/" + userId);
      /*----------DESPACHEO LOGIN, ver dsp de hacer algo especifico---------*/
      dispatch({ type: actions.LOGIN, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, "GET USER PROFILE with Id");
    }
  },
};
