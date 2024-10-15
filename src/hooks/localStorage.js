export const setToken = (token) => {
  localStorage.setItem('meli_auth', JSON.stringify(token));
};
export const fetchToken = () => JSON.parse(localStorage.getItem('meli_auth'));

export const setCart = (cartItems) => {
  localStorage.setItem('cartitem', JSON.stringify(cartItems));
};


export const getCart = () => {
  const carts = JSON.parse(localStorage.getItem('cartitem'));

  if (carts == null) {
    return [];
  }

  return carts;
};