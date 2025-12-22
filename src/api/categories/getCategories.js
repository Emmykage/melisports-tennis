import { useQuery } from '@tanstack/react-query';
import baseURL from '../../redux/baseURL';

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${baseURL}product_categories`);

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error ?? 'Something went wrong');
    }
    return result?.data ?? result;
  } catch (error) {
    console.log('first', error);
    throw error ?? 'Something went wrong';
  }
};

export const fetchCategoryByName = async (filterParams) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(filterParams).filter(([_, value]) => value !== null),
  );

  const params = new URLSearchParams(cleanedParams).toString();

  try {
    const response = await fetch(`${baseURL}product_categories/category_by_name?${params}`);

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.error ?? 'Something went wrong');
    }
    return result?.data ?? result;
  } catch (error) {
    console.log('first', error);
    throw error ?? 'Something went wrong';
  }
};
