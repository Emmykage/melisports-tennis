import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products/getProducts';

const useProducts = (params) => useQuery({
  queryKey: ['products', params],
  queryFn: ({ queryKey }) => {
    const [, filterParams] = queryKey;
    console.log('first', filterParams);
    const data = fetchProducts(filterParams);
    console.log('[Gotten data]', data);
    return data;
  },

  keepPreviousData: true,
});

export default useProducts;
