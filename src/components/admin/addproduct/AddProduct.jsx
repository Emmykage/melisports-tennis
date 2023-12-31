import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getLevels from '../../../redux/actions/misc';
import getGenders from '../../../redux/actions/gender';
import { addProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';
import Categories from '../Categories';
import strung from '../../mock/Strung';
import clothSizes from '../../mock/ClothSizes';
import shoeSizes from '../../mock/ShoeSizess';

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
    product_category_id: '',
    gender_id: 1,
    level_id: '',
    grip_size: '',
    head_size: '',
    rating: '',
    weight: '',
    length: '',
    stiffness: '',
    composition: '',
    description: '',
    colour: '',
    size: '',
    tension: '',
    strung: '',
    cloth_sizes_attributes: [],
    shoe_sizes_attributes: [],

  });

  const handleFormInput = (e) => {
    if (e.target.name == 'cloth_sizes_attributes' || e.target.name == 'shoe_sizes_attributes') {
      const { options } = e.target;
      const value = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push({ abbrv: options[i].value });
        }
      }

      setFormInput({
        ...formInput,
        [e.target.name]: value,
      });
    } else {
      setFormInput({
        ...formInput,
        [e.target.name]: e.target.value,

      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formInput));
  };
  const reset = () => {
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
      description: '',
      size: '',
      tension: '',
      colour: '',
      strung: '',
      cloth_size_attributes: '',

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
              <span>Price: NGN</span>
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
              onChange={handleFormInput}
            >
              <option value="" selected>--Select---</option>
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
            <label htmlFor="">
              {' '}
              <span>
                Head size: cm
                <sup>2</sup>
              </span>
              {' '}
            </label>
            <input
              name="head_size"
              value={formInput.head_size}
              onChange={handleFormInput}
              type="text"
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
              value={formInput.sku}
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
              value={formInput.colour}
              placeholder="colour"
              onChange={handleFormInput}
              type="text"
            />

          </div>
          <div className="input-half">
            <label htmlFor=""> Length (mm)          </label>
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
            <label htmlFor="">Weight (g)    </label>
            <input
              name="weight"
              value={formInput.weight}
              onChange={handleFormInput}
              type="text"
              placeholder="weight"
            />

          </div>

          <div className="input-half">
            <label htmlFor="">tension (kg) </label>
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
              Composition
            </label>
            <select
              name="composition"
              id="composition"
              onChange={handleFormInput}

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
            onChange={handleFormInput}
            required
          >
            <option value="" selected>--Select--</option>
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
            value={formInput.strung}
            onChange={handleFormInput}
          >
            <option value="" selected>--Selected----</option>
            {strung.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
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
