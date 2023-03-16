import React, { useState } from 'react'
import OrderDetail from './OrderDetail'
import OrderItem from './OrderItem'
import "./order.css"

const Orders = () => {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false)
  const toggleShowDetail = () =>{
    setIsDisplayOpen(prevState => !prevState)

  }
  return (
    <div className='order-container'>
        <h1 className='bolder'>
            Page Under construction
        </h1>
        <div>
          <ul className='order'>
            <OrderItem display={isDisplayOpen} showDetail={toggleShowDetail}/>
            <OrderItem display={isDisplayOpen} showDetail={toggleShowDetail}/>



          </ul>
        </div>
    </div>
  )
}

export default Orders