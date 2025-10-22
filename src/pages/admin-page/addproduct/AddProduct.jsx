import { addProduct } from '../../../redux/actions/product';

import 'trix/dist/trix.css';
import ProductForm from '../../../components/formProduct/formProduct';
import { useDispatch } from 'react-redux';

const AddProduct = () => {
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    dispatch(addProduct(formData));
  };

  return (
    <ProductForm onSubmit={handleSubmit} />
  );
};

export default AddProduct;
