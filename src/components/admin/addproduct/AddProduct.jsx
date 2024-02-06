import React, { useEffect, useRef, useState } from 'react';
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
    if(e.target.photo.files[0] ||  e.target.image.value ){
      const shoeValues = Array.from(e.target.shoe_sizes).map(option => option.value)
      const clothValues = Array.from(e.target.cloth_sizes).map(option => option.value)
      
      const formData = new FormData()
      formData.append("product[name]", e.target.name.value)
      formData.append("product[price]", e.target.price.value)
      formData.append("product[sku]", e.target.sku.value)
      formData.append("product[product_category_id]", e.target.product_category_id.value)
      formData.append("product[gender_id]", e.target.gender_id.value)
      formData.append("product[grip_size]", e.target.grip_size.value)
      formData.append("product[head_size]", e.target.head_size.value)
      formData.append("product[colour]", e.target.colour.value)
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
      formData.append("product[photo]", e.target.photo.files[0])
  
      // const data = Object.fromEntries(formData)
      // console.log(data)
      dispatch(addProduct(formData));
    }else{
      alert("No image: Add a product image")
    }

  };

  return (
    <div className="product-form admin">

      <form onSubmit={handleSubmit} ref={formRef}>
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

    
        <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'> Quantity          </label>
            <input
              name="quantity"
              id='quantity'
              
              type="number"
              placeholder="Number of Items "
            />

          </div>
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
            <input
              name="colour"              
              placeholder="colour"
              id='colour'
              type="text"
            />

          </div>
          </div>
        <div className="form-row my-1">
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>Professionalism  </label>
            <select
              placeholder="professionalism"
              id='level_id'
              name="level_id"
            >
              <option value="" selected>--Select---</option>
              {levels.map((level) => (

                <option value={level.id}>{level.stage}</option>
              ))}
            </select>

          </div>
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'>Gender </label>
            <select
              placeholder="gender"
              name="gender_id"
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
            <select
              name="cloth_sizes"
              id="cloth_sizes"
              multiple
              
              size={1}
            >
              {clothSizes.map((item) => (

                <option value={item.abbrv}>{item.abbrv}</option>

              ))}

            </select>

          </div>
          <div className="input-half">
            <label htmlFor="" className='text-dark font-semibold text-sm'> Shoe size  </label>
            <select
              name="shoe_sizes"
              id="shoe_sizes"
              multiple
              
              size={1}
            >
              {shoeSizes.map((item) => (

                <option value={item.abbrv}>{item.abbrv}</option>

              ))}

            </select>

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
            <select
              name="composition"
              id="composition"
              
            >
              <option value="">--Select--</option>
              <option value="graphite">Graphite </option>
              <option value="aluminium">Aluminium </option>
              <option value="carbon">Carbon </option>

            </select>

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

          <select
            placeholder="product category"
            name="product_category_id"
            id='product_category_id'
            required
          >
            <option value="" selected>--Select--</option>
            {product_categories.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>

        </div>

        <div className='my-1'>
          <label htmlFor="strung" className='text-dark font-semibold text-sm'>
            strung/unstrung
          </label>
          <select
            name="strung"
            id="strung"
            
          >
            <option value="" selected>--Selected----</option>
            {strung.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
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
