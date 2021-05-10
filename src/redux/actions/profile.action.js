import { PROFILE_DATA, TOKEN_DATA } from "./type";

export const saveToken = (payload) => async (dispatch) => {
  dispatch({ type: TOKEN_DATA, payload: payload });
};

export const saveProfile = (payload) => async (dispatch) => {
  dispatch({ type: PROFILE_DATA, payload: payload });
};
