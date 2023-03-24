import React from 'react'
import {BsCartDash} from "react-icons/bs"
import { useSelector } from 'react-redux'

const Checkout = () => {
    const { total, cartItems } = useSelector((state) => state.cart)    
    const oderItems = cartItems.map((item) => (
        {product_id: item.id,
            quantity: item.quantity}
        
    ))
    const {user} = useSelector((state) => state.user)
    const handlePurchase = () => {
        
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
                    <input type="submit" value={"place order"} /></div>



            </form>

        </div>
        <div className='col-right'>
            <ul>
                <h3><BsCartDash/> Cart Summary</h3>
                <li></li>
            </ul>
        </div>
        <div>
            <button className='btn' onClick={handlePurchase}>
                purchase
            </button>
        </div>
        </div>
  )
}

export default Checkout