import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../redux/actions/product';
// import { addCart } from '../redux/actions/cart';
import { updater } from '../../redux/cart/cart';
import { closeList } from '../../redux/products/searched';
import { closeNav } from '../../redux/modal/nav';
import { addCart } from '../../redux/cart/cart';
import Loader from '../Loader';
import ImagePreview from '../../components/products/ImagePreview';
import { naira_format } from '../../utils/naira_format';
import { pickColor } from '../../utils/get_colors';

const ProductDetails = () => {
  // const pickColor = (color) => {
  //   switch (color) {
  //     case 'blue':
  //       return 'blue';
  //     case 'red':
  //       return 'red';
  //     case 'green':
  //       return 'green';
  //     default:
  //       return 'gray';
  //   }
  // };

  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const { product, loading } = useSelector((state) => state.product);
  const { id } = useParams();
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getProduct(id));
  }, [id]);
  const handleCart = () => {
    dispatch(addCart({
      product_id: id, image: product.photo_urls ? product.photo_urls[0] : product.image, price: product.price, quantity: count, product_name: product.name,
    }));

    dispatch(updater());
  };
  const increase = () => {
    setCount((setPrev) => setPrev + 1);
  };
  const decrease = () => {
    count !== 1 && setCount((setPrev) => setPrev - 1);
  };

  if (loading) {
    return (<Loader />);
  }
  return (
    <section className="px-1">

      <div className="p-container shadow p-4 rounded-md bg-white">
        <div className=" max-w-[1600px]  grid gap-5 border-b mb-10 pb-6 md:gap-8 md:grid-cols-2">
          <div className="centralize">
            {product.photo_urls ? <ImagePreview images={product.photo_urls} />
              : (
                <div className=" w-full relative  ">
                  <img src={product.image} alt="yeo" className="w-full h-full" />
                </div>
              )}
          </div>
          <div className="col-md-6 right-detail-container prev-details md:px-4">
            <h2 className="my-0 text-3xl font-medium">{product?.name}</h2>
            <p className="my-2 text-base text-gray-500">
              Tennis {" "}
              {product?.product_category?.name}
            </p>
            <div className="price ">

              <span className="text-2xl font-semibold">
                {naira_format(product.price)}
              </span>

            </div>
            {product.head_size && (
            <div className="headsize my-3">
              <span className="text-gray-600 text-xl font-semibold block">
                Head size
              </span>

              <span className="text-base text-gray-dark font-medium">
                {product.head_size}
                {' '}
                &#13216;
              </span>
            </div>
            ) }
            {/* {product?.head_size} */}

            
            
            
            {product?.colours && (
              <div className='my-3'>

                <div className=' items-center'>

                  <span className="text-gray-600 text-xl font-semibold ">
                    colours:
                  </span>
                  <div className="flex gap-3">
                    {' '}
                    {product.colours.length > 0 ? (
                      product.colours.map((color) => (

                        pickColor(color).length == 1 ? 
                        <span
                          key={color}
                          className={`block w-8 h-8 rounded-full border border-gray-300 ${pickColor(color)[0]}`}
                        /> : <span
                        key={color}
                        className={`w-8 h-8 rounded-full border  border-gray-300 flex justify-center items-center ${pickColor(color)[0]}`}
                      > 
                      <span 
                      className={`block w-4 h-4 rounded-full border ${pickColor(color)[1]}`}
                      />

                    
                      </span>
                      ))
                    ) : (
                      <span className='flex h-full'>
                      N/A

                      </span>
                    )}
                  </div>

                </div>
            </div>

            ) }

            {product?.grip_sizes && product?.grip_sizes.length > 0 && (
            <div>
              
              <p className="block text-gray-600 text-xl font-semibold">
                Grip sizes:
              </p>
              <div className='flex gap-1 flex-wrap my-2'> 
                {' '}
                {product.grip_sizes.map(size => (
              <span className="text-gray-dark px-6 py-0.5 bg-gray-200 text-base text-gray-dark rounded">
                {size}
              </span>

                ))}

              </div>
            

            </div>
            ) }

            <div className="flex gap-3">
              <div className="btn-div my-3">
                <button
                  type="button"
                  className='py-1 px-2.5'
                  onClick={decrease}
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  type="button"
                   className='py-1 px-2.5'
                  onClick={increase}
                >
                  +
                </button>

              </div>

            </div>
            <div>
              <a
                className="btn block py-2 px-3"
                onClick={handleCart}
              >
                {' '}
                Add to Cart
              </a>
            </div>
          </div>

        </div>
        <div className="technical-details my-5 pb-6">
          <h3 className='text-2xl tracking-wider font-medium'>Technical Characteristics</h3>
            <div className="Xteristic">
                    {product?.head_size
                && (
                <div className="">
                  <div className="title flex-1">
                    <span className="font-semibold text-base">Head Size</span>
                  </div>
                  <div className="value flex-1">
                    <span className="text-gray-dark font-medium">
                      {product.head_size}
                      {' '}
                      &#13216;
                    </span>
                  </div>
                </div>
                ) }
                    {product.weight
                      && (
                      <div>
                        <div className="col-6">
                          <span className="font-semibold text-base">weight</span>

                        </div>
                        <div className="col-6">
                          <span>
                            {product.weight}
                            {' '}
                            g +/-7 g
                          </span>

                        </div>
                      </div>
                      )}
                    {product.size
                && (
                <div>
                  <div className="col-6">
                    <span className="font-semibold text-base">Size</span>

                  </div>
                  <div className="col-6">
                    <span>{product.size}</span>

                  </div>
                </div>
                )}
                    {product.length
                && (
                <div>
                  <div className="col-6">
                    <span className="font-semibold  text-base">Length </span>

                  </div>
                  <div className="col-6">
                    <span>
                      {product.length}
                      {' '}
                      mm
                    </span>

                  </div>
                </div>
                )}
                    {product.composition
                && (
                <div>
                  <div className="col-6">
                    <span className="font-semibold  text-base">Composition </span>

                  </div>
                  <div className="col-6">
                    <span>{product.composition}</span>

                  </div>
                </div>
                )}
                    {product.strung
                && (
                <div>
                  <div>
                    <span className="font-semibold  text-base">Strung/Unstrung</span>

                  </div>
                  <div className="col-6">
                    <span>{product.strung}</span>

                  </div>
                </div>
                )}
                    {product.tension
                && (
                <div>

                  <div className="col-6">
                    <span className="font-semibold  text-base">Recommended Tension</span>

                  </div>
                  <div className="col-6">
                    <span>
                      {product.tension}
                      {' '}
                      kg
                    </span>

                  </div>
                </div>
                )}
          </div>
        </div>

        <div className="description-details my-6">
          <h2 className="text-2xl font-medium">Description</h2>

          {product.description_body ? <p className='md:text-base' dangerouslySetInnerHTML={{ __html: product?.description_body }} /> : <p className='text-lg'>{ product.description }</p> }

        </div>

      </div>

    </section>

  );
};

export default ProductDetails;
