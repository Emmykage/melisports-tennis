export const setToken = (token) => {
  localStorage.setItem('meli_auth', JSON.stringify(token));
};
export const fetchToken = (refresh) => {
  const token = JSON.parse(localStorage.getItem('meli_auth'));
  if (refresh) {
    return token ? token?.refresh_token : token;
  }

  return token ? token?.access_token : token;
};

export const setCart = (cartItems) => {
  localStorage.setItem('cartitem', JSON.stringify(cartItems));
};

export const removeToken = () => {
  localStorage.removeItem('meli_auth');
};

export const getCart = () => {
  const carts = JSON.parse(localStorage.getItem('cartitem'));

  if (carts == null) {
    return [];
  }

  return carts;
};
