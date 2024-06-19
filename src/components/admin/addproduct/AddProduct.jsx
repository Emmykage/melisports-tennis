import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { MultiValue } from 'react-select';
import { MdReportGmailerrorred } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import getLevels from '../../../redux/actions/misc';
import getGenders from '../../../redux/actions/gender';
import { addProduct } from '../../../redux/actions/product';
import { getProductCategories } from '../../../redux/actions/product_category';
import Categories from '../Categories';
import {
  clothSizes, colors, composition, gripSizes, headSizes, length, shoeSizes, strung,
} from '../../mock/variance';
import { resetProduct } from '../../../redux/product/product';

const AddProduct = () => {
  const [imagePreviews, setImagePreviews] = useState([]);

  const { product_categories, updater } = useSelector((state) => state.product_categories);
  const levels = useSelector((state) => state.level.levels);
  const genders = useSelector((state) => state.gender.genders);
  const { loading, status, report } = useSelector((state) => state.product);
  const formRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getLevels());
    dispatch(getGenders());
  }, [updater]);

  useEffect(() => {
    const element = formRef.current;
    if (status === 'success') {
      element.reset();

      const timeOutOp = setTimeout(() => {
        dispatch(resetProduct());
      }, 5000);

      return () => { clearTimeout(timeOutOp); };
    }
  }, [status]);

  const handleImageChange = (e) => {
    // (e)=> setImages(e.target.files)

    const files = Array.from(e.target.files);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(previews).then((images) => {
      setImagePreviews(images);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imagePreviews.length > 0 || e.target.image.value) {
      const shoeValues = Array.from(e.target.shoe_sizes).map((option) => option.value);
      const clothValues = Array.from(e.target.cloth_sizes).map((option) => option.value);
      const colorsValues = Array.from(e.target.product_colour).map((option) => option.value);

      const formData = new FormData();
      formData.append('product[name]', e.target.name.value);
      formData.append('product[quantity]', e.target.quantity.value);
      formData.append('product[ms_code]', e.target.ms_code.value);
      formData.append('product[price]', e.target.price.value);
      formData.append('product[sku]', e.target.sku.value);
      formData.append('product[product_category_id]', e.target.product_category_id.value);
      formData.append('product[level_id]', e.target.level_id.value);
      formData.append('product[gender_id]', e.target.gender_id.value);
      formData.append('product[grip_size]', e.target.grip_size.value);
      formData.append('product[head_size]', e.target.head_size.value);
      formData.append('product[colours]', colorsValues);
      formData.append('product[weight]', e.target.weight.value);
      formData.append('product[length]', e.target.length.value);
      formData.append('product[stiffness]', e.target.stiffness.value);
      formData.append('product[composition]', e.target.composition.value);
      formData.append('product[description]', e.target.description.value);
      formData.append('product[tension]', e.target.tension.value);
      formData.append('product[strung]', e.target.strung.value);
      formData.append('product[image]', e.target.image.value);
      formData.append('product[cloth_sizes]', clothValues);
      formData.append('product[shoe_sizes]', shoeValues);
      // formData.append("product[photo]", e.target.photo.files[0])

      Array.from(e.target.photo.files).forEach((file, index) => {
        formData.append(`product[photos][${index}]`, file);
      });

      const data = Object.fromEntries(formData);
      dispatch(addProduct(formData));
    } else {
      alert('No image: Add a product image');
    }
  };

  return (
    <div className="product-form bg-white admin m-auto w-full">

      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="p-3">

          <div className="ms_code ml-auto w-48 bg-green-500 p-3">
            <label htmlFor="quantity font-medium text-gray-700">ms product code *</label>
            <input type="text" name="ms_code" id="ms_code" className="bg-green-200" required />
          </div>
          <div className="ml-auto w-48 my-2">
            <label htmlFor="quantity text-gray-700 font-bold bg-red-400">Quantity *</label>
            <input type="number" name="quantity" id="quantity" required />
          </div>
        </div>

        <div className=" bg-white p-4 rounded shadow">
          <div className="flex justify-between gap-3 text-sm my-1">
            <div className="input-half">
              <label htmlFor="name">
                <span className="text-gray-500 font-semibold text-sm">Product Name *</span>
                {' '}
                <span />
                {' '}
              </label>
              <input

                name="name"
                type="text"
                id="name"
                placeholder="product name"
                required
              />

            </div>
            <div className="input-half">
              <label>
                <span className="text-gray-500 font-semibold text-sm">Price: NGN *</span>
                {' '}
                <span />
              </label>
              <input
                name="price"
                id="price"
                type="number"
                placeholder="price"
                required
              />

            </div>
          </div>

          <div className="flex justify-between gap-3 text-sm my-1">

            <div className="input-half">
              <label htmlFor="sku" className="text-gray-500 font-semibold text-sm"> SKU  * </label>
              <input
                name="sku"
                id="sku"
                type="text"
                placeholder="sku"
              />

            </div>
            <div className="input-half">
              <label htmlFor="colour" className="text-gray-500 font-semibold text-sm">
                Colour
              </label>
              <Select
                name="product_colour"
                placeholder="colour"
                id="colour"
                options={colors}
                isMulti
              />

            </div>
          </div>

          <div className="flex justify-between gap-3 text-sm my-1 ">

            <div className="flex-1">
              <label htmlFor="" className="text-gray-500 font-semibold text-sm">
                <span> Select product category *</span>
                {' '}
                <span />
                {' '}
              </label>

              <Select
                placeholder="product category"
                required
                name="product_category_id"
                id="product_category_id"
                options={product_categories.map((cat) => (
                  { value: cat.id, label: cat.name }
                ))}
              />

            </div>
            <div className="input-half">
              <label htmlFor="" className="text-gray-500 font-semibold text-sm">Gender </label>
              <Select
                placeholder="gender"
                name="gender_id"
                options={genders.map((gender) => ({
                  value: gender.id, label: gender.name,
                }))}
              />

            </div>

          </div>

          <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
            <legend className="font-bold">Racquets</legend>

            <div className="flex gap-4 ">
              <div className="input-half">
                <label htmlFor="" className="text-gray-500 font-semibold text-sm">Professionalism  </label>
                <Select
                  placeholder="professionalism"
                  id="level_id"
                  name="level_id"
                  options={levels.map((level) => ({
                    value: level.id,
                    label: level.stage,
                  }))}
                />
              </div>
              <div className="input-half">
                <label htmlFor="strung" className="text-gray-500 font-semibold text-sm">
                  strung/unstrung
                </label>
                <Select
                  name="strung"
                  id="strung"
                  options={strung}
                />

              </div>

            </div>

            <div className="flex gap-4 flex-col md:flex-row my-1">

              <div className="input-half">
                <label htmlFor="">
                  {' '}
                  <span className="text-gray-500 font-semibold text-sm">
                    Head size: cm
                    <sup>2</sup>
                  </span>
                  {' '}
                </label>
                <Select
                  name="head_size"
                  id="head_size"
                  type="text"
                  options={headSizes}
                  placeholder="headsize"
                />

              </div>
              <div className="input-half">
                <label htmlFor=" " className="text-gray-500 font-semibold text-sm"> Grip size   </label>
                <Select
                  name="grip_size"
                  id="grip_size"
                  type="text"
                  options={gripSizes}
                  placeholder="grip size"
                />

              </div>

            </div>
            <div className="flex gap-4 flex-col md:flex-row my-1">

              <div className="input-half">
                <label htmlFor="" className="text-gray-500 font-semibold text-sm"> Length (mm)          </label>
                <Select
                  name="length"
                  id="length"
                  options={length}
                  type="text"
                  placeholder="lenght"
                />

              </div>
              <div className="flex-1">
                <label htmlFor="" className="text-gray-500 font-semibold text-sm">
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
                <label htmlFor="" className="text-gray-500 font-semibold text-sm">Weight (g)    </label>
                <input
                  name="weight"
                  id="weight"
                  type="text"
                  placeholder="weight"
                />

              </div>

              <div className="input-half">
                <label htmlFor="" className="text-gray-500 font-semibold text-sm">tension (kg) </label>
                <input
                  name="tension"
                  id="tension"
                  type="text"
                  placeholder="tension"
                />

              </div>
              <div className="input-half">
                <label htmlFor="" className="text-gray-500 font-semibold text-sm">Stiffness (kg) </label>
                <input
                  name="stiffness"
                  id="stiffness"
                  type="text"
                  placeholder="tension"
                />

              </div>

            </div>
          </fieldset>
          <fieldset disabled="disabled" className="p-3 bg-gray-100 border-gray-light rounded my-5">
            <legend className="font-bold">Shoes</legend>
            <div className="input-half">
              <label htmlFor="" className="text-gray-500 font-semibold text-sm"> Shoe size  </label>
              <Select
                defaultValue=""
                name="shoe_sizes"
                id="shoe_sizes"
                isMulti
                options={shoeSizes}
                size={1}
              />

            </div>
          </fieldset>

          <fieldset className="p-3 bg-gray-100 my-5 border-gray-light rounded">
            <legend className="font-bold">Apparels</legend>
            <div className="flex gap-3 md:flex-row flex-col my-1">
              <div className="input-half">
                <label htmlFor="" className="text-gray-500 font-semibold text-sm"> Cloth size  </label>
                <Select
                  name="cloth_sizes"
                  id="cloth_sizes"
                  options={clothSizes}
                  isMulti
                />

              </div>

            </div>

          </fieldset>

          <div>
            <label htmlFor="" className="text-gray-500 font-semibold text-sm">
              {' '}
              <span>image url</span>

              <span />
            </label>
            <input
              type="url"
              name="image"
              id="image"
              placeholder="image url"
            />

          </div>

          <div className="my-1">
            <label htmlFor="" className="text-dark font-semibold text-sm">
              {' '}
              <span>image *</span>

              <span />
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              name="photo"
              id="photo"
              multiple
            />

          </div>

          <div>
            <label htmlFor="" className="text-dark font-semibold text-sm">
              {' '}
              <span>Description *</span>
              {' '}
              <span />
              {' '}
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              required
            />

          </div>

          <div className="flex gap-4 my-6">
            {imagePreviews.map((image, index) => (
              <img src={image} alt="" key={index} className="w-40 border border-gray-400 rounded overflow-hidden bg-gray-100 p-3" />
            ))}
          </div>


          {loading ? (
            <p className="normal">
              {' '}
              {report}
            </p>
          ) : (status == 'success' ? (
            <p className="text-green bg-green-200 rounded my-3 p-5 flex gap-3 items-center">
              {' '}

              <FaCheckCircle className="text-green-700 text-3xl" />
              {report}
            </p>
          ) : status == 'rejected' && (
          <p className="text-red-800 bg-red-200 rounded my-3 p-5 flex gap-3 items-center">
            {' '}

            <MdReportGmailerrorred className="text-red-700 text-3xl" />
            {report}
          </p>
          )) }

          
<button className="btn" type="submit">
            add product
          </button>

        </div>

      </form>

      {/* <Categories /> */}

    </div>
  );
};

export default AddProduct;
