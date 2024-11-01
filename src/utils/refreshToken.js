import { fetchToken, removeToken, setToken } from '../hooks/localStorage';
import baseURL from '../redux/baseURL';

const refreshToken = async (onSuccess, onError) => {
  try {
    const res = await fetch(`${baseURL}/refresh_token/${fetchToken('refresh')}`);

    const result = await res.json();

    if (!res.ok) {
      removeToken();
      onError();
    //   return
    } else {
      setToken(result);
      onSuccess();
    }
  } catch (error) {
    removeToken();
    onError();
  }
};

export { refreshToken };
