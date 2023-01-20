import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getProducts } from '../../../redux/actions/product';
import { openDelModal } from '../../../redux/modal/delModal';
// import product from '../../../redux/products/product';
// import './products.css';

const Products = () => {
  const {products, status, error} = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
 
 
    if (status === "success"){
    
      if (products.length < 1) {
        return (
          <div>
            <header>
              
              <h1 className='warning-center'> Please Add some products to your collection</h1>
            </header>
          </div>
        );
      }else{

      return (
   
    <>

      {products.map((product) => (
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
            <a className="btn color-grey btn-outline max-width" 
            onClick={()=> dispatch(openDelModal(product.id))}
          >
              Delete
            </a>
            <NavLink className="btn color-grey btn-outline max-width" to={`/admin/edit/${product.id}`}>
              Edit
            </NavLink>

          </div>
        </div>

      ))}

    </>
      )}
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
          <><h1 className='warning-center'> loading...</h1></>
        )
      }
  
};

export default Products;
