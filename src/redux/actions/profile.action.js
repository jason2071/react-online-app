import { PROFILE_DATA, TOKEN_DATA } from "./type";

export const updateToken = (payload) => async (dispatch) => {
  dispatch({ type: TOKEN_DATA, payload: payload });
};

export const updateProfile = (payload) => async (dispatch) => {
  dispatch({ type: PROFILE_DATA, payload: payload });
};
