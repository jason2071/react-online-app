import { PROFILE_DATA, TOKEN_DATA } from "../actions/type";

const initialState = {
  profile: null,
  token: null,
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_DATA:
      return { ...state, profile: payload };
    case TOKEN_DATA:
      return { ...state, token: payload };
    default:
      return state;
  }
}
