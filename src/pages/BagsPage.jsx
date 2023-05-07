import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Banner from '../components/banner/Banner';
import Hero from '../components/banner/Hero';
import Bags from '../components/products/Bags';
import SideNav from '../components/sideNav/SideNav';
import { getProducts } from '../redux/actions/product';
import { closeNav } from '../redux/modal/nav';
import { filterProducts } from '../redux/products/product';
import { closeList } from '../redux/products/searched';
import Loader from './Loader';

const BagsPage = () => {
  const dispatch = useDispatch()
  const {products, status, error} = useSelector((state) => state.products)
  const {product_categories, loading} = useSelector((state)=> state.product_categories)

  const category = product_categories.find((cat) => cat.name === "bag") 

  const handleFilteredProducts = (sieve) => {
    const lowerCaseSieve = sieve.toLowerCase()
    dispatch(filterProducts(lowerCaseSieve))
  }
  useEffect(()=> {
    dispatch(closeNav())
    dispatch(closeList())
    dispatch(getProducts())
  },[])
  if(loading){
    <Loader/>
  }else{

  
  return(
  <div className="product-container">
    <Hero />

    <div className="prod-page">
    <div className='cat-group'>
        <button className='btn' onClick={()=> handleFilteredProducts('backpack')}> Backpack</button>
        <button className='btn' onClick={()=> handleFilteredProducts("duffle")}> Duffle</button>
        <button className='btn' onClick={()=> handleFilteredProducts("racket holder")}> Racket holder</button>
        <button className='btn' onClick={()=> dispatch(getProducts())}>All bags</button>
     

      </div>
     
      <div className="flex-center level">
        <div className="side-nav">
          <SideNav />
        </div>

        <div className="product-align">
          <div className="product-items">
          <Bags products={products} status={status} error={error} />


          </div>

          <div className="product-details">
            <h3> BABOLAT TENNIS BAGS BRANDS</h3>
            <p>
              {category.description}
            </p>

          </div>
        </div>
        <div />

      </div>
    </div>
  </div>
);
  }}

export default BagsPage;
