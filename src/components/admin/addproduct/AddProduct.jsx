import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getLevels from '../../../redux/actions/misc';
import getGenders from '../../../redux/actions/gender';
import { addProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';
import Categories from '../Categories';
import {clothSizes, colors, composition, shoeSizes, strung} from '../../mock/variance';
import Select, { MultiValue } from "react-select";
import product from '../../../redux/products/product';
const AddProduct = () => {
  const { product_categories, updater } = useSelector((state) => state.product_categories);
  const levels = useSelector((state) => state.level.levels);
  const genders = useSelector((state) => state.gender.genders);
  const { loading, status, report } = useSelector((state) => state.product);
  const formRef = useRef(null)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getLevels());
    dispatch(getGenders());
  }, [updater]);

  useEffect(()=> {
    const element =  formRef.current 
    if (status == "success")
    {
      element.reset()
    }
    
  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.photo.files.length > 0 ||  e.target.image.value ){
      const shoeValues = Array.from(e.target.shoe_sizes).map(option => option.value)
      const clothValues = Array.from(e.target.cloth_sizes).map(option => option.value)
      const colorsValues = Array.from(e.target.product_colour).map(option => option.value)
      const formData = new FormData()
      formData.append("product[name]", e.target.name.value)
      formData.append("product[quantity]", e.target.quantity.value)
      formData.append("product[price]", e.target.price.value)
      formData.append("product[sku]", e.target.sku.value)
      formData.append("product[product_category_id]", e.target.product_category_id.value)
      formData.append("product[level_id]", e.target.level_id.value)
      formData.append("product[gender_id]", e.target.gender_id.value)
      formData.append("product[grip_size]", e.target.grip_size.value)
      formData.append("product[head_size]", e.target.head_size.value)
      formData.append("product[colours]", colorsValues)
      formData.append("product[weight]", e.target.weight.value)
      formData.append("product[length]", e.target.length.value)
      formData.append("product[stiffness]", e.target.stiffness.value)
      formData.append("product[composition]", e.target.composition.value)
      formData.append("product[description]", e.target.description.value)
      formData.append("product[tension]", e.target.tension.value)
      formData.append("product[strung]", e.target.strung.value)
      formData.append("product[image]", e.target.image.value)
      formData.append("product[cloth_sizes]", clothValues)
      formData.append("product[shoe_sizes]", shoeValues)
      // formData.append("product[photo]", e.target.photo.files[0])

      Array.from(e.target.photo.files).forEach((file, index) => {
        formData.append(`product[photos][${index}]`, file)
      })

      const data = Object.fromEntries(formData)
      dispatch(addProduct(formData));
    }else{
      alert("No image: Add a product image")
    }

  };


  return (
    <div className="product-form admin">

      <form onSubmit={handleSubmit} ref={formRef}>
      <div className='quantity'>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" id="quantity"/>
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
              name="price"
              id='price'
              type="number"
              placeholder="price"
              required
            />

          </div>
        </div>
        <div className='form-row my-1'>

    
        {/* <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'> Quantity          </label>
            <input
              name="quantity"
              id='quantity'
              
              type="number"
              placeholder="Number of Items "
            />

          </div> */}
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'> SKU   </label>
            <input
              name="sku"
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
              id='level_id'
              name="level_id"
              options={levels.map((level) => ({
                value: level.id,
                label: level.stage
              }))}
            />
              {/* <option value="" selected>--Select---</option>
              {levels.map((level) => (

                <option value={level.id}>{level.stage}</option>
              ))}
            </select> */}

          </div>
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>Gender </label>
            <Select
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
              name="head_size"
              id='head_size'
              type="text"
              placeholder="headsize"
            />

          </div>
          <div className="input-half">
            <label htmlFor=" " className='text-dark font-semibold text-sm'> Grip size   </label>
            <input
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
              name="cloth_sizes"
              id="cloth_sizes"
              options={clothSizes}
              isMulti
              
              // size={1}
              />
              {/* {clothSizes.map((item) => (

                <option value={item.abbrv}>{item.abbrv}</option>

              ))}

            </select> */}

          </div>
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'> Shoe size  </label>
            <Select
            defaultValue=""
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
              
              type="text"
              placeholder="lenght"
            />

          </div>
          <div className='flex-1'>
            <label htmlFor="" className='text-dark font-semibold text-sm'>
              Composition
            </label>
            <Select
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
              name="weight"
              id='weight'
              type="text"
              placeholder="weight"
            />

          </div>

          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>tension (kg) </label>
            <input
              name="tension"
              id='tension'
              type="text"
              placeholder="tension"
            />

          </div>
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>Stiffness (kg) </label>
            <input
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
            type="url"
            name="image"
            id='image'
            placeholder="image url"
            
          />

        </div>
        <div className='my-1'>
          <label htmlFor="" className='text-dark font-semibold text-sm'>
            {' '}
            <span>image</span>

            <span></span>
          </label>
          <input
            type="file"
            name="photo"
            id='photo'
            multiple
            
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
      <Categories />

    </div>
  );
};

export default AddProduct;
