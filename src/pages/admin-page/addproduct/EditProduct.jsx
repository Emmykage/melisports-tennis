import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import getGenders from '../../../redux/actions/gender';
import getLevels from '../../../redux/actions/misc';
import { getProduct, updateProduct } from '../../../redux/actions/product';
import { getProductCategories, getSportCategories } from '../../../redux/actions/product_category';

import ProductForm from '../../../components/formProduct/formProduct';

const EditProduct = () => {
  const { editId } = useParams();
  const dispatch = useDispatch();
  const [productInventories, setProductInventories] = useState([{
    size: '', quantity: '', sku: '', location: [],
  }]);

  const {
    product, status,
  } = useSelector((state) => state.product);

  const addToProductInventory = ({ key, value }, index) => {
    const updateProductInventories = productInventories.map((item, i) => (i === index ? {
      ...item,
      [key]: value,

    }
      : item));

    setProductInventories(updateProductInventories);
  };

  useEffect(() => {
    setProductInventories(product?.product_inventories ?? productInventories);
  }, [product?.product_inventories]);

  useEffect(() => {
    dispatch(getProduct(editId));
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const res = await dispatch(updateProduct({ editId, formData })).unwrap();
      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (

    <ProductForm onSubmit={handleSubmit} product={product} />

  );
};

export default EditProduct;
