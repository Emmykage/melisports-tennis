import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart, increase, decrease, calculateTotal, updater,
} from '../redux/cart/cart';
import { decreaseCart, increaseCart, removeItem } from '../redux/actions/cart';
import { openModal } from '../redux/modal/modal';
// import Modal from '../components/modal/Modal';
import { getCarts } from '../redux/actions/cart';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  // let [count, setCount] = useState(0)
  // const isOpen = useSelector((state) => state.modal.isOpen);
  const { cartItems, total, update } = useSelector((state) => state.cart);
  console.log(cartItems)

  const [items, setItem] = useState([])
  const dispatch = useDispatch();
  useEffect(()=>{
    getItem()
    dispatch(getCarts())
    
  },[update])
  const getItem = ()=>{
    setItem(cartItems)


  }
  console.log(items)
  console.log(update)


  if (cartItems.length < 1) {
    return (
      <div>
        <header>
          <h2> Your bag</h2>
          <h4> You cart is currently empty</h4>
        </header>
      </div>
    );
  }


  const selectCart = (id, quantity, sign)=>{
    if(sign ==="+"){
      const addQuantity = quantity + 1
      dispatch(increaseCart({ id, quantity: addQuantity}))

    }else{
      const minusQuantity = quantity - 1
      dispatch(decreaseCart({ id, quantity: minusQuantity}))

    }
    
dispatch(updater())
console.log('increased or decreased')
  }
const handleDelete = (id)=>{
   dispatch(removeItem(id));
  dispatch(updater()) 
}
  return (
    <>
      <div className="cart-div flex-center ">
        <div className=' cart-inner-div'>

       
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>name</th>
              <th>Price</th>              
              <th>Total</th>
              <th>Quantity</th>


            </tr>
          </thead>
          <tbody>
            {cartItems.map((cart) => (
            <tr>
              <td>
                <div className="cart-img">
                  <img src={cart.product.image} />
                </div>
              </td>
              <td>
                <p>
                  {cart.product.name}
                </p>
              </td>
            <td>
            <p>{cart.product.price}</p>
            </td>
            <td>
              <p>{cart.total}</p>
            </td>
          
            <td>
            <div className='cart-btn'>
                <div className='cart-btn-div flex-center space'>

              
              <button className='btn change' 
              onClick={()=> {
                selectCart(cart.id, cart.quantity, '-' )
              cart.quantity ===1 && dispatch(removeItem(cart.id))}}
           
              >
                -
              </button>
              <span className='cart-count'>
              
              {cart.quantity}
              </span>
              
              <button className='btn change' 
              type="button" 
              onClick={()=> selectCart(cart.id, cart.quantity, '+' )}
              
              >
                +
                </button>
              </div>
              </div>
            </td>
            <td>
            <button className=' btn m-h4' onClick={()=> handleDelete(cart.id)}> remove</button>

            </td>
          </tr>
           
          ))}
           </tbody>
        {/* </ul> */}
        </table>

        <div className='clear'>
        <button 
        className='m-h4 btn' 
        type="button" 
        onClick={() => dispatch(openModal())}>
          clear cart 
        </button>

        </div>
      </div>
      <div className='cart-side'>
                <div className='flex-space'><h2>Order Summary</h2></div>
                <div className='flex-space'><span>subtotal</span><span>{total}</span></div>
                <div className='flex-space total'><span>Total</span><span className=''>{total}</span></div>
                <div>
                <NavLink to={"/checkout"} className='btn'> CHECKOUT</NavLink>


                </div>

      </div>
      </div>
    </>
  );
};

export default Cart;
