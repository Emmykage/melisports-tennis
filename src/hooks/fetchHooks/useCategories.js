import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchCategoryByName } from '../../api/categories/getCategories';

export const useCategories = (params) => useQuery({
  queryKey: ['category', params],
  queryFn: ({ queryKey }) => {
    const [, filterParams] = queryKey;
    console.log('first', filterParams);
    const data = fetchCategories(filterParams);
    console.log('[Gotten data]', data);
    return data;
  },

  keepPreviousData: true,
});

export const useCategoryName = (params) => useQuery({
  queryKey: ['category', params],
  queryFn: ({ queryKey }) => {
    const [, filterParams] = queryKey;
    const data = fetchCategoryByName(filterParams);
    return data;
  },

  keepPreviousData: true,
});
