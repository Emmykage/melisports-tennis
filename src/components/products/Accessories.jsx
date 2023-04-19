import React from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../../pages/Loader';
import './products.css';

const Accessories = ({products, status, error}) => {


  const accessories = products.filter((item) => item.product_category.name === "accessory")

  if(status === "waiting"){
    
      return(
        <Loader/>
              )
    
  } else if (status === "success"){
        if (accessories.length < 1) {
    return (
      <div>
        <header>
          
          <h1 className='warning-center'> Please Add some Accessories to your collection</h1>
        </header>
      </div>
    );
  }else{
     return (
   
    <>

      {apparelsProducts.map((product) => (
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
            <NavLink className="btn btn-outline" to={`/productdetails/${product.id}`}>
              Buy
            </NavLink>

          </div>
        </div>

      ))}

    </>
      )}
      }
      else{ 
        return (
        <div className='text-center'>
          <h2> {error}</h2>
          </div>
        )
      }
      
    
};

export default Accessories;
