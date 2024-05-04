import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import getGenders from '../../../redux/actions/gender';
import getLevels from '../../../redux/actions/misc';
import { getProduct, updateProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';
import {clothSizes, shoeSizes, strung} from '../../mock/variance';
import { writeProduct } from '../../../redux/product/product';

const EditProduct = () => {
  const { editId } = useParams();
  const dispatch = useDispatch();

  const { product_categories } = useSelector((state) => state.product_categories);

  const {product, loading, report, status } = useSelector((state) => state.product);

  const levels = useSelector((state) => state.level.levels);

  const genders = useSelector((state) => state.gender.genders);


  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getProduct(editId))
    dispatch(getLevels());
    dispatch(getGenders());
  }, []);
  const handleFormInput = (e) => {
    dispatch(writeProduct(e.target))

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product));
  };

  return (
    <div className="product-form admin">
      <form onSubmit={handleSubmit}>
        <div className='quantity'>
          <label htmlFor="quantity">Quantity</label>
          <input onChange={handleFormInput} type="number" value={product.quantity} name="quantity" id="quantity"/>
        </div>
        <div className="form-row">
          <div className="input-half">
            <label>
              <span>Product Name</span>
              {' '}
              <span>*</span>
              {' '}
            </label>
            <input
              value={product.name}
              name="name"
              onChange={handleFormInput}
              type="text"
              placeholder="product name"
              required
            />

          </div>
          <div className="input-half">
            <label>
              <span>Price</span>
              {' '}
              <span>*</span>
            </label>
            <input
              value={product.price}
              name="price"
              onChange={handleFormInput}
              type="number"
              placeholder="price"
              required
            />

          </div>
        </div>
        <div className="form-row">
          <div className="input-half">
            <label htmlFor="">Professionalism  </label>
            <select
              placeholder="professionalism"
              name="level_id"
              value={product.level_id ? product.level_id : (product.level && product.level.id)}
              onChange={handleFormInput}
            >
              {levels.map((level) => (
                <option value={level.id}>{level.stage}</option>
              ))}
            </select>

          </div>

          <div className="input-half">
            <label htmlFor="">Gender </label>
            <select
              placeholder="gender"
              name="gender_id"
              value={product.gender_id}
              onChange={handleFormInput}
              
            >
              {genders.map((gender) => (
                <option value={gender.id}>{gender.name}</option>
              ))}
            </select>

          </div>

        </div>
        <div className="form-row">

          <div className="input-half">
            <label htmlFor=""> Head size   </label>
            <input
              name="head_size"
              value={product.head_size}
              onChange={handleFormInput}
              type="text"
              placeholder="headsize"
            />

          </div>
          <div className="input-half">
            <label htmlFor=""> Grip size </label>
            <input
              name="grip_size"
              value={product.grip_size}
              onChange={handleFormInput}
              type="text"
              placeholder="grip size"
            />

          </div>

        </div>
        <div className="form-row">

          <div className="input-half">
            <label htmlFor=""> Cloth size  </label>
            <select
              name="cloth_sizes_attributes"
              id="cloth_size"
              multiple
              onChange={handleFormInput}
              size={1}
            >
              {clothSizes.map((item) => (

                <option value={item.abbrv}>{item.abbrv}</option>

              ))}

            </select>

          </div>
          <div className="input-half">
            <label htmlFor=""> Shoe size  </label>
            <select
              name="shoe_sizes_attributes"
              id="shoe_size"
              value={product?.cloth_size_attributes}

              multiple
              onChange={handleFormInput}
              size={1}
            >
              {shoeSizes.map((item) => (

                <option value={item.abbrv}>{item.abbrv}</option>

              ))}

            </select>

          </div>
          <div className="input-half">
            <label htmlFor=""> SKU   </label>
            <input
              name="sku"
              value={product.sku}
              onChange={handleFormInput}
              type="text"
              placeholder="sku"
            />

          </div>

        </div>
        <div className="form-row">
          <div className="input-half">
            <label htmlFor="" className="color">
              Colour
            </label>
            <input
              name="colour"
              value={product.colour}
              placeholder="colour"
              onChange={handleFormInput}
              type="text"
            />

          </div>
          <div className="input-half">
            <label htmlFor=""> Length            </label>
            <input
              name="length"
              value={product.length}
              onChange={handleFormInput}
              type="text"
              placeholder="lenght"
            />

          </div>

        </div>

        <div className="form-row">
          <div className="input-half">
            <label htmlFor="">Weight     </label>
            <input
              name="weight"
              value={product.weight}
              onChange={handleFormInput}
              type="text"
              placeholder="weight"
            />

          </div>

          <div className="input-half">
            <label htmlFor="">tension  </label>
            <input
              name="tension"
              value={product.tension}
              onChange={handleFormInput}
              type="text"
              placeholder="tension"
            />

          </div>
          <div>
            <label htmlFor="">
              Composition
            </label>

            <select
              name="composition"
              id="composition"
              onChange={handleFormInput}
              value={product?.composition}

            >
              <option value={null} selected>--Selected----</option>
              <option value="graphite">Graphite </option>
              <option value="aluminium">Aluminium </option>
              <option value="carbon">Carbon </option>

            </select>

          </div>

        </div>
        <div className="text-form-container">
          <label htmlFor="">
            <span> Select product category</span>
            {' '}
            <span>*</span>
            {' '}
          </label>

          <select
            placeholder="product category"
            name="product_category_id"
            value={product?.product_category }
            onChange={handleFormInput}
            disabled
          >
            {product_categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>

        </div>

        <div>
          <label htmlFor="strung">
            strung/unstrung
          </label>
          <select
            name="strung"
            id="strung"
            value={product.strung}
            onChange={handleFormInput}
          >
            {strung.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>

          {/* <input type="text" placeholder="strung" /> */}

        </div>
        <div>
          <label htmlFor="">
            {' '}
            <span>image</span>

            <span>*</span>
          </label>
          <input
            type="url"
            name="image"
            onChange={handleFormInput}
            value={product.image}
            placeholder="image url"
            required
          />

        </div>

        <div>
          <label htmlFor="">
            {' '}
            <span>Description</span>
            {' '}
            <span>*</span>
            {' '}
          </label>
          <textarea
            name="description"
            onChange={handleFormInput}
            value={product.description}
            placeholder="Enter description"
            required
          />

        </div>

        <button className="btn">
          add product
        </button>
        {loading ? (
          <p className="normal">
            {' '}
            {report}
          </p>
        ) : (status == 'success' ? (
          <p className="green">
            {' '}
            {report}
          </p>
        ) : (
          <p className="red">
            {' '}
            {report}
          </p>
        )) }

      </form>

    </div>
  );
};

export default EditProduct;
