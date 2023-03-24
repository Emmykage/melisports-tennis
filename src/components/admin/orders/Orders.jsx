import React, { useState } from 'react'
import OrderDetail from './OrderDetail'
import OrderItem from './OrderItem'
import "./order.css"

const orders = [{
  id: 1,
  name: " Pure drive Lite",
  cost: 120000,
  quantity: 2,
  image: "https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1651570884/Product_Media/2023/TENNIS_RACKETS/EXPERT/101479-Pure_Aero-370-1-Face.png",
  show: false
}, 
{
  id: 2,
  name: " Pure Aero Lite",
  cost: 120000,
  quantity: 2,
  image: "https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1651570884/Product_Media/2023/TENNIS_RACKETS/EXPERT/101479-Pure_Aero-370-1-Face.png",
  show: false

},
{
  id: 3,
  name: " Evo drive Lite",
  cost: 120000,
  quantity: 2,
  image: "https://media.babolat.com/image/upload/f_auto,q_auto,c_pad,w_1008,h_1008/v1651570884/Product_Media/2023/TENNIS_RACKETS/EXPERT/101479-Pure_Aero-370-1-Face.png",
  show: false

}]

const Orders = () => {

  const activeLink = ""
  const [isDisplayOpen, setIsDisplayOpen] = useState(false)

  return (
    <div className='order-container'>
        <h1 className='bolder'>
            Page Under construction
        </h1>
        <div>
          <ul className='order'>
            {orders.map(order => (
            <OrderItem key={order.id} 
            order_prop={order} 
            // display={isDisplayOpen} 
            // showDetail={toggleClass} 
            // isActive={isActive}
            />

            ))}



          </ul>
        </div>
    </div>
  )
}

export default Orders