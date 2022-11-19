import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/products/product'

const Products = () => {
  const products = useSelector((state) => state.products.products)
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(getProducts())
  })
  return (
    <>
   
      {products.map((product)=>(
         <div>
            <div>
              <img src='' />
            </div>
          <div className='prod-details'>
            <h4>hey</h4>
         <p></p>

     </div>
     </div>

      ))}
       
   
    </>
  )
}

export default Products