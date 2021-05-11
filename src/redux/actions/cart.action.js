import { CART_DATA, CLEAR_CART } from "./type";

export const updateCart = ({ product = {}, cart = [] }) => {
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

  return { type: CART_DATA, payload: { cart, total } };
};

export const clearCart = () => {
  const cart = [];
  const total = 0;
  return { type: CLEAR_CART, payload: { cart, total } };
};
