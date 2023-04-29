import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loader from '../../pages/Loader';
import { getProducts } from '../../redux/actions/product';
import product from '../../redux/products/product';
import './products.css';

const Shoes = ({products, status, error}) => {
  let NGNaira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
});

  // if(products.length > 0){

 
  const shoes = products.filter((items) => items.product_category.name === "shoe")

  if(status === "waiting"){
    return(
      <Loader/>
    )
  }else if (status === "success"){
      if (shoes.length < 1) {
        return (
          <div>
            <header>
              
              <h1 className='warning-center'> Please Add some products to your collection</h1>
            </header>
          </div>
        );
      }
      else{

      
      return (
   
    <>

      {shoes.map((product) => (
        <div key={product.id} className="products-display">
          <div className="prod-img">
            <NavLink to={`/productdetails/${product.id}`}>
            <img src={product.image} alt="" />
            </NavLink>
            
          </div>
          <div className="prod-details">
            <h5 className="color-black">
              {product.name.substring(0, 15)}
              ...
            </h5>
            <p>{NGNaira.format(product.price)}</p>
            <NavLink className="btn btn-outline" to={`/productdetails/${product.id}`}>
              Buy
            </NavLink>

          </div>
        </div>

      ))}

    </>
      )
    }
      }
      else { 
        return (
        <div  className='text-center'>
          <h2> {error}</h2>
          </div>
        )
      }
     
};

export default Shoes;
