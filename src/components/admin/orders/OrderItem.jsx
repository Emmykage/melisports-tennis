import React from 'react'
import OrderDetail from './OrderDetail'

const OrderItem = ({display, showDetail}) => {
 
  return (
    <li className='order-item'>
        <div className='order-header flex-space'> 
            <span>Menanya Morris</span>
            <a onClick={showDetail}> 
                show details
            </a>
            <span>
              <input type="checkbox" />
            </span>
        </div>
        <OrderDetail display={display}/>
   
        
    </li>
  )
}

export default OrderItem