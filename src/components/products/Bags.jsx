import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProducts } from '../../redux/actions/product';
import product from '../../redux/products/product';
import './products.css';

const Bags = ({products, status, error}) => {
 

  if(products.length > 0){

 
  const bags = products.filter((items) => items.product_category.name === "bag")

  if (bags.length < 1) {
    return (
      <div>
        <header>
          <h2> Bags </h2>
          <h4> Your bags category is currently empty</h4>
        </header>
      </div>
    );
  }
 
    if (status === "success"){
        return (
   
    <>

      {bags.map((product) => (
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
            <p>{product.price}</p>
            <NavLink className="btn color-grey btn-outline" to={`/productdetails/${product.id}`}>
              Buy
            </NavLink>

          </div>
        </div>

      ))}

    </>
      )
    
      }
      else if(status === "failed"){ 
        return (
        <div>
          <h2> No internet{error.message}</h2>
          </div>
        )
      }
      else{
        return(
          <> loading...</>
        )
      }
    }else{
      return(
        <h2> Please and some products if you are the admin</h2>
      )
    }
};

export default Bags;
