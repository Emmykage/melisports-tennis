import { useQuery } from '@tanstack/react-query';
import baseURL from '../../redux/baseURL';

export const fetchProducts = async (filterParams = {}) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(filterParams).filter(([_, value]) => value != null),
  );

  const params = new URLSearchParams(cleanedParams).toString();
  try {
    const response = await fetch(`${baseURL}products?${params}`);

    const result = await response.json();
    console.log(result, params, cleanedParams, 'data response', filterParams);
    if (!response.ok) {
      throw new Error(result?.error ?? 'Something went wrong');
    }
    return result.data;
  } catch (error) {
    console.log('first', error);
    throw error ?? 'Something went wrong';
  }
};
