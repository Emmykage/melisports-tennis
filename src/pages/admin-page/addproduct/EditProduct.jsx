import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select, { MultiValue } from 'react-select';
import { MdReportGmailerrorred } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import getGenders from '../../../redux/actions/gender';
import getLevels from '../../../redux/actions/misc';
import { getProduct, updateProduct } from '../../../redux/actions/product';
import { getProductCategories, getSportCategories } from '../../../redux/actions/product_category';
import {
  balanceTypes,
  clothSizes, colors, composition, gripSizes, headShapes, headSizes, length, playType, recommendedGrip, shoeSizes, strung,
} from '../../../components/mock/variance';
import { resetProduct, writeProduct } from '../../../redux/product/product';
import Loader from '../../Loader';
import 'trix';
import 'trix/dist/trix.css';

const EditProduct = () => {
  const { editId } = useParams();
  const dispatch = useDispatch();

  const [imagePreviews, setImagePreviews] = useState([]);
  const { product_categories, sport_categories } = useSelector((state) => state.product_categories);

  const {
    product, loading, message, status, pending,
  } = useSelector((state) => state.product);
  const [selectSport, setSelectedSport] = useState(product?.sport_category?.name);
  const [productStatus, setProductStatus] = useState(product?.status);

  const levels = useSelector((state) => state.level.levels);
  const [productColour, setProductColour] = useState([]);
  const [productShoeSize, setProductShoeSize] = useState([]);
  const [productClothSize, setProductClothSize] = useState([]);
  const [productGripSize, setProductGripSize] = useState([]);
  const genders = useSelector((state) => state.gender.genders);
  const formRef = useRef(null);

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getSportCategories());
    dispatch(getProduct(editId));
    dispatch(getLevels());
    dispatch(getGenders());
  }, []);
  const handleFormInput = (e) => {
    dispatch(writeProduct(e.target));
  };

  useEffect(() => {
    if (status === 'success') {
      const timeOutOp = setTimeout(() => {
        dispatch(resetProduct());
      }, 5000);

      return () => { clearTimeout(timeOutOp); };
    }
  }, [status]);

  const handleImageChange = (e) => {
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
    const shoeValues = productShoeSize.map((option) => option.value);
    const clothValues = productClothSize.map((option) => option.value);
    const colorsValues = productColour.map((option) => option.value);
    const gripSizes = productGripSize.map((option) => option.value);

    const formData = new FormData();
    colorsValues.forEach((item) => (
      formData.append('product[colours][]', item)
    ));

    gripSizes.forEach((item) => (
      formData.append('product[grip_sizes][]', item)

    ));
    shoeValues.forEach((item) => (
      formData.append('product[shoe_sizes][]', item)

    ));
    clothValues.forEach((item) => (
      formData.append('product[cloth_sizes][]', item)

    ));
    e.target.level_id?.value && formData.append('product[level_id]', e.target.level_id.value);
    e.target.gender_id && formData.append('product[gender_id]', e.target.gender_id.value);

    formData.append('product[name]', product.name);
    formData.append('product[quantity]', product.quantity);

    formData.append('product[thickness]', e.target.thickness?.value ?? '');

    formData.append('product[status]', e.target.status?.value ?? '');
    formData.append('product[player_type]', e.target.player_type?.value ?? '');
    formData.append('product[head_shape]', e.target.head_shape?.value ?? '');
    formData.append('product[recommended_grip]', e.target.recommended_grip?.value ?? '');
    formData.append('product[ms_code]', e.target.ms_code?.value ?? '');

    formData.append('product[price]', product.price);
    formData.append('product[sku]', product.sku);
    formData.append('product[product_category_id]', e.target.product_category_id?.value ?? '');
    formData.append('product[sport_category_id]', e.target.sport_category_id?.value ?? '');
    formData.append('product[head_size]', product.head_size);
    formData.append('product[weight]', product.weight);
    formData.append('product[length]', product.length);
    formData.append('product[stiffness]', product.stiffness);
    formData.append('product[composition]', e.target.composition?.value ?? '');
    formData.append('product[description]', product.description);
    formData.append('product[tension]', product.tension);
    formData.append('product[strung]', e.target.strung?.value ?? '');
    formData.append('product[image]', product.image);
    formData.append('product[description_body]', e.target.description_body?.value ?? '');

    Array.from(e.target.photo.files).forEach((file, index) => {
      formData.append(`product[photos][${index}]`, file);
    });

    const data = Object.fromEntries(formData);
    dispatch(updateProduct({ editId, formData }));
  };

  useEffect(() => {
    setSelectedSport(product?.sport_category?.name);
    setProductStatus(product?.status);
  }, [product]);

  const handleValue = (value) => {
    const cat = sport_categories.find((item) => item.id == value);
    setSelectedSport(cat.name);
  };
  return (

    <div className="product-form bg-white admin m-auto w-full">

      {loading ? <Loader />

        : (
          <form onSubmit={handleSubmit} ref={formRef} className="w-full">
            <div className="p-3 flex">
              <div className="ms_code mr-auto max-w-80 w-full">
                <label htmlFor="quantity font-medium text-gray-700">Sport Category</label>

                <Select
                  onChange={(selectedOption) => handleValue(selectedOption.value)}
                  placeholder="product category"
                  defaultValue={{ value: product.sport_category?.id, label: product.sport_category?.name }}
                  // isDisabled={true}
                  required
                  name="sport_category_id"
                  id="sport_category_id"
                  options={sport_categories.map((cat) => ({ value: cat.id, label: cat.name }))}
                />
              </div>

              <div>

                <div className="ms_code ml-auto w-48">

                  <div className="ms_code quantity bg-green-500">
                    <label htmlFor="quantity font-medium text-gray-700">
                      ms product code
                      {productStatus == 'active' && '*'}
                    </label>
                    <input onChange={handleFormInput} type="text" name="ms_code" id="ms_code" value={product.ms_code} className="bg-green-200" required={productStatus === 'active'} />
                  </div>

                </div>
              </div>
            </div>
            <div className="p-3 flex justify-between">
              <div className="max-w-80 w-full">
                <label htmlFor="font-medium text-gray-700">Status</label>
                <Select
                  onChange={(selectedOption) => setProductStatus(selectedOption.value)}
                  defaultValue={{ value: product.status, label: product.status }}
                  required
                  name="status"
                  id="status"
                  options={[{ value: 'inactive', label: 'inactive' }, { value: 'active', label: 'active' }]}
                />
              </div>

              <div className=" w-48">
                <label htmlFor="quantity text-gray-700 font-bold bg-red-400">Quantity *</label>
                <input type="number" name="quantity" onChange={handleFormInput} value={product.quantity} id="quantity" required />
              </div>

              {/* </div> */}

            </div>

            <div className="bg-white p-4 rounded shadow">

              <div className="form-row text-sm my-1">
                <div className="input-half">
                  <label>
                    <span className="text-gray-500 font-semibold text-sm">Product Name *</span>
                    {' '}
                    <span />
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
                    <span className="text-gray-500 font-semibold text-sm">
                      Price: NGN
                      {productStatus == 'active' && '*'}
                    </span>
                    {' '}
                    <span />
                  </label>
                  <input
                    onChange={handleFormInput}
                    value={product.price}

                    name="price"
                    id="price"
                    type="number"
                    placeholder="price"
                    required={productStatus === 'active'}
                  />

                </div>
              </div>
              <div className="form-row my-1">

                <div className="input-half">
                  <label htmlFor="sku" className="text-dark font-semibold text-sm">
                    {' '}
                    SKU
                    {productStatus == 'active' && '*'}
                  </label>
                  <input
                    name="sku"
                    onChange={handleFormInput}
                    value={product.sku}
                    id="sku"
                    type="text"
                    placeholder="sku"
                    required={productStatus === 'active'}

                  />

                </div>
                <div className="input-half">
                  <label htmlFor="colour" className="text-gray-500 font-semibold text-sm">
                    Colour
                  </label>
                  <Select
                    defaultValue={product.colours?.map((color) => ({ value: color, label: color }))}
                    name="product_colour"
                    placeholder="colour"
                    id="colour"
                    options={colors}
                    onChange={(selectedOption) => setProductColour(selectedOption)}
                    isMulti
                  />

                </div>
              </div>

              <div className="flex justify-between gap-3 text-sm my-1">
                <div className="flex-1">
                  <label htmlFor="product_category_id" className="text-dark font-semibold text-sm">
                    <span> Select product category</span>
                    {' '}
                    <span />
                    {' '}
                  </label>

                  <Select
                    placeholder="product category"
                    defaultValue={{ value: product.product_category?.id, label: product.product_category?.name }}
                    name="product_category_id"
                    id="product_category_id"
                    options={product_categories.map((cat) => (
                      { value: cat.id, label: cat.name }
                    ))}
                  />

                </div>
                <div className="input-half">
                  <label htmlFor="" className="text-dark font-semibold text-sm">Gender </label>
                  <Select
                    defaultValue={{ value: product.gender?.id, label: product.gender?.name }}
                    placeholder="gender"
                    name="gender_id"
                    options={genders.map((gender) => ({
                      value: gender.id, label: gender.name,
                    }))}
                  />

                </div>
              </div>

              {selectSport == 'Tennis' ? (
                <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
                  <legend className="font-bold">Racquets</legend>

                  <div className="flex gap-4 ">
                    <div className="input-half">
                      <label htmlFor="level_id" className="text-dark font-semibold text-sm">Professionalism  </label>
                      <Select
                        placeholder="professionalism"
                        defaultValue={{ value: product.level?.id, label: product.level?.stage }}
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
                        defaultValue={{ value: product.strung, label: product.strung }}
                        name="strung"
                        id="strung"
                        options={strung}
                      />

                    </div>

                  </div>

                  <div className="flex gap-4 flex-col md:flex-row my-1">

                    <div className="input-half">
                      <label htmlFor="head_size">
                        {' '}
                        <span className="text-dark font-semibold text-sm">
                          Head size: cm
                          <sup>2</sup>
                        </span>
                        {' '}
                      </label>
                      <Select
                        defaultValue={{ label: product.head_size, value: product.head_size }}
                        options={headSizes}
                        name="head_size"
                        id="head_size"
                        type="text"
                        placeholder="headsize"
                      />

                    </div>

                    <div className="input-half">
                      <label htmlFor="grip_sizes " className="text-gray-500 font-semibold text-sm"> Grip size   </label>
                      <Select
                        defaultValue={product.grip_sizes?.map((size) => ({ value: size, label: size }))}
                        name="grip_sizes"
                        id="grip_sizes"
                        type="text"
                        options={gripSizes}
                        placeholder="grip size"
                        onChange={(selectedOption) => setProductGripSize(selectedOption)}

                        isMulti
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

                        defaultValue={{ value: product.length, label: product.length }}
                        type="text"
                        placeholder="lenght"
                      />

                    </div>

                    <div className="flex-1">
                      <label htmlFor="" className="text-gray-500 font-semibold text-sm">
                        Composition
                      </label>
                      <Select
                        defaultValue={{ value: product.composition, label: product.composition }}
                        name="composition"
                        id="composition"
                        options={composition}
                      />

                    </div>

                  </div>

                  <div className="form-row my-1">
                    <div className="input-half">
                      <label htmlFor="weight" className="text-gray-500 font-semibold text-sm">Weight (g)    </label>
                      <input
                        onChange={handleFormInput}
                        value={product.weight}
                        name="weight"
                        id="weight"
                        type="text"
                        placeholder="weight"
                      />

                    </div>

                    <div className="input-half">
                      <label htmlFor="" className="text-gray-500 font-semibold text-sm">tension (kg) </label>
                      <input
                        onChange={handleFormInput}
                        value={product.tension}
                        name="tension"
                        id="tension"
                        type="text"
                        placeholder="tension"
                      />

                    </div>
                    <div className="input-half">
                      <label htmlFor="" className="text-gray-500 font-semibold text-sm">Stiffness (kg) </label>
                      <input
                        onChange={handleFormInput}
                        value={product.stiffness}
                        name="stiffness"
                        id="stiffness"
                        type="text"
                        placeholder="tension"
                      />

                    </div>

                  </div>
                </fieldset>
              )
                : selectSport == 'Padel' ? (
                  <>
                    <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
                      <legend className="font-bold">Padel</legend>

                      <div className="flex gap-4 ">
                        <div className="bg-r w-full">
                          <label htmlFor="player_type" className="text-gray-500 font-semibold text-sm">Type of Player  </label>
                          <Select
                            defaultValue={{ value: product?.player_type, label: product?.player_type }}
                            placeholder="Player Typology"
                            id="player_type"
                            name="player_type"
                            options={playType.map((type) => ({
                              value: type.value,
                              label: type.label,
                            }))}
                          />
                        </div>

                      </div>

                      <div className="flex gap-4 flex-col md:flex-row my-1">

                        <div className="input-half">
                          <label htmlFor="head_shape">
                            {' '}
                            <span className="text-gray-500 font-semibold text-sm">
                              Head shape
                            </span>
                            {' '}
                          </label>
                          <Select
                            defaultValue={{ value: product?.head_shape, label: product?.head_shape }}
                            name="head_shape"
                            id="head_shape"
                            type="text"
                            options={headShapes}
                            placeholder="head Shape"
                          />

                        </div>
                        <div className="input-half">
                          <label htmlFor="recommended_grip">
                            {' '}
                            <span className="text-gray-500 font-semibold text-sm">
                              Recommended Grip
                            </span>
                            {' '}
                          </label>
                          <Select
                            defaultValue={{ value: product?.recommended_grip, label: product?.recommended_grip }}
                            name="recommended_grip"
                            id="recommended_grip"
                            type="text"
                            options={recommendedGrip}
                          />
                        </div>

                      </div>
                      <div className="flex gap-4 flex-col md:flex-row my-1">

                        <div className="input-half">
                          <label htmlFor="balance_type" className="text-gray-500 font-semibold text-sm"> Length (mm)          </label>
                          <input
                            onChange={handleFormInput}
                            name="length"
                            id="length"
                            value={product.length}
                            type="text"
                            placeholder="length in mm"
                          />

                        </div>
                        <div className="flex-1">
                          <label htmlFor="" className="text-gray-500 font-semibold text-sm">
                            Composition
                          </label>
                          <Select
                            defaultValue={{ value: product?.composition, label: product?.composition }}
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
                            value={product.weight}
                            onChange={handleFormInput}
                            name="weight"
                            id="weight"
                            type="text"
                            placeholder="weight"
                          />

                        </div>

                        <div className="input-half">
                          <label htmlFor="thickness" className="text-gray-500 font-semibold text-sm">thickness (mm) </label>
                          <input
                            value={product.thickness}
                            onChange={handleFormInput}
                            name="thickness"
                            id="thickness"
                            type="text"
                            placeholder="thickness"
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

                  </>
                )

                  : selectSport == 'Badminton' ? (
                    <>
                      <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
                        <legend className="font-bold">Badminton</legend>

                        <div className="flex gap-4 ">
                          <div className="bg-r w-full">
                            <label htmlFor="" className="text-gray-500 font-semibold text-sm">Type of Player  </label>
                            <Select
                              preventDefault={{ value: product?.player_type, label: product.player_type }}
                              placeholder="Player Typology"
                              id="player_type"
                              name="head_shape"
                              options={playType.map((type) => ({
                                value: type.value,
                                label: type.label,
                              }))}
                            />
                          </div>

                        </div>

                        <div className="flex gap-4 flex-col md:flex-row my-1">

                          <div className="input-half">
                            <label htmlFor="balance_type" className="text-gray-500 font-semibold text-sm"> Length (mm)          </label>
                            <Select
                              defaultValue={{ value: product?.length, label: product?.length }}
                              name="length"
                              id="length"
                              options={length}
                  // type="text"
                              placeholder="lenght"
                            />

                          </div>
                          <div className="flex-1">
                            <label htmlFor="" className="text-gray-500 font-semibold text-sm">
                              Composition
                            </label>
                            <Select
                              defaultValue={{ value: product?.composition, label: product?.composition }}
                              name="composition"
                              id="composition"
                              options={composition}
                            />

                          </div>

                        </div>

                        <div className="form-row my-1">
                          <div className="input-half">
                            <label htmlFor="" className="text-gray-500 font-semibold text-sm">Weight (g)</label>
                            <input
                              defaultValue={product.weight}
                              onChange={handleFormInput}
                              name="weight"
                              id="weight"
                              type="text"
                              placeholder="weight"
                            />

                          </div>

                          <div className="input-half">
                            <label htmlFor="" className="text-gray-500 font-semibold text-sm">thickness (mm) </label>
                            <input
                              value={product.thickness}
                              onChange={handleFormInput}
                              name="thickness"
                              id="thickness"
                              type="text"
                              placeholder="thickness"
                            />

                          </div>
                          <div className="input-half">
                            <label htmlFor="" className="text-gray-500 font-semibold text-sm">Stiffness (kg) </label>
                            <input
                              value={product.stiffness}
                              onChange={handleFormInput}
                              name="stiffness"
                              id="stiffness"
                              type="text"
                              placeholder="tension"
                            />

                          </div>

                        </div>
                      </fieldset>

                    </>
                  ) : (
                    <>
                      <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
                        <legend className="font-bold">Unselected Category</legend>

                      </fieldset>

                    </>
                  ) }

              <fieldset disabled="disabled" className="p-3 bg-gray-100 border-gray-light rounded my-5">
                <legend className="font-bold">Shoes</legend>
                <div className="input-half">
                  <label htmlFor="" className="text-gray-500 font-semibold text-sm"> Shoe size  </label>
                  <Select

                    defaultValue={product.shoe_sizes?.map((item) => ({ value: item, label: item }))}
                    name="shoe_sizes"
                    id="shoe_sizes"
                    isMulti
                    onChange={(selectedOption) => setProductShoeSize(selectedOption)}

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
                      defaultValue={product.cloth_sizes?.map((size) => ({ value: size, label: size }))}

                      name="cloth_sizes"
                      id="cloth_sizes"
                      options={clothSizes}
                      isMulti
                      onChange={(selectedOption) => setProductClothSize(selectedOption)}

                    />

                  </div>

                </div>

              </fieldset>

              <div className="form-row my-1" />
              <div className="form-row" />

              <div className="form-row" />

              <div className="form-row my-1" />

              <div>
                <label htmlFor="" className="text-dark font-semibold text-sm">
                  {' '}
                  <span>image url</span>

                  <span />
                </label>
                <input
                  onChange={handleFormInput}
                  value={product.image}
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
                  onInput={handleImageChange}
                  type="file"
                  accept="image/*"
                  name="photo"
                  id="photo"
                  multiple
                />

              </div>

              {product?.description && (
              <div>
                {' '}
                <p>
                  {product?.description}
                  {' '}
                </p>
                {' '}
              </div>
              )}
              <div>
                <input id="trix" type="hidden" name="description_body" value={product?.description_body} />
                <trix-editor input="trix" />

              </div>

              <div className="flex gap-4 my-6">
                {imagePreviews && imagePreviews.length > 0 && <h4 className="text-green-600">New Photos</h4>}
                {imagePreviews.map((image, index) => (
                  <img src={image} alt="" key={index} className="w-40 border border-gray-400 rounded overflow-hidden bg-gray-100 p-3" />
                ))}
              </div>
              <div className="flex gap-4 my-6">
                {imagePreviews && imagePreviews.length > 0 && <h4 className="text-red-600">Old Photos</h4>}

                {product.photo_urls?.map((image, index) => (
                  <img src={image} alt="" key={index} className="w-40 border border-gray-400 rounded overflow-hidden bg-gray-100 p-3" />
                ))}
              </div>

              {pending ? (
                <p className="normal">
                  {' '}
                  {message}
                </p>
              ) : (status == 'success' ? (
                <p className="text-green bg-green-200 rounded flex my-3 p-5 gap-3 items-center">
                  {' '}
                  <FaCheckCircle className="text-green-700 text-3xl" />

                  {message}
                </p>
              ) : status == 'rejected' && (
                <p className="text-red-800 bg-red-200 rounded my-3 p-5 flex gap-3 items-center">
                  {' '}
                  <MdReportGmailerrorred className="text-red-700 text-3xl" />
                  {message}
                </p>
              )) }
              <button className="btn" type="submit">
                Update product
              </button>
            </div>

          </form>
        )}

    </div>
  );
};

export default EditProduct;
