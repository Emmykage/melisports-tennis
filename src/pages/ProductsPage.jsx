import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Banner from '../components/banner/Banner';
import Hero from '../components/banner/Hero';
import Products from '../components/products/Products';
import SideNav from '../components/sideNav/SideNav';
import { getProductCategories } from '../redux/actions/product_category';

const ProductsPage = () => {
  const dispatch = useDispatch()
  const {product_categories} = useSelector((state)=> state.product_categories)
  const category = product_categories.find((cat) => cat.name === "racquet") 


  useEffect(()=>{
    dispatch(getProductCategories())
  },[])
  
  console.log(category)

  // console.log(category)

  return(
  <div className="product-container">
    <Hero />

    <div className="prod-page">
      <button type="button"> Pure Aero</button>
      <button type="button"> Pure strike</button>
      <button type="button"> boost</button>
      <button type="button">All racquets</button>

      <div className="flex-center level">
        <div className="side-nav">
          <SideNav />
        </div>

        <div className="full-width flex-center">
          <Products />

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
