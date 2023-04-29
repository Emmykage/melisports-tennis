import React, { useState } from 'react'
import {BsCartDash} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { addOrder } from '../redux/actions/orders'

const Checkout = () => {
    const dispatch = useDispatch()
    const { total, cartItems, counter } = useSelector((state) => state.cart)    
    const [state, setState] = useState({})
    console.log(cartItems)

    const orderItems = cartItems.map((item) => (
        {
            product_id: item.product_id,
            quantity: item.quantity}
        
    ))

  
    

    const handlePurchase = (e) => {
        e.preventDefault();        
       setState({
            order_detail: {
                total: total,
                order_items_attributes: orderItems
            }
        })
      
        dispatch(addOrder(state))
    }
  return (
    <div className='checkout'>
        <div className=' col-left'>
            <h2>Billings </h2>
            <form action="">
                <div>
                    <label htmlFor="">First Name</label> <input type="text" /></div>
                <div>
                    <label>Last name</label> <input type="text" /></div>
                <div> <label htmlFor="email">Email address</label> <input type="email" /></div>


                <div><label htmlFor="country">country</label><input type="text" /></div>

                <div className='flex gap-1'> 
                    <div className='flex-3'>
                        <label htmlFor="">State</label>
                        <input type="text" />
                    </div>
                    <div className='flex-2'>
                        <label htmlFor="">postal</label>
                        <input type="text" />
                    </div>
                </div>
                <h4>
                    Payment method
                </h4>
                <div>
                    <input type="radio" placeholder='Credit Card' />
                </div>
                <div>
                    <label htmlFor=""> Card number</label>
                    <input type="text" placeholder='123456789'/>
                </div>
                <div> 
                    <div>
                        <label htmlFor=""> Expiration date</label>
                    </div>
                    <div>
                        <label htmlFor=""> Expiration date</label>
                    </div>
                    <div>
                        <label htmlFor=""> Security code</label>
                        <input type="text" placeholder='three digits' />
                    </div>
                   
                </div>
                <div>
                    <input type="text" />
                </div>
                <div> 
                    <small>
                        By clicking the button, you agree to the <a href='#'>Terms and Conditions</a>
                    </small>
                    <input type="submit" value={"place order"} onClick={handlePurchase} /></div>



            </form>

        </div>
        <div className='col-right'>
                            <h3> Order summary</h3>
                            <ul>
                                <li className='flex'>
                                    <span> {counter} items</span>
                                </li>
                                <hr></hr>
                                <li className='flex-space'>
                                    <span> SUBTOTAL</span> <span>{total}</span>
                                </li>
                                <hr />
                                <li className='flex-space'>
                                    <span> CART TOTAL</span><span>{total}</span>
                                </li>
                            </ul>

            
            
        </div>
       
        </div>
  )
}

export default Checkout