import { addProduct } from '../../../redux/actions/product';

import 'trix/dist/trix.css';
import ProductForm from '../../../components/formProduct/formProduct';

const AddProduct = () => {
  const handleSubmit = (formData) => {
    dispatch(addProduct(formData));
  };

  return (
    <ProductForm onSubmit={handleSubmit} />
  );
};

export default AddProduct;
