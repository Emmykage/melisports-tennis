import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getGenders } from '../../../redux/actions/gender';
import { getLevels } from '../../../redux/actions/misc';
import { updateProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';
import baseURL from '../../../redux/baseURL';
import shoeSizes from '../../mock/ShoeSizess';
import clothSizes from '../../mock/ClothSizes';

const EditProduct = () => {
  const { editId } = useParams();

  const product_categories = useSelector((state) => state.product_categories);

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
    // setFormInput(product)

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
      product_category_id: "",
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
      strung: "",
      size: ""

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
            <label htmlFor=""> Head size   </label>
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
  required
  >
    {clothSizes.map(item => (

    <option value={item.abbrv}>{item.abbrv}</option>

    ))}

  </select>

</div>
<div className="input-half">
  <label htmlFor=""> Shoe size  </label>
  <select name="shoe_sizes_attributes" id="shoe_size"
  //  value={formInput.cloth_size_attributes}
 
  multiple
   onChange={handleFormInput}
   size={1}
   required
  >
    {shoeSizes.map(item => (

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
placeholder='colour'              onChange={handleFormInput}
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
          <label htmlFor="strung">
            strung/unstrung
          </label>
          <select name="strung" id="strung"
          value={formInput.strung}
          >
            {strung.map((item)=>(
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


    </div>
  );
};

export default EditProduct;
