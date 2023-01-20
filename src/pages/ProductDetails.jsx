import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/product';
// import { addItem } from '../redux/cart/cart';
// import { addItem } from '../redux/cart/cart';
import { addCart } from '../redux/actions/cart';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0)
  const product = useSelector((state) => state.product.product)
  // const {cartItems, counter, total, isLoading} = useSelector((state)=> state.cart)
  const {id} = useParams();
  useEffect(()=>{
    dispatch(getProduct(id))
  }, [])
  const handleCart = () =>{
    dispatch(addCart({product_id: id, quantity: count}))
  }
  const increase = () => {
    setCount(count+1)
  }
  const decrease = () =>{
    setCount(count-1)
  }
return (
  <div className='p-container'>
    <div className="row flex">
      <div className="col-md-6">
        <div className="product-display-image">

          <img src={product.image} alt="yeo" />
        </div>
      </div>
      <div className="col-md-6 prev-details">
        <h2 className='m-h4'>{product.name}</h2>
        <div className='price'>
       
          <span>
          $ {product.price}
          </span>
         
        </div>
        <div className='headsize'>
          <span>
          Head size
          </span>
         
          <span>{product.head_size}</span>
        </div>
        <div>

       
        <span>
          Grip size
          </span>
          <span>
            {' '}
            {product.grip_size}
          </span>
        
        </div>

        <div className='flex-center carter'>
          <div className='btn-div'>
            <button type="button"
            onClick={decrease}
            >-</button>
            <span>{count}</span>
            <button type="button"
            onClick={increase}>+</button>

          </div>
          <a className='btn'
          onClick={handleCart}
          > Add to Cart</a>

        </div>
      </div>

    </div>

    <div className="description-details p-x5">
      <h4>Description</h4>
      <p>
      {product.description}

      </p>
 
    </div>
  </div>
)};

export default ProductDetails;
