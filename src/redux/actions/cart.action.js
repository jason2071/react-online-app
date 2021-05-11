import { CART_DATA } from "./type";

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
