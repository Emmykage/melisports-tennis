import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLevels } from '../../../redux/actions/misc';
import { getGenders } from '../../../redux/actions/gender';
import { addProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';
import Categories from '../Categories';

const AddProduct = () => {
  const { product_categories, updater } = useSelector((state) => state.product_categories);
  const levels = useSelector((state) => state.level.levels);
  const genders = useSelector((state) => state.gender.genders);
  const { loading, status, report } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getLevels());
    dispatch(getGenders());
  }, [updater]);
  const [formInput, setFormInput] = useState({
    name: '',
    price: '',
    image: '',
    sku: '',
    product_category_id: 1,
    gender_id: 1,
    level_id: 1,
    grip_size: '',
    head_size: '',
    rating: '',
    weight: '',
    length: '',
    stiffness: '',
    composition: '',
    category: '',
    description: '',
    colour: '',
    size: '',
    tension: '',

  });
  const handleFormInput = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formInput));
    setFormInput({
      name: '',
      price: '',
      image: '',
      sku: '',
      product_category_id: '',
      grip_size: '',
      head_size: '',
      rating: '',
      colour: '',
      weight: '',
      length: '',
      stiffness: '',
      composition: '',
      category: '',
      description: '',
      size: '',
      tension: '',
      colour: '',

    });
  };
  return (
    <div className="product-form admin">

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-half">
            <label>
              <span>Product Name</span>
              {' '}
              <span>*</span>
              {' '}
            </label>
            <input
              value={formInput.name}
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
              value={formInput.price}
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
              value={formInput.level_id}
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
              value={formInput.gender_id}
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
            <label htmlFor=""> Head size / Shoe size  </label>
            <input
              name="head_size"
              value={formInput.head_size}
              onChange={handleFormInput}
              type="number"
              placeholder="headsize"
            />

          </div>
          <div className="input-half">
            <label htmlFor=""> Grip size   </label>
            <input
              name="grip_size"
              value={formInput.grip_size}
              onChange={handleFormInput}
              type="text"
              placeholder="grip size"
            />

          </div>

        </div>

        <div className="form-row">
          <div className="input-half">
            <label htmlFor="" className="rating">
              Colour
            </label>
            <input
              name="color"
              value={formInput.colour}
                            // max="5"
              onChange={handleFormInput}
              type="text"
            />

          </div>
          <div className="input-half">
            <label htmlFor=""> Length            </label>
            <input
              name="length"
              value={formInput.length}
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
              value={formInput.weight}
              onChange={handleFormInput}
              type="text"
              placeholder="weight"
            />

          </div>

          <div className="input-half">
            <label htmlFor="">tension  </label>
            <input
              name="stiffness"
              value={formInput.tension}
              onChange={handleFormInput}
              type="text"
              placeholder="tension"
            />

          </div>
          <div>
            <label htmlFor="">
              Composition
            </label>

            <input
              name="composition"

              value={formInput.composition}
              onChange={handleFormInput}
              type="text"
              placeholder="composition"
            />

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
            value={formInput.product_category_id}
            onChange={handleFormInput}
            required
          >
            {product_categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>

        </div>

        <div>
          <label htmlFor="">
            strung/unstrung
          </label>

          <input type="text" placeholder="strung" />

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
            value={formInput.image}
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
            value={formInput.description}
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
      <Categories />

    </div>
  );
};

export default AddProduct;
