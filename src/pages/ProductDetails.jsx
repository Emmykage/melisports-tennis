import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/product';
// import { addCart } from '../redux/actions/cart';
import { updater } from '../redux/cart/cart';
import { closeList } from '../redux/products/searched';
import { closeNav } from '../redux/modal/nav';
import { addCart } from '../redux/cart/cart';

const ProductDetails = () => {
  const NGNaira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const product = useSelector((state) => state.product.product);
  const { id } = useParams();
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getProduct(id));
  }, [id]);
  const handleCart = () => {
    dispatch(addCart({
      product_id: id, image: product.image, price: product.price, quantity: count, product_name: product.name
    }));

    dispatch(updater());
  };
  const increase = () => {
    setCount((setPrev) => setPrev + 1);
  };
  const decrease = () => {
    count !== 1 && setCount((setPrev) => setPrev - 1);
  };
  console.log(product)
  return (
    <div className="p-container">
      <div className="row sm-flex-col detail-container justify-between">
        <div className="left-detail-container col-md-6 border-gray-light centralize">

          <div className="product-display-image">

            <img src={product.image} alt="yeo" />
          </div>
        </div>
        <div className="col-md-6 right-detail-container  prev-details">
          <h2 className="my-0">{product.name}</h2>
          <p className='my-2'>Tennis {product.product_category.name}</p>
          <div className="price">

            <span className='text-2xl font-semibold'>
              {NGNaira.format(product.price)}
            </span>

          </div>
          {product.head_size && (
          <div className="headsize">
            <span className='block text-xl'>
              Head size
            </span>

            <span className='text-base text-gray-dark font-medium'>
              {product.head_size}
              {' '}
              &#13216;
            </span>
          </div>
          ) }
          {/* {product?.head_size} */}

          {product.grip_size && (
          <div>

            <span className='text-xl block'>
              Grip size:
            </span>
            <span className='text-gray-dark'>
              {' '}
              {product.grip_size}
            </span>

          </div>
          ) }
          {product.colour && (
          <div>

            <span>
              colour:
            </span>
            <span>
              {' '}
              {product.colour}
            </span>

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
            <span className='text-gray-dark font-medium'>
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
            <span  className="font-semibold text-gray-dark">Length </span>

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

      <div className="description-details m-h4">
        <h2 className='ml-0'>Description</h2>
        <p>
          {product.description}

        </p>

      </div>

    </div>
  );
};

export default ProductDetails;
