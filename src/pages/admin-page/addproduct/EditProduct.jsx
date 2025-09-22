import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Select, { MultiValue } from 'react-select';
import { MdReportGmailerrorred } from 'react-icons/md';
import { FaCheckCircle, FaMinus, FaPlus } from 'react-icons/fa';
import getGenders from '../../../redux/actions/gender';
import getLevels from '../../../redux/actions/misc';
import { getProduct, updateProduct } from '../../../redux/actions/product';
import { getProductCategories, getSportCategories } from '../../../redux/actions/product_category';
import {
  clothSizes, colors, composition, gripSizes, headShapes, headSizes, length, locations as productLocations, playType, recommendedGrip, shoeSizes, strung,
} from '../../../constants/variance';
import { resetProduct, writeProduct } from '../../../redux/product/product';
import Loader from '../../Loader';
import 'trix';
import 'trix/dist/trix.css';

const EditProduct = () => {
  const { editId } = useParams();
  const dispatch = useDispatch();
  const [productInventories, setProductInventories] = useState([{
    size: '', quantity: '', sku: '', location: [],
  }]);

  const [imagePreviews, setImagePreviews] = useState([]);
  const { product_categories, sport_categories } = useSelector((state) => state.product_categories);

  const {
    product, loading, message, status, pending,
  } = useSelector((state) => state.product);
  const [selectSport, setSelectedSport] = useState(product?.sport_category?.name);
  const [productStatus, setProductStatus] = useState(product?.status);

  const levels = useSelector((state) => state.level.levels);
  const [productColour, setProductColour] = useState([]);
  const [productGripSize, setProductGripSize] = useState([]);

  const [selectTool, setSelectTool] = useState(product_categories[0]?.name);

  const genders = useSelector((state) => state.gender.genders);
  const formRef = useRef(null);

  const addToProductInventory = ({ key, value }, index) => {
    const updateProductInventories = productInventories.map((item, i) => (i === index ? {
      ...item,
      [key]: value,

    }
      : item));

    setProductInventories(updateProductInventories);
  };

  useEffect(() => {
    setProductInventories(product?.product_inventories ?? productInventories);
  }, [product?.product_inventories]);

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

    const colorsValues = productColour.map((option) => option.value);
    const gripSizes = productGripSize.map((option) => option.value);

    const formData = new FormData();
    colorsValues.forEach((item) => (
      formData.append('product[colours][]', item)
    ));

    productInventories.forEach(({
      quantity, size, price, sku, locations, id, _destroy,
    }, i) => {
      (quantity || e.target.product_quantity?.value) && formData.append(`product[product_inventories_attributes][${i}][quantity]`, quantity ?? e.target.product_quantity.value);
      size && formData.append(`product[product_inventories_attributes][${i}][size]`, size);
      sku && formData.append(`product[product_inventories_attributes][${i}][sku]`, sku);
      locations && locations.map((item) => (
        formData.append(`product[product_inventories_attributes][${i}][locations][]`, item)
      ));
      formData.append(`product[product_inventories_attributes][${i}][price]`, price || (e.target.price.value ?? ''));
      id && formData.append(`product[product_inventories_attributes][${i}][id]`, id);
      _destroy && formData.append(`product[product_inventories_attributes][${i}][_destroy]`, _destroy);
    });
    gripSizes.forEach((item) => (
      formData.append('product[grip_sizes][]', item)

    ));

    e.target.level_id?.value && formData.append('product[level_id]', e.target.level_id.value);
    e.target.gender_id && formData.append('product[gender_id]', e.target.gender_id.value);

    formData.append('product[name]', e.target.name.value ?? '');
    formData.append('product[product_quantity]', e.target?.product_quantity?.value ?? '');

    formData.append('product[thickness]', e.target.thickness?.value ?? '');

    formData.append('product[status]', e.target.status?.value ?? '');
    formData.append('product[player_type]', e.target.player_type?.value ?? '');
    formData.append('product[head_shape]', e.target.head_shape?.value ?? '');
    formData.append('product[recommended_grip]', e.target.recommended_grip?.value ?? '');
    formData.append('product[ms_code]', e.target.ms_code?.value ?? '');

    formData.append('product[price]', e.target.price?.value ?? '');
    formData.append('product[ms_item_code]', e.target.ms_item_code?.value ?? '');
    formData.append('product[product_category_id]', e.target.product_category_id?.value ?? '');
    formData.append('product[sport_category_id]', e.target.sport_category_id?.value ?? '');
    formData.append('product[head_size]', e.target.head_size?.value ?? '');
    formData.append('product[weight]', e.target.weight?.value);

    formData.append('product[length]', e.target.length?.value);
    formData.append('product[stiffness]', e.target.stiffness?.value ?? '');
    formData.append('product[composition]', e.target.composition?.value ?? '');
    formData.append('product[description]', product?.description ?? '');
    formData.append('product[tension]', e.target.tension?.value ?? '');
    formData.append('product[strung]', e.target.strung?.value ?? '');
    formData.append('product[image]', product.image ?? '');
    formData.append('product[description_body]', e.target.description_body?.value ?? '');

    Array.from(e.target.photo.files).forEach((file, index) => {
      formData.append(`product[photos][${index}]`, file);
    });

    // const data = Object.fromEntries(formData);

    dispatch(updateProduct({ editId, formData }));
  };

  useEffect(() => {
    setSelectedSport(product?.sport_category?.name);
    setProductStatus(product?.status);
  }, [product.sport_category]);

  const handleValue = (value) => {
    const cat = sport_categories.find((item) => item.id == value);
    setSelectedSport(cat.name);
  };

  useEffect(() => {
    setSelectTool(product?.product_category?.name);
  }, [product_categories]);

  const handleInventoryRowDel = (index) => {
    if (productInventories[index]?.id) {
      const newSizes = productInventories.map((item, i) => {
        if (item?.id && i == index) {
          return {
            ...item,
            _destroy: true,
          };
        }
        return item;
      });
      setProductInventories(newSizes);
    } else {
      const newSize = productInventories.filter((_, i) => i !== index);
      setProductInventories(newSize);
    }
  };
  return (

    <div className="product-form bg-white admin m-auto w-full">

      {loading ? <Loader />

        : (
          <form onSubmit={handleSubmit} ref={formRef} className="w-full">
            <div className="p-3 flex gap-3">
              <div className="ms_code mr-auto max-w-80 w-full">
                <label htmlFor="quantity font-medium text-gray-700">Sport Category</label>

                <Select
                  onChange={(selectedOption) => { handleValue(selectedOption.value); }}
                  placeholder="sport category"
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
            <div className="p-3 flex gap-4 justify-between">
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
                <label htmlFor="product_quantity" className="text-gray-700 font-bold">Quantity *</label>
                <input type="number" name="product_quantity" onChange={handleFormInput} value={product.product_quantity} id="product_quantity" required />
              </div>

              {/* </div> */}

            </div>

            <div className="bg-white p-4 rounded shadow">

              <div className="form-row text-sm my-1">
                <div className="flex-1">
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
                <div className="flex-1">
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

                <div className="flex-1">
                  <label htmlFor="sku" className="text-dark font-semibold text-sm">
                    {' '}
                    MS Item code
                    {productStatus == 'active' && '*'}
                  </label>
                  <input
                    name="ms_item_code"
                    onChange={handleFormInput}
                    value={product.ms_item_code}
                    id="ms_item_code"
                    type="text"
                    placeholder="MS Item code"
                    required={productStatus === 'active'}

                  />

                </div>
                <div className="flex-1">
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
                    onChange={({ value }) => {
                      const { name } = product_categories.find((item) => item.id === value);
                      setSelectTool(name);
                    }}
                    defaultValue={{ value: product.product_category?.id, label: product.product_category?.name }}
                    name="product_category_id"
                    id="product_category_id"
                    options={product_categories.map((cat) => (
                      { value: cat.id, label: cat.name }
                    ))}
                  />

                </div>
                <div className="flex-1">
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

              {
                selectTool === 'racquet'

                  ? selectSport == 'Tennis' ? (
                    <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
                      <legend className="font-bold">Racquets</legend>

                      <div className="flex gap-4 ">
                        <div className="flex-1">
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

                        <div className="flex-1">
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

                        <div className="flex-1">
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
                      <div className="flex gap-4 flex-col md:flex-row my-1">
                        <div className="flex-1">
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
                      </div>

                      <div className="form-row my-1">

                        <div className="flex-1">
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
                        <div className="flex-1">
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
                      <div className="justify-end flex mt-2 ">
                        <button
                          type="button"
                          className="flex w-max p-1"
                          onClick={() => {
                            setProductInventories([...productInventories, {
                              quantity: '', size: '', sku: '', locations: [],
                            }]);
                          }}
                        >
                          <FaPlus />
                        </button>

                      </div>
                      <div className="gap-3">
                        <div className="flex justify-between px-0">
                          <label htmlFor="shoe_size" className="text-gray-500 flex-1 font-semibold text-sm">
                            Grip Size
                          </label>
                          <label htmlFor="qty" className="text-gray-500 flex-1 font-semibold text-sm">
                            Quantity
                          </label>
                          <label htmlFor="sku" className="text-gray-500 flex-1 font-semibold text-sm">
                            SKU
                          </label>
                          <label htmlFor="location" className="text-gray-500 flex-1 font-semibold text-sm">
                            Location
                          </label>

                        </div>

                        {productInventories.map(({
                          locations, size, quantity, sku, _destroy,
                        }, index) => {
                          { if (!_destroy) {
                            return (

                              <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                                <div className="flex-1">
                                  <Select
                                    defaultValue={{ value: size, label: size }}
                                    name="sizes"
                                    id="sizes"
                                    onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                                    options={gripSizes}
                                    size={1}
                                  />
                                </div>

                                <div className="flex-1">
                                  <input
                                    value={quantity}
                                    name="quantity"
                                    id="qty"
                                    onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                                  />

                                </div>
                                <div className="flex-1">
                                  <input
                                    value={sku}
                                    name="sku"
                                    id="sku"
                                    onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                                  />

                                </div>
                                <div className="flex-1">

                                  <Select
                                    value={locations?.map((location) => ({ value: location, label: location }))}
                                    name="location"
                                    placeholder="Select Product LOcations"
                                    id="location"
                                    onChange={(selectedOption) => {
                                      const value = selectedOption.map((option) => option.value);
                                      addToProductInventory({ key: 'locations', value }, index);
                                    }}
                                    options={productLocations}
                                    isMulti
                                    size={1}
                                  />
                                </div>

                                <span
                                  className=""
                                  onClick={() => {
                                    handleInventoryRowDel(index);
                                  }}
                                >
                                  <FaMinus />

                                </span>

                              </div>

                            );
                          } }
                        })}

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

                            <div className="flex-1">
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
                            <div className="flex-1">
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

                            <div className="flex-1">
                              <label htmlFor="balance_type" className="text-gray-500 font-semibold text-sm"> Length (mm)</label>
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
                            <div className="flex-1">
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

                            <div className="flex-1">
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
                            <div className="flex-1">
                              <label htmlFor="" className="text-gray-500 font-semibold text-sm">Stiffness (kg) </label>
                              <input
                                name="stiffness"
                                id="stiffness"
                                type="text"
                                placeholder="tension"
                              />

                            </div>

                          </div>
                          <div className="justify-end flex mt-2 ">
                            <button
                              type="button"
                              className="flex w-max p-1"
                              onClick={() => {
                                setProductInventories([...productInventories, {
                                  quantity: '', size: '', sku: '', locations: [],
                                }]);
                              }}
                            >
                              <FaPlus />
                            </button>

                          </div>
                          <div className="gap-3">
                            <div className="flex justify-between px-0">
                              <label htmlFor="shoe_size" className="text-gray-500 flex-1 font-semibold text-sm">
                                Grip Size
                              </label>
                              <label htmlFor="qty" className="text-gray-500 flex-1 font-semibold text-sm">
                                Quantity
                              </label>
                              <label htmlFor="sku" className="text-gray-500 flex-1 font-semibold text-sm">
                                SKU
                              </label>
                              <label htmlFor="location" className="text-gray-500 flex-1 font-semibold text-sm">
                                Location
                              </label>

                            </div>

                            {productInventories.map(({
                              locations, size, quantity, sku, _destroy,
                            }, index) => {
                              { if (!_destroy) {
                                return (

                                  <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                                    <div className="flex-1">
                                      <Select
                                        defaultValue={{ value: size, label: size }}
                                        name="sizes"
                                        id="sizes"
                                        onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                                        options={gripSizes}
                                        size={1}
                                      />
                                    </div>

                                    <div className="flex-1">
                                      <input
                                        value={quantity}
                                        name="quantity"
                                        id="qty"
                                        onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                                      />

                                    </div>
                                    <div className="flex-1">
                                      <input
                                        value={sku}
                                        name="sku"
                                        id="sku"
                                        onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                                      />

                                    </div>
                                    <div className="flex-1">

                                      <Select
                                        value={locations?.map((location) => ({ value: location, label: location }))}
                                        name="location"
                                        id="location"
                                        onChange={(selectedOption) => {
                                          const value = selectedOption.map((option) => option.value);
                                          addToProductInventory({ key: 'locations', value }, index);
                                        }}
                                        options={productLocations}
                                        size={1}
                                      />
                                    </div>

                                    <span
                                      className=""
                                      onClick={() => {
                                        // const newSizes = productInventories.filter((item, i) =>  i != index)
                                        // setProductInventories(newSizes)
                                        handleInventoryRowDel(index);
                                      }}
                                    >
                                      <FaMinus />

                                    </span>

                                  </div>

                                );
                              } }
                            })}

                          </div>
                        </fieldset>

                      </>
                    )

                      : (
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

                              <div className="flex-1">
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
                              <div className="flex-1">
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

                              <div className="flex-1">
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
                              <div className="flex-1">
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
                            <div className="justify-end flex mt-2 ">
                              <button
                                type="button"
                                className="flex w-max p-1"
                                onClick={() => {
                                  setProductInventories([...productInventories, {
                                    quantity: '', size: '', sku: '', locations: [],
                                  }]);
                                }}
                              >
                                <FaPlus />
                              </button>

                            </div>
                            <div className="gap-3">
                              <div className="flex justify-between px-0">
                                <label htmlFor="shoe_size" className="text-gray-500 flex-1 font-semibold text-sm">
                                  Grip Size
                                </label>
                                <label htmlFor="qty" className="text-gray-500 flex-1 font-semibold text-sm">
                                  Quantity
                                </label>
                                <label htmlFor="sku" className="text-gray-500 flex-1 font-semibold text-sm">
                                  SKU
                                </label>
                                <label htmlFor="location" className="text-gray-500 flex-1 font-semibold text-sm">
                                  Location
                                </label>

                              </div>

                              {productInventories.map(({
                                locations, size, quantity, sku, _destroy,
                              }, index) => {
                                { if (!_destroy) {
                                  return (

                                    <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                                      <div className="flex-1">
                                        <Select
                                          defaultValue={{ value: size, label: size }}
                                          name="sizes"
                                          id="sizes"
                                          onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                                          options={gripSizes}
                                          size={1}
                                        />
                                      </div>

                                      <div className="flex-1">
                                        <input
                                          value={quantity}
                                          name="quantity"
                                          id="qty"
                                          onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                                        />

                                      </div>
                                      <div className="flex-1">
                                        <input
                                          value={sku}
                                          name="sku"
                                          id="sku"
                                          onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                                        />

                                      </div>
                                      <div className="flex-1">

                                        <Select
                                          value={locations?.map((location) => ({ value: location, label: location }))}
                                          name="location"
                                          id="location"
                                          onChange={(selectedOption) => {
                                            const value = selectedOption.map((option) => option.value);
                                            addToProductInventory({ key: 'locations', value }, index);
                                          }}
                                          options={productLocations}
                                          size={1}
                                        />
                                      </div>

                                      <span
                                        className=""
                                        onClick={() => {
                                          // const newSizes = productInventories.filter((item, i) =>  i != index)
                                          // setProductInventories(newSizes)
                                          handleInventoryRowDel(index);
                                        }}
                                      >
                                        <FaMinus />

                                      </span>

                                    </div>

                                  );
                                } }
                              })}

                            </div>
                          </fieldset>

                        </>
                      )

                  : selectTool === 'shoe' ? (
                    <fieldset className="p-3 bg-gray-100 border-gray-light rounded my-5">
                      <legend className="font-bold">Shoes</legend>
                      <div className="justify-end flex mt-2 ">
                        <button
                          type="button"
                          className="flex w-max p-1"
                          onClick={() => {
                            setProductInventories([...productInventories, {
                              quantity: '', size: '', sku: '', locations: [],
                            }]);
                          }}
                        >
                          <FaPlus />
                        </button>

                      </div>
                      <div className="gap-3">
                        <div className="flex justify-between px-0">
                          <label htmlFor="shoe_size" className="text-gray-500 flex-1 font-semibold text-sm">
                            Shoe Size
                          </label>
                          <label htmlFor="qty" className="text-gray-500 flex-1 font-semibold text-sm">
                            Quantity
                          </label>
                          <label htmlFor="sku" className="text-gray-500 flex-1 font-semibold text-sm">
                            SKU
                          </label>
                          <label htmlFor="location" className="text-gray-500 flex-1 font-semibold text-sm">
                            Location
                          </label>

                        </div>

                        {productInventories.map(({
                          locations, size, quantity, sku, _destroy,
                        }, index) => {
                          { if (!_destroy) {
                            return (

                              <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                                <div className="flex-1">
                                  <Select
                                    defaultValue={{ value: size, label: size }}
                                    name="sizes"
                                    id="sizes"
                                    onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                                    options={shoeSizes}
                                    size={1}
                                  />
                                </div>

                                <div className="flex-1">
                                  <input
                                    value={quantity}
                                    name="quantity"
                                    id="qty"
                                    onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                                  />

                                </div>
                                <div className="flex-1">
                                  <input
                                    value={sku}
                                    name="sku"
                                    id="sku"
                                    onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                                  />

                                </div>
                                <div className="flex-1">

                                  <Select
                                    value={locations?.map((location) => ({ value: location, label: location }))}
                                    name="locations"
                                    id="location"
                                    onChange={(selectedOption) => {
                                      const value = selectedOption.map((option) => option.value);
                                      addToProductInventory({ key: 'locations', value }, index);
                                    }}
                                    options={productLocations}
                                    isMulti
                                    size={1}
                                  />
                                </div>

                                <span
                                  className=""
                                  onClick={() => {
                                    handleInventoryRowDel(index);
                                  }}
                                >
                                  <FaMinus />

                                </span>

                              </div>

                            );
                          } }
                        })}

                      </div>
                    </fieldset>
                  )
                    : selectTool === 'apparel' ? (
                      <fieldset className="p-3 bg-gray-100 my-5 border-gray-light rounded">
                        <legend className="font-bold">Apparels</legend>
                        <div className="justify-end flex mt-2 ">
                          <button
                            type="button"
                            className="flex w-max p-1"
                            onClick={() => {
                              setProductInventories([...productInventories, {
                                quantity: '', size: '', sku: '', locations: [],
                              }]);
                            }}
                          >
                            <FaPlus />
                          </button>

                        </div>
                        <div className="">
                          <div className="flex justify-between px-0">
                            <label htmlFor="apparel_size" className="text-gray-500 flex-1 font-semibold text-sm">
                              Apparel Size
                            </label>
                            <label htmlFor="qty" className="text-gray-500 flex-1 font-semibold text-sm">
                              Quantity
                            </label>
                            <label htmlFor="sku" className="text-gray-500 flex-1 font-semibold text-sm">
                              SKU
                            </label>
                            <label htmlFor="location" className="text-gray-500 flex-1 font-semibold text-sm">
                              Location
                            </label>

                          </div>

                          {productInventories.map(({
                            locations, size, quantity, sku, _destroy,
                          }, index) => {
                            { if (!_destroy) {
                              return (

                                <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                                  <div className="flex-1">
                                    <Select
                                      defaultValue={{ value: size, label: size }}
                                      name="sizes"
                                      id="apparel_size"
                                      onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                                      options={clothSizes}
                                      placeholder="Apparel Size"
                                      size={1}
                                    />
                                  </div>

                                  <div className="flex-1">
                                    <input
                                      value={quantity}
                                      name="quantity"
                                      placeholder="Quantity"

                                      id="qty"
                                      onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                                    />

                                  </div>
                                  <div className="flex-1">
                                    <input
                                      value={sku}
                                      name="sku"
                                      id="sku"
                                      onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                                      placeholder="SKU"
                                    />

                                  </div>
                                  <div className="flex-1">
                                    <Select
                                      defaultValue={locations?.map((location) => ({ value: location, label: location }))}
                                      name="location"
                                      id="location"
                                      onChange={(selectedOption) => {
                                        const value = selectedOption.map((option) => option.value);
                                        addToProductInventory({ key: 'locations', value }, index);
                                      }}
                                      options={productLocations}
                                      placeholder="Add product Location"
                                      isMulti
                                      size={1}
                                    />
                                  </div>

                                  <span
                                    className=""
                                    onClick={() => {
                                      handleInventoryRowDel(index);
                                    }}
                                  >
                                    <FaMinus />

                                  </span>

                                </div>
                              );
                            } }
                          })}

                        </div>

                      </fieldset>
                    )
                      : ''
}

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
