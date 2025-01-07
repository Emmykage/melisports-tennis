import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select, { MultiValue } from 'react-select';
import { MdReportGmailerrorred } from 'react-icons/md';
import { FaCheckCircle, FaMinus, FaPlus } from 'react-icons/fa';
import getLevels from '../../../redux/actions/misc';
import getGenders from '../../../redux/actions/gender';
import { addProduct } from '../../../redux/actions/product';
import { getProductCategories, getSportCategories } from '../../../redux/actions/product_category';
import {
  
  clothSizes, colors, composition, gripSizes, headShapes, headSizes, length, locations, playType, recommendedGrip, shoeSizes, strung,
} from '../../../components/mock/variance';
import { resetProduct } from '../../../redux/product/product';
import 'trix';
import 'trix/dist/trix.css';

const AddProduct = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const { product_categories, sport_categories, updater } = useSelector((state) => state.product_categories);

  const [productColour, setProductColour] = useState([]);
  const levels = useSelector((state) => state.level.levels);
  const genders = useSelector((state) => state.gender.genders);
  const { loading, status, report, message } = useSelector((state) => state.product);
  const formRef = useRef(null);
  const [selectSport, setSelectedSport] = useState(null);
  const [productStatus, setProductStatus] = useState('active');
  const [selectTool, setSelectTool] = useState(product_categories[0]?.name)


  const [productInventories, setProductInventories] = useState([{size: "", quantity: "", sku: "", locations: []}]);


  const addToProductInventory = ({key, value}, index) => {    
    console.log(key,value, index)
    const updateProductInventories = productInventories.map((item, i) => 
            i === index ?   {
              ...item,
              [key]: value           

            }
            : 
            item
          )

    setProductInventories(updateProductInventories)    
}





  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getSportCategories());
    dispatch(getLevels());
    dispatch(getGenders());
  }, [updater]);

  useEffect(() => {
    setSelectedSport(sport_categories[1]);
    console.log("selected spot call")
  }, [sport_categories]);


  useEffect(() => {
    setSelectTool(product_categories[0]?.name);
  }, [product_categories]);

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
      const colorsValues = productColour.map((option) => option.value);
      console.log("view locations", e.target.locations)

     const Valuemap =  Array.from(e.target.locations.value).map(item => item.value)
     console.log(Valuemap)
      const formData = new FormData();

      colorsValues && colorsValues.forEach((item, index) => (
        formData.append('product[colours][]', item)
      ));

      gripSizes && gripSizes.forEach((item, index) => (
        formData.append(`product[grip_sizes][${index}]`, item)

      ));
        productInventories.forEach(({quantity, size, price, sku, locations }, i) => {
         (quantity || e.target.quantity) && formData.append(`product[product_inventories_attributes][${i}][quantity]`, quantity ?? e.target.quantity.value)
         size && formData.append(`product[product_inventories_attributes][${i}][size]`, size)
         sku && formData.append(`product[product_inventories_attributes][${i}][sku]`, sku)
         locations && locations.map((item) => (
          formData.append(`product[product_inventories_attributes][${i}][locations][]`, item)
         )) 
         formData.append(`product[product_inventories_attributes][${i}][price]`, price ? price : e.target.price.value ?? "")

    });
    
      formData.append('product[name]', e.target.name?.value ?? '');
      formData.append('product[product_quantity]', e.target.product_quantity?.value ?? "");
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
      formData.append('product[level_id]', e.target.level_id?.value ?? '');
      formData.append('product[gender_id]', e.target.gender_id?.value ?? '');
      formData.append('product[head_size]', e.target.head_size?.value ?? '');
      formData.append('product[weight]', e.target.weight?.value ?? '');
      formData.append('product[length]', e.target.length?.value ?? '');
      formData.append('product[stiffness]', e.target.stiffness?.value ?? '');
      formData.append('product[composition]', e.target.composition?.value ?? '');
      formData.append('product[description]', e.target.description?.value ?? '');
      formData.append('product[tension]', e.target.tension?.value ?? '');
      formData.append('product[strung]', e.target.strung?.value ?? '');
      formData.append('product[image]', e.target.image?.value ?? '');
      

      formData.append('product[description_body]', e.target.description_body?.value ?? '');

      Array.from(e.target.photo.files).forEach((file, index) => {
        formData.append(`product[photos][${index}]`, file);
      });

      const data = Object.fromEntries(formData);
      console.log(data)

      dispatch(addProduct(formData));
    } else {
      alert('No image: Add a product image');
    }
  };

  const handleValue = (value) => {
    const cat = sport_categories.find((item) => item.id == value);
    setSelectedSport(cat);
  };
  console.log(selectSport)
  return (
    <div className="product-form bg-white admin m-auto w-full">

      <form onSubmit={handleSubmit} ref={formRef}>

        <div className="p-3 flex">
          <div className="ms_code mr-auto max-w-80 w-full">
            <label htmlFor="quantity font-medium text-gray-700">Sport Category</label>

            {selectSport && (
            <Select
              onChange={(selectedOption) => handleValue(selectedOption.value)}
              placeholder="sport category"
              defaultValue={{ value: selectSport?.id, label: selectSport?.name }}
              // defaultValue={{ value: sport_categories[1]?.id, label: sport_categories[1]?.name }}

              required
              name="sport_category_id"
              id="sport_category_id"
              options={sport_categories.map((cat) => ({ value: cat.id, label: cat.name }))}
            />
            )}
          </div>

          <div className="ms_code ml-auto w-48 bg-green-500">
            <label htmlFor="quantity font-medium text-gray-700">
              ms product code
              {productStatus == 'active' && '*'}
            </label>
            <input type="text" name="ms_code" id="ms_code" className="bg-green-200" required={productStatus === 'active'} />
          </div>

        </div>

        <div className="p-3 flex justify-between">
          <div className="max-w-80 w-full">
            <label htmlFor="font-medium text-gray-700">Status</label>
            <Select
              onChange={(selectedOption) => setProductStatus(selectedOption.value)}
              defaultValue={{ value: 'active', label: 'active' }}
              required
              name="status"
              id="status"
              options={[{ value: 'inactive', label: 'inactive' }, { value: 'active', label: 'active' }]}
            />
          </div>

          <div className=" w-48">
            <label htmlFor="product_quantity text-gray-700 font-bold bg-red-400">
              Quantity
              {productStatus == 'active' && '*'}
            </label>
            <input type="number" name="product_quantity" id="product_quantity" required />
          </div>

          {/* </div> */}

        </div>

        <div className=" bg-white p-4 rounded shadow">
          <div className="flex justify-between gap-3 text-sm my-1">
            <div className="flex-1">
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
                name="price"
                id="price"
                type="number"
                placeholder="price"
                required={productStatus === 'active'}
              />

            </div>
          </div>

          <div className="flex justify-between gap-3 text-sm my-1">

            <div className="flex-1">
              <label htmlFor="sku" className="text-gray-500 font-semibold text-sm">
                {' '}
                MS Item Code
                {productStatus == 'active' && '*'}
              </label>
              <input
                name="ms_item_code"
                id="ms_item_code"
                type="text"
                placeholder="Item code"
                required={productStatus === 'active'}
              />

            </div>
            <div className="flex-1">
              <label htmlFor="colour" className="text-gray-500 font-semibold text-sm">
                Colour
              </label>
              <Select
                name="product_colour"
                placeholder="colour"
                id="colour"
                options={colors}
                onChange={(selectedOption) => setProductColour(selectedOption)}

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
                onChange={({value}) => {
                  const {name} = product_categories.find(item => item.id == value)
                  setSelectTool(name)
                }}
                required
                name="product_category_id"
                id="product_category_id"
                options={product_categories.map((cat) => (
                  { value: cat.id, label: cat.name }
                ))}
              />

            </div>
            <div className="flex-1">
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


          {selectTool == "racquet" ? 

          selectSport?.name == 'Tennis' ? (
            <fieldset className="bg-gray-100 my-7  border-gray-light border-black p-3 rounded">
              <legend className="font-bold">Racquets</legend>

              <div className="flex gap-4 ">
                <div className="flex-1">
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
                <div className="flex-1">
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

                <div className="flex-1">
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
              <div className="flex gap-4 flex-col md:flex-row my-1">

                <div className="flex-1">
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
                  <label htmlFor="" className="text-gray-500 font-semibold text-sm">Weight (g)    </label>
                  <input
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
                    name="tension"
                    id="tension"
                    type="text"
                    placeholder="tension"
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
              <div className='justify-end flex my-1 bg-gray-200'>
            <button type='button' className='flex w-max p-1' onClick={() => {           
              setProductInventories([...productInventories,  {quantity: "", size: "", sku: "", locations: []}])
            }}>
              <FaPlus />
            </button>

            </div>

              <div className="">
            <div className='flex justify-between px-0'>
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

            {productInventories.map(({quantity, sku}, index) => (
                <div className='flex-1 flex gap-3 my-2 items-center' key={index}>

                <div className="flex-1">
                    <Select
                    defaultValue=""
                    name="sizes"
                    placeholder="Grip Sizes"
                    id="grip_size"
                    onChange={({value}) => addToProductInventory({key: "size", value}, index)}
                    options={gripSizes}
                    size={1}
                  />
                </div>

                <div className="flex-1">
                  <input
                    value={quantity}
                    name="quantity"
                    placeholder="Quantity"
                    id="qty"
                    onChange={(e) => { addToProductInventory({key: "quantity",  value: e.target.value}, index)}}
                  />

              </div>
              <div className="flex-1">
                  <input
                    value={sku}
                    name="sku"
                    id="sku"
                    onChange={(e) => { addToProductInventory({key: "sku",  value: e.target.value}, index)}}
                    placeholder='SKU'
                  />

              </div>
              <div className="flex-1">
                    <Select
                    name="locations"
                    id="location"
                    onChange={(selectedOption) => {
                     const value =  selectedOption.map(option => option.value)
                      addToProductInventory({key: "locations", value}, index)}}
                    options={locations}
                    placeholder='Add Product Location'
                    isMulti
                    size={1}
                  />
                </div>

                <span className='' onClick={()=> {
                  const newSizes = productInventories.filter((item, i) =>  i != index)  
                  setProductInventories(newSizes)
                }}>
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
                    <div className="bg-r w-full">
                      <label htmlFor="player_type" className="text-gray-500 font-semibold text-sm">Type of Player  </label>
                      <Select
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
                        defaultValue={{ value: recommendedGrip[0]?.value, label: recommendedGrip[0]?.label }}
                        name="recommended_grip"
                        id="recommended_grip"
                        type="text"
                        options={recommendedGrip}
                      />

                    </div>

                  </div>
                  <div className="flex gap-4 flex-col md:flex-row my-1">

                    <div className="flex-1">
                      <label htmlFor="balance_type" className="text-gray-500 font-semibold text-sm"> Length (mm)          </label>
                      <input
                        name="length"
                        id="length"
                  // options={balanceTypes}
                        type="text"
                        placeholder="Length in MM"
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
                    <div className="flex-1">
                      <label htmlFor="" className="text-gray-500 font-semibold text-sm">Weight (g)    </label>
                      <input
                        name="weight"
                        id="weight"
                        type="text"
                        placeholder="weight"
                      />

                    </div>

                    <div className="flex-1">
                      <label htmlFor="thickness" className="text-gray-500 font-semibold text-sm">thickness (mm) </label>
                      <input
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
                  <div className='justify-end flex my-0 '>
                  <button type='button' className='flex w-max p-1' onClick={() => {           
              setProductInventories([...productInventories,  {quantity: "", size: "", sku: "", locations: []}])
            }}>
              <FaPlus />
            </button>


            </div>
                  <div className="">
            <div className='flex justify-between px-0'>
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

            {productInventories.map((_, index) => (
                <div className='flex-1 flex gap-3 my-2 items-center' key={index}>

                <div className="flex-1">
                    <Select
                    defaultValue=""
                    name="sizes"
                    placeholder="cloth size"
                    id="padel_size"
                    onChange={({value}) => addToProductInventory({key: "size", value}, index)}
                    options={clothSizes}
                    size={1}
                  />
                </div>

                <div className="flex-1">
                  <input
                    value={productInventories[index].quantity}
                    name="quantity"
                    placeholder="Quantity"
                    id="qty"
                    onChange={(e) => { addToProductInventory({key: "quantity",  value: e.target.value}, index)}}
                  />

              </div>
              <div className="flex-1">
                  <input
                    value={productInventories[index].sku}
                    name="sku"
                    id="sku"
                    
                    onChange={(e) => { addToProductInventory({key: "sku",  value: e.target.value}, index)}}
                    placeholder='SKU'
                  />

              </div>
              <div className="flex-1">
                    <Select
                    // value={{value: productInventories[index].location, label: productInventories[index]?.location}}
                    name="locations"
                    id="location"
                    onChange={(selectedOption) => {
                      const value =  selectedOption.map(option => option.value)
                       addToProductInventory({key: "locations", value}, index)}}                    options={locations}
                    placeholder='Add Product Location'

                    size={1}
                  />
                </div>

                <span className='' onClick={()=> {
                  const newSizes = productInventories.filter((item, i) =>  i != index)  
                  setProductInventories(newSizes)
                }}>
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
                      <div className="bg-r w-full">
                        <label htmlFor="" className="text-gray-500 font-semibold text-sm">Type of Player  </label>
                        <Select
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
                      <div className="flex-1">
                        <label htmlFor="" className="text-gray-500 font-semibold text-sm">Weight (g)</label>
                        <input
                          name="weight"
                          id="weight"
                          type="text"
                          placeholder="weight"
                        />

                      </div>

                      <div className="flex-1">
                        <label htmlFor="" className="text-gray-500 font-semibold text-sm">thickness (mm) </label>
                        <input
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
                    <div className="">
            <div className='flex justify-between px-0'>
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
              <div className='justify-end flex my-0 '>
              <button type='button' className='flex w-max p-1' onClick={() => {           
              setProductInventories([...productInventories,  {quantity: "", size: "", sku: "", locations: []}])
            }}>
              <FaPlus />
            </button>


            </div>

            {productInventories.map((_, index) => (
                <div className='flex-1 flex gap-3 my-2 items-center' key={index}>

                <div className="flex-1">
                    <Select
                    defaultValue=""
                    name="sizes"
                    placeholder="Badminton Grip size"
                    id="badminton_size"
                    onChange={({value}) => addToProductInventory({key: "size", value}, index)}
                    options={gripSizes}
                    size={1}
                  />
                </div>

                <div className="flex-1">
                  <input
                    value={productInventories[index].quantity}
                    name="quantity"
                    placeholder="Quantity"
                    id="qty"
                    onChange={(e) => { addToProductInventory({key: "quantity",  value: e.target.value}, index)}}
                  />

              </div>
              <div className="flex-1">
                  <input
                    value={productInventories[index].sku}
                    name="sku"
                    id="sku"
                    
                    onChange={(e) => { addToProductInventory({key: "sku",  value: e.target.value}, index)}}
                    placeholder='SKU'
                  />

              </div>
              <div className="flex-1">
                    <Select
                    // value={{value: productInventories[index].location, label: productInventories[index]?.location}}
                    name="locations"
                    id="location"
                    onChange={(selectedOption) => {
                      const value =  selectedOption.map(option => option.value)
                       addToProductInventory({key: "locations", value}, index)}}                    options={locations}
                    placeholder='Add Product Location'

                    size={1}
                  />
                </div>

                <span className='' onClick={()=> {
                  const newSizes = productInventories.filter((item, i) =>  i != index)  
                  setProductInventories(newSizes)
                }}>
                <FaMinus />

                </span>
                
                </div>
              ))}

            </div>


                  </fieldset>

                </>
              ) : 
              selectTool == "shoe" ? 

          

          <fieldset className="p-3 bg-gray-100 border-gray-light rounded my-5">
            <legend className="font-bold">Shoes</legend>
            <div className='justify-end flex my-0 '>
            <button type='button' className='flex w-max p-1' onClick={() => {           
              setProductInventories([...productInventories,  {quantity: "", size: "", sku: "", locations: []}])
            }}>
              <FaPlus />
            </button>


            </div>
            <div className='gap-3'>
              <div className='flex justify-between px-0'>
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

           
              {productInventories.map((_, index) => (
                <div className='flex-1 flex gap-3 my-2 items-center' key={index}>

                    <div className="flex-1">
                    <Select
                    defaultValue=""
                    name="sizes"
                    placeholder="shoe size"
                    id="sizes"
                    onChange={({value}) => addToProductInventory({key: "size", value}, index)}
                    options={shoeSizes}
                    size={1}
                  />
                </div>

                <div className="flex-1">
                  <input
                    value={productInventories[index].quantity}
                    name="quantity"
                    id="qty"
                    placeholder="Quantity"

                    onChange={(e) => { addToProductInventory({key: "quantity",  value: e.target.value}, index)}}
                  />

              </div>
              <div className="flex-1">
                  <input
                    value={productInventories[index].sku}
                    name="sku"
                    id="sku"
                    placeholder="SKU"

                    onChange={(e) => { addToProductInventory({key: "sku",  value: e.target.value}, index)}}
                  />

              </div>
              <div className="flex-1">
                    <Select
                    // value={{value: productInventories[index].location, label: productInventories[index]?.location}}
                    name="locations"
                    placeholder='Add Product Location'
                    id="location"
                    onChange={(selectedOption) => {
                      const value =  selectedOption.map(option => option.value)
                      addToProductInventory({key: "locations", value}, index)}}
                    options={locations}

                    size={1}
                    isMulti
                  />
                </div>

                <span className='' onClick={()=> {
                  const newSizes = productInventories.filter((item, i) =>  i != index)  
                  setProductInventories(newSizes)
                }}>
                <FaMinus />

                </span>
                
                </div>
              ))}
           
            </div>

          </fieldset>

          : 
          selectTool == "apparel" ? 

          <fieldset className="p-3 bg-gray-100 my-5 border-gray-light rounded">
            <legend className="font-bold">Apparels</legend>
            <div className='justify-end flex my-0 '>
            <button type='button' className='flex w-max p-1' onClick={() => {           
              setProductInventories([...productInventories,  {quantity: "", size: "", sku: "", locations: []}])
            }}>
              <FaPlus />
            </button>


            </div>
            <div className="">
            <div className='flex justify-between px-0'>
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

            {productInventories.map((_, index) => (
                <div className='flex-1 flex gap-3 my-2 items-center' key={index}>

                <div className="flex-1">
                    <Select
                    defaultValue=""
                    name="sizes"
                    placeholder="cloth size"
                    id="apparel_size"
                    onChange={({value}) => addToProductInventory({key: "size", value}, index)}
                    options={clothSizes}
                    size={1}
                  />
                </div>

                <div className="flex-1">
                  <input
                    value={productInventories[index].quantity}
                    name="quantity"
                    placeholder="Quantity"
                    id="qty"
                    onChange={(e) => { addToProductInventory({key: "quantity",  value: e.target.value}, index)}}
                  />

              </div>
              <div className="flex-1">
                  <input
                    value={productInventories[index].sku}
                    name="sku"
                    id="sku"
                    onChange={(e) => { addToProductInventory({key: "sku",  value: e.target.value}, index)}}
                    placeholder='SKU'
                  />

              </div>
              <div className="flex-1">
                    <Select
                    // value={{value: productInventories[index].location, label: productInventories[index]?.location}}
                    name="locations"
                    id="location"
                    onChange={(selectedOption) => {
                      const value =  selectedOption.map(option => option.value)
                      addToProductInventory({key: "locations", value}, index)}}                    options={locations}
                    placeholder='Add Product Location'
                    isMulti

                    size={1}
                  />
                </div>

                <span className='' onClick={()=> {
                  const newSizes = productInventories.filter((item, i) =>  i != index)  
                  setProductInventories(newSizes)
                }}>
                <FaMinus />

                </span>
                
                </div>
              ))}

            </div>

          </fieldset>
          : 
          ""
            }

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
            <input id="trix" type="hidden" name="description_body" />
            <trix-editor input="trix" />

          </div>

          <div className="flex gap-4 my-6">
            {imagePreviews.map((image, index) => (
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

export default AddProduct;
