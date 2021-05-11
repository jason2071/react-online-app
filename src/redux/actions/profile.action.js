import { PROFILE_DATA, TOKEN_DATA } from "./type";

export const updateToken = (payload) => (dispatch) => {
  dispatch({ type: TOKEN_DATA, payload: payload });
};

export const updateProfile = (payload) => (dispatch) => {
  dispatch({ type: PROFILE_DATA, payload: payload });
};
