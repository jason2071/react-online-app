import { CART_DATA, CLEAR_CART } from "./type";

export const updateCart = ({ product = {}, cart = [] }) => (dispatch) => {
  let exists = false;

  for (const c of cart) {
    if (c.id === product.id) {
      c.qty++;
      exists = true;
    }
  }

  if (!exists) {
    cart.push(product);
  }

  const total = cart.reduce((totalQty, product) => totalQty + product.qty, 0);

  dispatch({ type: CART_DATA, payload: { cart, total } });
};

export const clearCart = () => (dispatch) => {
  const cart = [];
  const total = 0;
  dispatch({ type: CLEAR_CART, payload: { cart, total } });
};
