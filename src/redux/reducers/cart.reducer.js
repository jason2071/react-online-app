import { CART_DATA, CLEAR_CART } from "../actions/type";

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
    case CLEAR_CART:
      return {
        ...state,
        cart: payload.cart,
        total: payload.total,
      };
    default:
      return state;
  }
}
