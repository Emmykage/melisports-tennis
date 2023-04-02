import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../components/banner/Hero';
import Products from '../components/products/Products';
import SideNav from '../components/sideNav/SideNav';
import { getProductCategories } from '../redux/actions/product_category';
import { getProducts } from '../redux/actions/product';
import { filterProducts } from '../redux/products/product';

const ProductsPage = () => {
  const dispatch = useDispatch()
  const {products, status, error} = useSelector((state) => state.products);
  const {product_categories} = useSelector((state)=> state.product_categories)
  const category = product_categories.find((cat) => cat.name === "racquet") 


  const handleFilteredProducts = (seive) => {
    const lowerCaseSieve = seive.toLowerCase()
    dispatch(filterProducts(lowerCaseSieve))

  }


  useEffect(()=>{
    // dispatch(getProductCategories())
    dispatch(getProducts());
    // setFiltered(products)
    console.log(products)


  },[])
  

  return(
  <div className="product-container">
    <Hero />

    <div className="prod-page">
    <div className='cat-group'>
      <a className='btn' onClick={()=> handleFilteredProducts('pure aero')}> Pure Aero</a>
      <a className='btn' onClick={()=> handleFilteredProducts("pure strike")}> Pure strike</a>
      <a className='btn' onClick={()=> handleFilteredProducts("boost")}> boost</a>
      <a className='btn' onClick={()=> dispatch(getProducts())}>All racquets</a>
     

      </div>
     

      <div className="flex-center level">
        <div className="side-nav">
          <SideNav />
        </div> 

        <div className="product-align">
        <div className="product-items">
          <Products products={products} status={status} error={error} />
        </div>

           <div className="product-details color-grey">
            <h3> BABOLAT TENNIS RACQUET BRANDS</h3>
            <p>
                {/* {category.name} */}
                {/* { category.description} */}

             
            </p>

          </div> 
        </div>
        <div />

      </div>
    </div>
  </div>
)
  };

export default ProductsPage;
