import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../../../pages/Loader';
import { getProduct, getProducts } from '../../../redux/actions/product';
import { openDelModal } from '../../../redux/modal/delModal';

const Products = () => {
  const navigate = useNavigate()
  // const { counter } = useSelector((state) => state.cart);

  const {products, status, error} = useSelector((state) => state.products);
console.log(products, status)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const toEdit = (id) => {
    dispatch(getProduct(id))
    navigate(`/admin/edit/${id}`)

  }
 
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
            <a className="btn btn-outline max-width" 
            onClick={()=> dispatch(openDelModal(product.id))}
          >
              Delete
            </a>
            <a className="btn btn-outline max-width" onClick={() => toEdit(product.id)}>
              Edit
            </a>

          </div>
        </div>

      ))}

    </>
      )}
      }
      else if(status === "failed"){ 
        return (
        <div>
          <h2> {error}</h2>
          </div>
        )
      }
      else{
        return(
          <Loader/>
              )
      }
  
};

export default Products;
