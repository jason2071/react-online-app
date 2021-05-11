import { CART_DATA } from "../actions/type";

const initialState = {
  cart: [],
  total: 0,
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_DATA:
      return {
        ...state,
        cart: payload.cart,
        total: payload.total,
      };
    default:
      return state;
  }
}
