import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGenders } from '../../../redux/actions/gender';
import { getLevels } from '../../../redux/actions/misc';
import { getProduct, updateProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';
import baseURL from '../../../redux/baseURL';

const EditProduct = () => {
  const { editId } = useParams();

  const categories = useSelector((state) => state.product_categories.product_categories);

  const dispatch = useDispatch();
  const { loading, report, status } = useSelector((state) => state.product);
  const levels = useSelector((state) => state.level.levels);
  const genders = useSelector((state) => state.gender.genders);
  // const [marker, setMarker] = useState({color: ""})
  const [formInput, setFormInput] = useState({});
  useEffect(() => {
    fetch(`${baseURL}products/${editId}`)
      .then((res) => res.json()).then((json) => setFormInput(json));
    // .catch(err => )
    dispatch(getProductCategories());
    dispatch(getLevels());
    dispatch(getGenders());
  }, []);

  const handleFormInput = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(formInput));
    setFormInput({
      name: '',
      price: '',
      image: '',
      sku: '',
      product_category_id: 1,
      grip_size: '',
      head_size: '',
      rating: '',
      weight: '',
      length: '',
      stiffness: '',
      composition: '',
      category: '',
      description: '',
      tension: "",
      colour: "",
      strung: ""

    });
  };
  return (
    <div className="product-form admin">

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-half">
            <label>
              {' '}
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
            />
          </div>
          <div className="input-half">
            <label>
              {' '}
              <span>Price</span>
              {' '}
            </label>

            <input
              value={formInput.price}
              name="price"
              onChange={handleFormInput}
              type="number"
            />

          </div>
        </div>
        <div className="form-row">
          <div className="input-half">
            <label htmlFor="">
              <span>Professionalism</span>
              {' '}
            </label>
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
            <label htmlFor="">
              <span>Gender</span>
              {' '}
            </label>

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
            <label htmlFor="">
              <span>Head size </span>
              {' '}
            </label>

            <input
              name="head_size"
              value={formInput.head_size}
              onChange={handleFormInput}
              type="number"
            />

          </div>
          <div className="input-half">
            <label htmlFor="">
              {' '}
              <span>Grip size</span>
            </label>
            <input
              name="grip_size"
              value={formInput.grip_size}
              onChange={handleFormInput}
              type="text"
            />

          </div>

        </div>

        <div className="form-row">
          <div className="input-half">
            <label htmlFor="" className="colour">
              <span>Colour</span>
              {' '}

            </label>

            <input
              name="colour"
              value={formInput.colour}
              onChange={handleFormInput}
              type="text"
            />

          </div>
          <div className="input-half">
            <label htmlFor="">
              <span>Length</span>
              {' '}
            </label>

            <input
              name="length"
              value={formInput.length}
              onChange={handleFormInput}
              type="text"
            />

          </div>

        </div>

        <div className="form-row">
          <div className="input-half">
            <label htmlFor="">
              <span>Weight</span>
              </label>
              <input
                name="weight"
                value={formInput.weight}
                onChange={handleFormInput}
                type="text"
              />

          
          </div>
          
          <div className="input-half">
            <label htmlFor="">
              <span>tension</span>
              {' '}
            </label>

            <input
              name="tension"
              value={formInput.tension}
              onChange={handleFormInput}
              type="text"
              placeholder="tension"
            />

          </div>
          <div>
            <label htmlFor="">
              <span>
                {' '}
                Composition
              </span>
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
            <span>Select product category</span>
            {' '}
          </label>

          <select
            placeholder="product category"
            value={formInput.product_category_id}
            onChange={handleFormInput}
          >
            {categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}

          </select>
        </div>

        <div>
          <label htmlFor="">
            {' '}
            <span>
              {' '}
              Strung/unstrung
            </span>
            {' '}

          </label>

          <input 
          type="text" 
          placeholder="strung"
          name="strung"
          value={formInput.strung}
          onChange={handleFormInput}
          />
        </div>
        <div>
          <label htmlFor="">
            <span>
              {' '}
              Image
            </span>
            {' '}

          </label>

          <input
            type="url"
            name="image"
            onChange={handleFormInput}
            value={formInput.image}
            placeholder="image url"
          />
        </div>

        <div>
          <label htmlFor="">
            <span>Description</span>
            {' '}
          </label>

          <textarea
            name="description"
            value={formInput.description}
            onChange={handleFormInput}
          />

        </div>

        <button className="btn">
          update product
        </button>
        {loading ? (
          <p className="normal">
            {' '}
            {/* {report} */}
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
