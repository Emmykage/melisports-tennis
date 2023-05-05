import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/product';
import { addCart } from '../redux/actions/cart';
import { updater } from '../redux/cart/cart';
import { closeList } from '../redux/products/searched';
import { closeNav } from '../redux/modal/nav';

const ProductDetails = () => {
  let NGNaira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
});
  const dispatch = useDispatch();
  const [count, setCount] = useState(1)
  const product = useSelector((state) => state.product.product)
  const {id} = useParams();
  useEffect(()=>{
    dispatch(closeNav())
    dispatch(closeList())
    dispatch(getProduct(id))
  }, [])
  const handleCart = () =>{
    dispatch(addCart({product_id: id, quantity: count}))

    dispatch(updater())
  }
  const increase = () => {

    setCount(setPrev => setPrev+1 )
  }
  const decrease = () =>{
    count !== 1 && setCount(setPrev => setPrev -1)
  }
return (
  <div className='p-container'>
    <div className="row detail-container">
      <div className="left-detail-container col-md-6 border">

        <div className="product-display-image">

          <img src={product.image} alt="yeo" />
        </div>
      </div>
      <div className="col-md-6 right-detail-container  prev-details border">
        <h2 className='m-h4'>{product.name}</h2>
        <div className='price'>
       
          <span>
          {NGNaira.format(product.price)}
          </span>
         
        </div>
        {product.head_size && <div className='headsize'>
          <span>
          Head size:
          </span>
         
          <span>{product.head_size} &#13216;</span>
        </div> }
        
        {product.grip_size && <div>

       
<span>
  Grip size:
  </span>
  <span>
    {' '}
    {product.grip_size} 
  </span>

</div> }
{product.colour && <div>

       
<span>
  colour:
  </span>
  <span>
    {' '}
    {product.colour} 
  </span>

</div> }
        

        <div className='flex-center center '>
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

    <div className="description-details border">
      <h2>Description</h2>
      <p>
      {product.description}

      </p>
 
    </div>
  </div>
)};

export default ProductDetails;
