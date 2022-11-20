import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getProducts } from '../../redux/products/product'
import './products.css'
const Products = () => {
  const products = useSelector((state) => state.products.products)
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getProducts())
  })
  return (
    <>
   
      {products.map((product)=>(
         <div className='products-display'>
            <div className='prod-img'>
              <img src={product.image} />
            </div>
          <div className='prod-details'>
            <h5 className='color-black'>{product.title.substring(0, 15)}...</h5>
         <p>{product.price}</p>
         <NavLink className='btn color-grey btn-outline' to='/product'>
          Buy
         </NavLink>


     </div>
     </div>

      ))}
       
   
    </>
  )
}

export default Products