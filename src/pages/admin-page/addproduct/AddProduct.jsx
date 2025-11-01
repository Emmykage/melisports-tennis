import { addProduct } from '../../../redux/actions/product';

import 'trix/dist/trix.css';
import ProductForm from '../../../components/formProduct/formProduct';
import { useDispatch } from 'react-redux';

const AddProduct = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    try {
      const res = await dispatch(addProduct(formData)).unwrap();
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <ProductForm onSubmit={handleSubmit} />
  );
};

export default AddProduct;
