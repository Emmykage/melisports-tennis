import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import getGenders from '../../../redux/actions/gender';
import getLevels from '../../../redux/actions/misc';
import { getProduct, updateProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';
import {clothSizes, colors, composition, shoeSizes, strung} from '../../mock/variance';
import { writeProduct } from '../../../redux/product/product';
import Select, { MultiValue } from "react-select";
import Loader from '../../../pages/Loader';

const EditProduct = () => {
  const { editId } = useParams();
  const dispatch = useDispatch();

  const { product_categories } = useSelector((state) => state.product_categories);

  const {product, loading, report, status } = useSelector((state) => state.product);

  const levels = useSelector((state) => state.level.levels);

  const genders = useSelector((state) => state.gender.genders);
  const formRef = useRef(null)

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
      const shoeValues = Array.from(e.target.shoe_sizes).map(option => option.value)
      const clothValues = Array.from(e.target.cloth_sizes).map(option => option.value)
      const colorsValues = Array.from(e.target.product_colour).map(option => { console.log(option.value); return option.value})
      console.log(colorsValues)
      const formData = new FormData()

      e.target.level_id.value && formData.append("product[level_id]", e.target.level_id.value)
      e.target.gender_id && formData.append("product[gender_id]", e.target.gender_id.value)

      formData.append("product[name]", product.name)
      formData.append("product[quantity]", product.quantity)
      formData.append("product[price]", product.price)
      formData.append("product[sku]", product.sku)
      formData.append("product[product_category_id]", e.target.product_category_id.value)
      formData.append("product[grip_size]", product.grip_size)
      formData.append("product[head_size]", product.head_size)
      formData.append("product[colours]", colorsValues)
      formData.append("product[weight]", product.weight)
      formData.append("product[length]", product.length)
      formData.append("product[stiffness]", product.stiffness)
      formData.append("product[composition]", e.target.composition.value)
      formData.append("product[description]", product.description)
      formData.append("product[tension]", product.tension)
      formData.append("product[strung]", e.target.strung.value)
      formData.append("product[image]", product.image)
      formData.append("product[cloth_sizes]", clothValues)
      formData.append("product[shoe_sizes]", shoeValues)

     
      // const data = Object.fromEntries(formData)
      // console.log(data)
      dispatch(updateProduct({editId, formData}));


  };


  return (

    <div className="product-form admin">

      {loading ? <Loader/> :

      <form onSubmit={handleSubmit} ref={formRef}>
      <div className='quantity'>
          <label htmlFor="quantity">Quantity</label>
          <input onChange={handleFormInput} value={product.quantity} type="number" name="quantity" id="quantity"/>
        </div>
        <div className="form-row text-sm my-1">
          <div className="input-half">
            <label>
              <span className='text-dark font-semibold text-sm'>Product Name</span>
              {' '}
              <span></span>
              {' '}
            </label>
            <input
              value={product.name}
              onChange={handleFormInput}
              name="name"
               type="text"
              placeholder="product name"
              required
            />

          </div>
          <div className="input-half">
            <label>
              <span className='text-dark font-semibold text-sm'>Price: NGN</span>
              {' '}
              <span></span>
            </label>
            <input
                          onChange={handleFormInput}
                          value={product.price}

              name="price"
              id='price'
              type="number"
              placeholder="price"
              required
            />

          </div>
        </div>
        <div className='form-row my-1'>

          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'> SKU   </label>
            <input
              name="sku"
              onChange={handleFormInput}
              value={product.sku}
              id='sku'
              type="text"
              placeholder="sku"
            />

          </div>
          <div className="input-half">
            <label htmlFor="colour"  className='text-dark font-semibold text-sm'>
              Colour
            </label>
            <Select
              defaultValue={product.colours?.map(color => ({value: color, label: color}))}
              name="product_colour"              
              placeholder="colour"
              id='colour'
              options={colors}
              isMulti
            />

          </div>
          </div>
        <div className="form-row my-1">
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>Professionalism  </label>
            <Select
              placeholder="professionalism"
              defaultValue={{value: product.level?.id, label: product.level?.stage}}
              id='level_id'
              name="level_id"
              options={levels.map((level) => ({
                value: level.id,
                label: level.stage
              }))}
            />

          </div>
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>Gender </label>
            <Select
               defaultValue={{value: product.gender.id, label: product.gender.name}}
              placeholder="gender"
              name="gender_id"
              options={genders.map(gender => ({
                value: gender.id, label: gender.name
              }))}
            />
              

          </div>

        </div>
        <div className="form-row">

          <div className="input-half">
            <label htmlFor="">
              {' '}
              <span className='text-dark font-semibold text-sm'>
                Head size: cm
                <sup>2</sup>
              </span>
              {' '}
            </label>
            <input
            onChange={handleFormInput}
            value={product.head_size}
              name="head_size"
              id='head_size'
              type="text"
              placeholder="headsize"
            />

          </div>
          <div className="input-half">
            <label htmlFor=" " className='text-dark font-semibold text-sm'> Grip size   </label>
            <input
            onChange={handleFormInput}
            value={product.grip_size}
              name="grip_size"
                            id='grip_size'
              type="text"
              placeholder="grip size"
            />

          </div>

        </div>
        <div className="form-row my-1">
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'> Cloth size  </label>
            <Select
            defaultValue={product.cloth_sizes?.map(size => ({value: size, label: size}))}
              name="cloth_sizes"
              id="cloth_sizes"
              options={clothSizes}
              isMulti
          
              />
      

          </div>
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'> Shoe size  </label>
            <Select
            defaultValue={{value: product.shoe_sizes, label: product.shoe_sizes}}
              name="shoe_sizes"
              id="shoe_sizes"
              isMulti
              options={shoeSizes}
              size={1}
              />
             

          </div>
      
        </div>
        <div className="form-row">
          
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'> Length (mm)          </label>
            <input
              name="length"
              id='length'
              onChange={handleFormInput}
              value={product.length}
              type="text"
              placeholder="lenght"
            />

          </div>
          <div className='flex-1'>
            <label htmlFor="" className='text-dark font-semibold text-sm'>
              Composition
            </label>
            <Select
              defaultValue={{value: product.composition, label: product.composition}}
              name="composition"
              id="composition"
              options={composition}
              
            />
            

        

          </div>

        </div>

        <div className="form-row my-1">
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>Weight (g)    </label>
            <input
            onChange={handleFormInput}
            value={product.weight}
              name="weight"
              id='weight'
              type="text"
              placeholder="weight"
            />

          </div>

          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>tension (kg) </label>
            <input
            onChange={handleFormInput}
            value={product.tension}
              name="tension"
              id='tension'
              type="text"
              placeholder="tension"
            />

          </div>
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>Stiffness (kg) </label>
            <input
            onChange={handleFormInput}
            value={product.stiffness}
              name="stiffness"
              id='stiffness'
              type="text"
              placeholder="tension"
            />

          </div>
          

        </div>
        <div className="text-form-container my-1">
          <label htmlFor="" className='text-dark font-semibold text-sm'>
            <span> Select product category</span>
            {' '}
            <span></span>
            {' '}
          </label>

          <Select
            placeholder="product category"
            defaultValue={ {value: product.product_category.id, label: product.product_category.name }}
            name="product_category_id"
            id='product_category_id'
            options={product_categories.map(cat => (
              {value: cat.id, label: cat.name}
            ))}
            // required
          />
          

        </div>

        <div className='my-1'>
          <label htmlFor="strung" className='text-dark font-semibold text-sm'>
            strung/unstrung
          </label>
          <Select
          defaultValue={{value: product.strung, label: product.strung}}
            name="strung"
            id="strung"
            options={strung}
            
          />
           
        </div>
        <div>
          <label htmlFor="" className='text-dark font-semibold text-sm'>
            {' '}
            <span>image url</span>

            <span></span>
          </label>
          <input
          onChange={handleFormInput}
          value={product.image}
            type="url"
            name="image"
            id='image'
            placeholder="image url"
            
          />

        </div>
        

        <div>
          <label htmlFor="" className='text-dark font-semibold text-sm'>
            {' '}
            <span>Description</span>
            {' '}
            <span></span>
            {' '}
          </label>
          <textarea
          onChange={handleFormInput}
          value={product.description}
            name="description"
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
          <p className="text-green">
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
}

    </div> 
  );
};

export default EditProduct;
