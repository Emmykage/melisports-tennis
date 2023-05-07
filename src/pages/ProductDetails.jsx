import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/product';
import { addCart } from '../redux/actions/cart';
import { updater } from '../redux/cart/cart';
import { closeList } from '../redux/products/searched';
import { closeNav } from '../redux/modal/nav';

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
  }, []);
  const handleCart = () => {
    dispatch(addCart({ product_id: id, quantity: count }));

    dispatch(updater());
  };
  console.log(product);
  const increase = () => {
    setCount((setPrev) => setPrev + 1);
  };
  const decrease = () => {
    count !== 1 && setCount((setPrev) => setPrev - 1);
  };
  return (
    <div className="p-container">
      <div className="row detail-container">
        <div className="left-detail-container col-md-6 border-white">

          <div className="product-display-image">

            <img src={product.image} alt="yeo" />
          </div>
        </div>
        <div className="col-md-6 right-detail-container  prev-details border-white">
          <h2 className="m-h4">{product.name}</h2>
          <div className="price">

            <span>
              {NGNaira.format(product.price)}
            </span>

          </div>
          {product.head_size && (
          <div className="headsize">
            <span>
              Head size:
            </span>

            <span>
              {product.head_size}
              {' '}
              &#13216;
            </span>
          </div>
          ) }

          {product.grip_size && (
          <div>

            <span>
              Grip size:
            </span>
            <span>
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

          <div className="flex-center center ">
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
            <a
              className="btn"
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
            <span className="x-bold">Head Size</span>
          </div>
          <div className="col-6">
            <span>
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
            <span>weight</span>

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
            <span>Size</span>

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
            <span>Length </span>

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
            <span>Composition </span>

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
            <span>Strung/Unstrung</span>

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
            <span>Recommended Tension</span>

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
        <h2>Description</h2>
        <p>
          {product.description}

        </p>

      </div>

    </div>
  );
};

export default ProductDetails;
