import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdReportGmailerrorred } from 'react-icons/md';
import { FaCheckCircle, FaMinus, FaPlus } from 'react-icons/fa';

import 'trix';
import 'trix/dist/trix.css';
import { getProductCategories, getSportCategories } from '../../redux/actions/product_category';
import getLevels from '../../redux/actions/misc';
import getGenders from '../../redux/actions/gender';
import {
  clothSizes, colors, composition, gripSizes, headShapes, headSizes, length, locations as states, playType, recommendedGrip, shoeSizes, strung,
} from '../../constants/variance';
import Button from '../buttons/Button';
import FormInput from '../formInput/FormInput';

const ProductForm = ({ onSubmit, product }) => {
  const editorRef = useRef();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formdata, setFormdata] = useState({});
  const { product_categories, sport_categories, updater } = useSelector((state) => state.product_categories);

  const levels = useSelector((state) => state.level.levels);
  const genders = useSelector((state) => state.gender.genders);
  const {
    loading, status, message,
  } = useSelector((state) => state.product);
  const formRef = useRef(null);
  const [selectSport, setSelectedSport] = useState(null);
  const [productStatus, setProductStatus] = useState('active');
  const [selectTool, setSelectTool] = useState(product_categories[0]?.name);

  const [productInventories, setProductInventories] = useState([{
    size: '', quantity: '', sku: '', locations: [],
  }]);

  useEffect(() => {
    const trixEditor = editorRef.current;

    const handleTrixText = ({ target: { innerHTML } }) => {
      setFormdata((prev) => ({ ...prev, description_body: innerHTML }));
    };
    trixEditor.addEventListener('trix-change', handleTrixText);

    return () => {
      trixEditor.removeEventListener('trix-change', handleTrixText);
    };
  }, []);

  useEffect(() => {
    if (product) {
      setFormdata({
        ...product, product_category_id: product?.product_category?.id, level_id: product.level?.id, gender_id: product?.gender?.id, sport_category_id: product?.sport_category?.id,
      });
      setProductInventories(product?.product_inventories ?? productInventories);
      editorRef.current.editor.loadHTML(product.description_body);
    }
  }, [product?.product_inventories, product]);

  const [productName, setProductName] = useState('');

  const addToProductInventory = ({ key, value }, index) => {
    const updateProductInventories = productInventories?.map((item, i) => (i === index ? {
      ...item,
      [key]: value,
    }
      : item));

    setProductInventories(updateProductInventories);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getSportCategories());
    dispatch(getLevels());
    dispatch(getGenders());
  }, [updater]);

  useEffect(() => {
    setSelectedSport(sport_categories[1]);
  }, [sport_categories]);

  useEffect(() => {
    setSelectTool(product_categories[0]?.name);
  }, [product_categories]);

  const handleImageChange = ({ target: { files } }) => {
    const extractedfiles = Array.from(files);

    const urls = extractedfiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(urls);
  };

  const handleCalcTotal = () => {
    console.log('GEnerating');
    let total_quantity = 0;

    productInventories.forEach((item) => {
      total_quantity = item.quantity + total_quantity;
    });
    setFormdata({ ...formdata, product_quantity: total_quantity });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((product && formdata.photo_urls) || (imagePreviews.length > 0 || e.target.image.value)) {
      const formData = new FormData();

      Object.entries(formdata).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (key === 'colours') {
              formData.append(`product[${key}][]`, item);
            } else {
              formData.append(`product[${key}][${index}]`, item);
            }
          });
        } else {
          formData.append(`product[${key}]`, value);
        }
      });

      productInventories.forEach(({
        quantity, size, price, sku, locations, id,
      }, i) => {
        (quantity || e.target.quantity) && formData.append(`product[product_inventories_attributes][${i}][quantity]`, quantity ?? e.target.quantity.value);
        size && formData.append(`product[product_inventories_attributes][${i}][size]`, size);
        sku && formData.append(`product[product_inventories_attributes][${i}][sku]`, sku);
        id && formData.append(`product[product_inventories_attributes][${i}][id]`, id);
        locations && locations.map((item) => (
          formData.append(`product[product_inventories_attributes][${i}][locations][]`, item)
        ));
        formData.append(`product[product_inventories_attributes][${i}][price]`, price || (e.target.price.value ?? ''));
      });

      Array.from(e.target.photo.files).forEach((file, index) => {
        formData.append(`product[photos][${index}]`, file);
      });

      const data = Object.fromEntries(formData);
      console.log(data);

      onSubmit(formData).then((res) => {
        console.log(res, '[Form Submitted]: Product form submitted');

        const timeOutOp = setTimeout(() => {
          if (!product) {
            setFormdata(null);
          }
          dispatch(resetProduct());
        }, 5000);
      }).catch((err) => console.log(err));
    } else {
      alert('No image: Add a product image');
    }
  };

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

      <form onSubmit={handleSubmit} ref={formRef}>

        <div className="p-3 flex">
          {selectSport && (
            <FormInput
              className="mr-auto max-w-80 w-full"
              label="Sport Category"
              type="select"

              onChange={({ value }) => {
                console.log(value, sport_categories);
                setFormdata({ ...formdata, sport_category_id: value });
                const cat = sport_categories.find((item) => item.id == value);
                setSelectedSport(cat);
              }}
              placeholder="sport category"
              value={{ value: formdata.sport_category_id, label: sport_categories.find((sport_categories) => sport_categories.id === formdata.sport_category_id)?.name ?? 'Select Sports' }}
              required
              name="sport_category_id"
              id="sport_category_id"
              options={sport_categories.map((cat) => ({ value: cat.id, label: cat.name }))}
            />
          )}

          <FormInput
            className="ml-auto w-48 bg-green-500"
            label="ms product code"
            productStatus="active"
            type="text"
            name="ms_code"
            id="ms_code"
            value={formdata?.ms_code}
            onChange={({ target: { value } }) => setFormdata({ ...formdata, ms_code: value })}
            required={productStatus === 'active'}
          />

        </div>

        <div className="p-3 flex justify-between">
          <FormInput
            className="max-w-80 w-full"
            label="Status"
            type="select"
            value={{ value: formdata?.status, label: formdata?.status ?? 'Select status' }}
            onChange={(selectedOption) => setFormdata({ ...formdata, status: selectedOption.value })}
            defaultValue={{ value: 'active', label: 'active' }}
            required
            name="status"
            id="status"
            options={[{ value: 'inactive', label: 'inactive' }, { value: 'active', label: 'active' }]}
          />

          <FormInput
            className=" w-48"
            disabled
            label="Total Quantity"
            name="product_quantity"
            value={formdata?.product_quantity}
            onChange={(e) => setFormdata({ ...formdata, product_quantity: e.target.value })}

            productStatus="active"
            type="number"
          />

        </div>
        <div className="bg-white p-4 rounded shadow">

          <div className="flex items-center justify-between">
            <Button
              type="button"
              onClick={() => setFormdata({ ...formdata, discount: formdata.discount === 'active_discount' ? 'inactive_discount' : 'active_discount' })}
              className={`px-4 py-2 rounded font-medium transition-all ${
                formdata.discount === 'active_discount'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {formdata.discount === 'active_discount' ? 'Cancel Discount' : 'Apply Discount'}
            </Button>
          </div>

          {/* Discount amount (only shows if active) */}
          {formdata.discount === 'active_discount' && (
          <FormInput
            label="Discount (%)"
            value={formdata?.discount_percentage}

            type="number"
            name="discount_percentage"

            onChange={({ target: { value } }) => setFormdata({ ...formdata, discount_percentage: value })}
            placeholder="e.g. 20"
            className="w-full px-3 mt-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          )}

        </div>

        <div className=" bg-white p-4 rounded shadow">
          <div className="flex justify-between gap-3 text-sm my-1">
            <FormInput
              className="flex-1"
              name="name"
              label="Name"
              type="text"
              id="name"
              value={formdata.name || ''}
              onChange={(e) => setFormdata({ ...formdata, name: e.target.value.toLowerCase() })}
              placeholder="product name"
              required
            />

            <FormInput
              className="flex-1"
              label="Price: NGN"
              productStatus="active"
              name="price"
              id="price"
              type="number"
              placeholder="price"
              value={formdata.price || ''}
              onChange={({ target: { value } }) => setFormdata({ ...formdata, price: value })}
              required={productStatus === 'active'}
            />

          </div>

          <div className="flex justify-between gap-3 text-sm my-1">

            <FormInput
              className="flex-1"
              label="MS Item Code"
              productStatus="active"
              value={formdata?.ms_item_code}
              name="ms_item_code"
              placeholder="Item code"
              onChange={({ target: { value } }) => setFormdata({ ...formdata, ms_item_code: value.toLowerCase() })}

              required={productStatus === 'active'}
            />

            <FormInput
              className="flex-1"
              label="Colour"
              value={formdata?.colours?.map((color) => ({ value: color, label: color }))}

              type="select"
              name="product_colour"
              placeholder="colour"
              id="colour"
              options={colors}
              onChange={(selectedOption) => setFormdata({ ...formdata, colours: selectedOption.map((option) => option.value) ?? [] })}

              isMulti
            />
          </div>

          <div className="flex justify-between gap-3 text-sm my-1 ">

            <FormInput
              className="flex-1"
              label="Select product category"
              value={{
                value: formdata.product_category_id,
                label:
            product_categories.find(
              (item) => item.id === formdata.product_category_id,
            )?.name || 'Select category',
              }}

              type="select"
              placeholder="product category"
              onChange={({ value }) => {
                const { name, id } = product_categories.find((item) => item.id == value);
                console.log(name, id, value);
                setSelectTool(name);
                setFormdata({ ...formdata, product_category_id: value });
              }}
              required
              name="product_category_id"
              id="product_category_id"
              options={product_categories.map((cat) => (
                { value: cat.id, label: cat.name }
              ))}
            />

            <FormInput
              className="flex-1"
              label="Gender"
              type="select"
              placeholder="gender"
              name="gender_id"
              value={{ value: formdata?.gender_id, label: genders?.find((gender) => gender.id === formdata?.gender_id)?.name || 'Select Gender' }}
              onChange={({ value }) => setFormdata({ ...formdata, gender_id: value })}
              options={genders.map((gender) => ({
                value: gender.id, label: gender.name,
              }))}
            />

          </div>

          {selectTool == 'racquet'

            ? selectSport?.name == 'Tennis' ? (
              <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
                <legend className="font-bold">Racquets</legend>

                <div className="flex gap-4 ">
                  <FormInput
                    className="flex-1"
                    label="Professionalism"
                    type="select"
                    placeholder="professionalism"
                    id="level_id"
                    name="level_id"
                    value={{ value: formdata?.level_id, label: levels.find((level) => level.id === formdata.level_id)?.stage || 'Select Level' }}
                    onChange={({ value }) => {
                      console.log('first', value);
                      setFormdata({ ...formdata, level_id: value });
                    }}
                    options={levels.map((level) => ({
                      value: level.id,
                      label: level.stage,

                    }))}
                  />
                  <FormInput
                    className="flex-1"
                    label="strung/unstrung"
                    value={{ value: formdata?.strung, label: strung.find((s) => s.value === formdata.strung)?.value ?? 'Select String Type' }}

                    type="select"
                    onChange={({ value }) => {
                      console.log(value);
                      setFormdata({ ...formdata, strung: value });
                    }}
                    name="strung"
                    id="strung"
                    options={strung}
                  />

                </div>

                <div className="flex gap-4 flex-col md:flex-row my-1">

                  <FormInput
                    label="Head size: cm"
                    name="head_size"
                    id="head_size"
                    type="select"
                    value={{ value: formdata?.head_size, label: headSizes.find((size) => size.value === formdata.head_size)?.value ?? 'Select Head Size' }}
                    onChange={({ value, name }) => setFormdata({ ...formdata, head_size: value })}

                    options={headSizes}
                    placeholder="headsize"
                  />

                  <FormInput
                    className="flex-1"
                    label="Composition"
                    name="composition"
                    type="select"
                    id="composition"
                    value={{ value: formdata?.composition, label: composition.find((com) => com.value === formdata.composition)?.label ?? 'Select Composition' }}

                    options={composition}
                    onChange={({ value }) => setFormdata({ ...formdata, composition: value })}
                  />

                </div>
                <div className="flex gap-4 flex-col md:flex-row my-1">

                  <FormInput
                    className="flex-1"
                    label="Length (mm)"
                    type="select"
                    name="length"
                    options={length}
                    placeholder="length"
                    onChange={({ value }) => setFormdata({ ...formdata, length: value })}
                  />

                  <FormInput
                    className="flex-1"
                    label="Weight (g)"
                    name="weight"
                    id="weight"
                    type="text"
                    value={formdata?.weight}
                    onChange={(e) => setFormdata({ ...formdata, weight: e.target.value })}
                    placeholder="weight"
                  />

                </div>

                <div className="form-row my-1">

                  <FormInput
                    className="flex-1"
                    label="tension (kg)"
                    name="tension"
                    id="tension"
                    type="text"
                    value={formdata?.tension}

                    placeholder="tension"
                    onChange={(e) => setFormdata({ ...formdata, tension: e.target.value })}
                  />

                  <FormInput
                    className="flex-1"
                    label="Stiffness (kg)"
                    name="stiffness"
                    id="stiffness"
                    type="text"
                    value={formdata?.stiffness}

                    placeholder="stiffness"

                    onChange={(e) => setFormdata({ ...formdata, stiffness: e.target.value })}

                  />

                </div>
                <div className="justify-end flex my-1 bg-gray-200">
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
                    <label htmlFor="grip_size" className="text-gray-500 flex-1 font-semibold text-sm">
                      Racquet Grip Sizes
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

                  {productInventories?.map(({
                    size, quantity, sku, locations,
                  }, index) => (
                    <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                      <FormInput
                        type="select"
                        className="flex-1"
                        value={{ value: size, label: gripSizes.find((g) => g.value === size)?.value ?? 'Select Size' }}
                        name="sizes"
                        placeholder="Grip Sizes"
                        id="grip_size"
                        onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                        options={gripSizes}
                        size={1}
                      />

                      <FormInput
                        className="flex-1"
                        value={quantity}
                        name="quantity"
                        placeholder="Quantity"

                        id="qty"
                        onBlur={handleCalcTotal}
                        onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                      />

                      <FormInput
                        className="flex-1"
                        value={sku}
                        name="sku"
                        id="sku"
                        onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                        placeholder="SKU"
                      />

                      <FormInput
                        className="flex-1"
                        type="select"
                        name="locations"
                        id="location"
                        value={locations.map((l) => ({ value: l, label: states.find((state) => state.value === l).label }))}
                        onChange={(selectedOption) => {
                          const value = selectedOption.map((option) => option.value);

                          console.log(selectedOption, index, locations, value);

                          addToProductInventory({ key: 'locations', value }, index);
                        }}
                        options={states}
                        placeholder="Add Product Location"
                        isMulti
                        size={1}
                      />

                      <span
                        className=""
                        onClick={() => {
                          handleInventoryRowDel(index);
                        }}
                      >
                        <FaMinus />

                      </span>

                    </div>
                  ))}

                </div>
              </fieldset>
            )
              : selectSport?.name == 'Padel' ? (
                <>

                  <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
                    <legend className="font-bold">Padel</legend>

                    <div className="flex gap-4 ">
                      <FormInput
                        className="bg-r w-full"
                        label="Type of Player"
                        type="select"
                        placeholder="Player Typology"
                        id="player_type"
                        name="player_type"

                        onChange={({ value }) => setFormdata({ ...formdata, player_type: value })}
                        value={{ value: formdata.player_type, label: playType.find((p) => p.value === formdata.player_type)?.label ?? 'Select PlayType' }}
                        options={playType.map((type) => ({
                          value: type.value,
                          label: type.label,
                        }))}
                      />

                    </div>

                    <div className="flex gap-4 flex-col md:flex-row my-1">

                      <FormInput
                        className="flex-1"
                        label="Head shape"
                        name="head_shape"
                        type="select"
                        id="head_shape"
                        value={{ value: formdata.head_shape, label: headShapes.find((h) => h.value === formdata.head_shape)?.label ?? 'Select Head shape' }}

                        onChange={({ value }) => setFormdata({ ...formdata, head_shape: value })}
                        options={headShapes}
                        placeholder="head Shape"
                      />

                      <FormInput
                        className="flex-1"
                        label="Recommended Grip"
                        type="select"
                        value={{ value: formdata?.recommended_grip, label: recommendedGrip.find((r) => r.value === formdata?.recommended_grip)?.label ?? 'Select Grip' }}
                        onChange={({ value }) => {
                          setFormdata({ ...formdata, recommended_grip: value });
                        }}
                        name="recommended_grip"
                        id="recommended_grip"
                        options={recommendedGrip}
                      />

                    </div>
                    <div className="flex gap-4 flex-col md:flex-row my-1">

                      <FormInput
                        className="flex-1"
                        label="Length (mm)"
                        name="length"
                        id="length"
                        value={formdata.length || ''}
                        onChange={({ target: { value } }) => setFormdata({ ...formdata, length: value })}
                        type="text"
                        placeholder="Length in MM"
                      />

                      <FormInput
                        className="flex-1"
                        label="Composition"
                        name="composition"
                        onChange={({ value }) => setFormdata({ ...formdata, length: value })}
                        value={{ value: formdata?.composition, label: composition.find((c) => c.value === formdata.composition)?.label ?? 'Select Coposition' }}
                        id="composition"
                        options={composition}
                        type="select"
                      />

                    </div>

                    <div className="form-row my-1">
                      <FormInput
                        className="flex-1"
                        label="Weight (g)"
                        name="weight"
                        id="weight"
                        type="text"
                        placeholder="weight"
                        onChange={({ target: { value } }) => setFormdata({ ...formdata, weight: value })}
                      />

                      <FormInput
                        className="flex-1"
                        label="Thickness (g)"
                        name="thickness"
                        id="thickness"
                        type="text"
                        placeholder="thickness"
                        onChange={({ target: { value } }) => setFormdata({ ...formdata, thickness: value })}
                      />

                      <FormInput
                        className="flex-1"
                        label="Stiffness (kg) "

                        name="stiffness"
                        id="stiffness"
                        onChange={({ target: { value } }) => setFormdata({ ...formdata, stiffness: value })}

                        type="text"
                        placeholder="stiffness"
                      />

                    </div>
                    <div className="justify-end flex my-0 ">
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
                          Padel Grip Sizes
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
                        size, quantity, sku, locations,
                      }, index) => (

                        <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                          <FormInput
                            type="select"
                            className="flex-1"
                            value={{ value: size, label: gripSizes.find((g) => g.value === size)?.value ?? 'Select Size' }}
                            name="sizes"
                            placeholder="Padel Sizes"
                            id="padel_size"
                            onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                            options={gripSizes}
                            size={1}
                          />

                          <FormInput
                            className="flex-1"
                            value={quantity}
                            name="quantity"
                            placeholder="Quantity"

                            id="qty"
                            onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                          />

                          <FormInput
                            className="flex-1"
                            value={sku}
                            name="sku"
                            id="sku"
                            onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                            placeholder="SKU"
                          />

                          <FormInput
                            className="flex-1"
                            type="select"
                            name="locations"
                            id="location"
                            value={locations.map((l) => ({ value: l, label: states.find((state) => state.value === l).label }))}
                            onChange={(selectedOption) => {
                              const value = selectedOption.map((option) => option.value);

                              console.log(selectedOption, index, locations, value);

                              addToProductInventory({ key: 'locations', value }, index);
                            }}
                            options={states}
                            placeholder="Add Product Location"
                            isMulti
                            size={1}
                          />

                          <span
                            className=""
                            onClick={() => {
                              handleInventoryRowDel(index);
                            }}
                          >
                            <FaMinus />

                          </span>

                        </div>

                      ))}

                    </div>
                  </fieldset>

                </>
              )
                : (
                  <>
                    <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
                      <legend className="font-bold">Badminton</legend>

                      <div className="flex gap-4 ">
                        <FormInput
                          className="bg-r w-full"
                          label="Type of Player"
                          type="select"
                          placeholder="Player Typology"
                          id="player_type"
                          name="player_type"

                          onChange={({ value }) => setFormdata({ ...formdata, player_type: value })}
                          value={{ value: formdata.player_type, label: playType.find((p) => p.value === formdata.player_type)?.label ?? 'Select PlayType' }}
                          options={playType.map((type) => ({
                            value: type.value,
                            label: type.label,
                          }))}
                        />

                      </div>

                      <div className="flex gap-4 flex-col md:flex-row my-1">
                        <FormInput
                          className="bg-r w-full"
                          label=" Length (mm) "
                          type="select"
                          name="length"
                          id="length"
                          options={length}
                          placeholder="lenght"
                          onChange={({ value }) => setFormdata({ ...formdata, length: value })}
                        />

                        <div className="flex-1">
                          <FormInput
                            className="text-gray-500 font-semibold text-sm"
                            label="Composition"
                            type="select"
                            name="composition"
                            id="composition"
                            options={composition}
                            value={{ value: formdata.composition, label: composition.find((c) => c.value === formdata.composition)?.label ?? 'Select composition' }}
                            onChange={({ value }) => setFormdata({ ...formdata, composition: value })}
                          />

                        </div>

                      </div>

                      <div className="form-row my-1">
                        <FormInput
                          className="flex-1"
                          label="Weight (g)"
                          name="weight"
                          id="weight"
                          type="text"
                          placeholder="Weight"
                          onChange={(e) => setFormdata({ ...formdata, weight: e.target.value })}

                        />

                        <FormInput
                          className="flex-1"
                          label="thickness (mm)"
                          name="thickness"
                          id="thickness"
                          type="text"
                          placeholder="thickness"
                          onChange={(e) => setFormdata({ ...formdata, thickness: e.target.value })}
                        />

                        <FormInput
                          className="flex-1"
                          label="Stiffness (kg)"
                          value={product?.stiffness}
                          onChange={(e) => formdata({ ...formdata, stiffness: e.target.value })}
                          name="stiffness"
                          id="stiffness"
                          type="text"
                          placeholder="tension"
                        />

                      </div>
                      <div className="">
                        <div className="flex justify-between px-0">
                          <label htmlFor="badminton_size" className="text-gray-500 flex-1 font-semibold text-sm">
                            Sizes
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
                        <div className="justify-end flex my-0 ">
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

                        {productInventories.map(({
                          size, quantity, sku, locations,
                        }, index) => (

                          <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                            <FormInput
                              type="select"
                              className="flex-1"
                              value={{ value: size, label: gripSizes.find((g) => g.value === size)?.value ?? 'Select Size' }}
                              name="sizes"
                              placeholder="Padel Sizes"
                              id="padel_size"
                              onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                              options={gripSizes}
                              size={1}
                            />

                            <FormInput
                              className="flex-1"
                              value={quantity}
                              name="quantity"
                              placeholder="Quantity"

                              id="qty"
                              onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                            />

                            <FormInput
                              className="flex-1"
                              value={sku}
                              name="sku"
                              id="sku"
                              onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                              placeholder="SKU"
                            />

                            <FormInput
                              className="flex-1"
                              type="select"
                              name="locations"
                              id="location"
                              value={locations.map((l) => ({ value: l, label: states.find((state) => state.value === l).label }))}
                              onChange={(selectedOption) => {
                                const value = selectedOption.map((option) => option.value);

                                console.log(selectedOption, index, locations, value);

                                addToProductInventory({ key: 'locations', value }, index);
                              }}
                              options={states}
                              placeholder="Add Product Location"
                              isMulti
                              size={1}
                            />

                            <span
                              className=""
                              onClick={() => {
                                handleInventoryRowDel(index);
                              }}
                            >
                              <FaMinus />

                            </span>

                          </div>
                        ))}

                      </div>

                    </fieldset>

                  </>
                )
            : selectTool == 'shoe' ? (
              <fieldset className="p-3 bg-gray-100 border-gray-light rounded my-5">
                <legend className="font-bold">Shoes</legend>
                <div className="justify-end flex my-0 ">
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
                    size, locations, quantity, sku,
                  }, index) => (

                    <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                      <FormInput
                        type="select"
                        className="flex-1"
                        value={{ value: size, label: gripSizes.find((g) => g.value === size)?.value ?? 'Select Size' }}
                        name="sizes"
                        placeholder="Shoe Sizes"
                        id="size"
                        onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                        options={shoeSizes}
                        size={1}
                      />

                      <FormInput
                        className="flex-1"
                        value={quantity}
                        name="quantity"
                        placeholder="Quantity"

                        id="qty"
                        onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                      />

                      <FormInput
                        className="flex-1"
                        value={sku}
                        name="sku"
                        id="sku"
                        onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                        placeholder="SKU"
                      />

                      <FormInput
                        className="flex-1"
                        type="select"
                        name="locations"
                        id="location"
                        value={locations.map((l) => ({ value: l, label: states.find((state) => state.value === l).label }))}
                        onChange={(selectedOption) => {
                          const value = selectedOption.map((option) => option.value);

                          console.log(selectedOption, index, locations, value);

                          addToProductInventory({ key: 'locations', value }, index);
                        }}
                        options={states}
                        placeholder="Add Product Location"
                        isMulti
                        size={1}
                      />

                      <span
                        className=""
                        onClick={() => {
                          handleInventoryRowDel(index);
                        }}
                      >
                        <FaMinus />

                      </span>

                    </div>

                  ))}

                </div>

              </fieldset>
            )

              : selectTool == 'apparel' ? (
                <fieldset className="p-3 bg-gray-100 my-5 border-gray-light rounded">
                  <legend className="font-bold">Apparels</legend>
                  <div className="justify-end flex my-0 ">
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
                    }, index) => (
                      <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                        <FormInput
                          value={{ value: size, label: size }}

                          type="select"
                          defaultValue=""
                          name="sizes"
                          placeholder="cloth size"
                          id="apparel_size"
                          onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                          options={clothSizes}
                          size={1}
                        />

                        <FormInput
                          value={productInventories[index].quantity}
                          name="quantity"
                          placeholder="Quantity"
                          id="qty"
                          onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                        />

                        <FormInput
                          value={productInventories[index].sku}
                          name="sku"
                          id="sku"
                          onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                          placeholder="SKU"
                        />

                        <FormInput
                          className="flex-1"
                          type="select"
                          value={locations?.map((location) => ({ value: location, label: location }))}

                          name="locations"
                          id="location"
                          onChange={(selectedOption) => {
                            const value = selectedOption.map((option) => option.value);
                            addToProductInventory({ key: 'locations', value }, index);
                          }}
                          options={states}
                          placeholder="Add Product Location"
                          isMulti

                          size={1}
                        />

                        <span
                          className=""
                          onClick={() => {
                            handleInventoryRowDel(index);
                          }}
                        >
                          <FaMinus />

                        </span>

                      </div>
                    ))}

                  </div>

                </fieldset>
              )

                : (
                  <fieldset className="p-3 bg-gray-100 my-5 border-gray-light rounded">
                    <legend className="font-bold">Other</legend>
                    <div className="justify-end flex my-0 ">
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
                        {productName.includes('socks') && (
                        <label htmlFor="apparel_size" className="text-gray-500 flex-1 font-semibold text-sm">
                          Sock Size
                        </label>
                        )}
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
                        size, locations, sku, quantity,
                      }, index) => (

                        <div className="flex-1 flex gap-3 my-2 items-center" key={index}>

                          <FormInput
                            type="select"
                            className="flex-1"
                            value={{ value: size, label: gripSizes.find((g) => g.value === size)?.value ?? 'Select Size' }}
                            name="sizes"
                            placeholder="Shoe Sizes"
                            id="size"
                            onChange={({ value }) => addToProductInventory({ key: 'size', value }, index)}
                            options={clothSizes}
                            size={1}
                          />

                          <FormInput
                            className="flex-1"
                            value={quantity}
                            name="quantity"
                            placeholder="Quantity"

                            id="qty"
                            onChange={(e) => { addToProductInventory({ key: 'quantity', value: e.target.value }, index); }}
                          />

                          <FormInput
                            className="flex-1"
                            value={sku}
                            name="sku"
                            id="sku"
                            onChange={(e) => { addToProductInventory({ key: 'sku', value: e.target.value }, index); }}
                            placeholder="SKU"
                          />

                          <FormInput
                            className="flex-1"
                            type="select"
                            name="locations"
                            id="location"
                            value={locations.map((l) => ({ value: l, label: states.find((state) => state.value === l).label }))}
                            onChange={(selectedOption) => {
                              const value = selectedOption.map((option) => option.value);

                              console.log(selectedOption, index, locations, value);

                              addToProductInventory({ key: 'locations', value }, index);
                            }}
                            options={states}
                            placeholder="Add Product Location"
                            isMulti
                            size={1}
                          />

                          <span
                            className=""
                            onClick={() => {
                              handleInventoryRowDel(index);
                            }}
                          >
                            <FaMinus />

                          </span>

                        </div>

                      ))}

                    </div>

                  </fieldset>
                )}

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
            <input id="trix" type="hidden" name="description_body" onChange={(html) => setFormdata({ ...formdata, description_body: html })} />
            <trix-editor input="trix" ref={editorRef} />

          </div>

          <div className="flex gap-4 my-6">
            {imagePreviews.map((image, index) => (
              <img src={image} alt="" key={index} className="w-40 border border-gray-400 rounded overflow-hidden bg-gray-100 p-3" />
            ))}
          </div>

          <div className="flex gap-4 my-6">
            {formdata?.photo_urls?.map((image, index) => (
              <img src={image} alt="" key={index} className="w-40 border border-gray-400 rounded overflow-hidden bg-gray-100 p-3" />
            ))}
          </div>

          {loading ? (
            <p className="normal">
              {' '}
              {message}
            </p>
          ) : (status == 'success' ? (
            <p className="text-green bg-green-200 rounded my-3 p-5 flex gap-3 items-center">
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

          <button className="btn w-full" type="submit">
            add product
          </button>

        </div>

      </form>

      {/* <Categories /> */}

    </div>
  );
};

export default ProductForm;
