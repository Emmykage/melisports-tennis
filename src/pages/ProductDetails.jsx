import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/product';
// import { addCart } from '../redux/actions/cart';
import { updater } from '../redux/cart/cart';
import { closeList } from '../redux/products/searched';
import { closeNav } from '../redux/modal/nav';
import { addCart } from '../redux/cart/cart';
import Loader from './Loader';
import ImagePreview from '../components/products/ImagePreview';
import { naira_format } from '../utils/naira_format';

const ProductDetails = () => {
  const pickColor = (color) => {
    switch (color) {
      case 'blue':
        return 'blue';
      case 'red':
        return 'red';
      case 'green':
        return 'green';
      default:
        return 'gray';
    }
  };

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
  console.log(product)

  return (
    <section className="px-1">

      <div className="p-container border-theme rounded-md shadow">
        <div className="row sm-flex-col detail-container">
          <div className="left-detail-container col-md-6 sm-row-col centralize">
            {product.photo_urls ? <ImagePreview images={product.photo_urls} />
              : (
                <div className="image-card relative  ">
                  <img src={product.image} alt="yeo" className="w-full h-full" />
                </div>
              )}
          </div>
          <div className="col-md-6 right-detail-container border-l prev-details px-4">
            <h2 className="my-0">{product?.name}</h2>
            <p className="my-2">
              Tennis
              {product?.product_category?.name}
            </p>
            <div className="price">

              <span className="text-2xl font-semibold">
                {naira_format(product.price)}
              </span>

            </div>
            {product.head_size && (
            <div className="headsize">
              <span className="block text-xl">
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

            {product.grip_size && (
            <div>

              <span className="text-xl block">
                Grip size:
              </span>
              <span className="text-gray-dark">
                {' '}
                {product.grip_size}
              </span>

            </div>
            ) }
            {product.colours && (
            <div>

              <span className="font-medium text-gray-600 ">
                colour:
              </span>
              <div className="flex gap-3">
                {' '}
                {product?.colours && product.colours.length > 0 ? (
                  product.colours.map((color) => (
                    <span
                      key={color}
                      className={`block w-10 h-10 rounded-full border bg-${color}-600`}
                    />
                  ))
                ) : (
                  'N/A'
                )}
              </div>

            </div>
            ) }

            <div className="flex gap-3">
              <div className="btn-div">
                <button
                  type="button"
                  onClick={decrease}
                >
                  -
                </button>
                <span>{count}</span>
                <button
                  type="button"
                  onClick={increase}
                >
                  +
                </button>

              </div>

            </div>
            <div>
              <a
                className="btn block"
                onClick={handleCart}
              >
                {' '}
                Add to Cart
              </a>
            </div>
          </div>

        </div>
        <div className="technical-details">
          <h3>Technical Characteristics</h3>
          <div className="Xteristic">
            {product.head_size
        && (
        <div className="">
          <div className="col-6">
            <span className="font-semibold text-gray-dark">Head Size</span>
          </div>
          <div className="col-6">
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
            <span className="font-semibold text-gray-dark">weight</span>

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
            <span className="font-semibold text-gray-dark">Size</span>

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
            <span className="font-semibold text-gray-dark">Length </span>

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
            <span className="font-semibold text-gray-dark">Composition </span>

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
            <span className="font-semibold text-gray-dark">Strung/Unstrung</span>

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
            <span className="font-semibold text-gray-dark">Recommended Tension</span>

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
          <h2 className="ml-0">Description</h2>

          {/* {product.description ? <div>{ product.description }</div> :  <div dangerouslySetInnerHTML={{ __html: product?.description_body }} />} */}
          {product.description_body ?  <div dangerouslySetInnerHTML={{ __html: product?.description_body }} /> : <div>{ product.description }</div> }
         
          

        </div>

      </div>

    </section>

  );
};

export default ProductDetails;
