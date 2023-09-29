import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateQty, updater } from '../redux/cart/cart';
import {
  decreaseCart, increaseCart, removeItem, getCarts,
} from '../redux/actions/cart';
import { openModal } from '../redux/modal/modal';
// import {addOrder}
import { addOrder } from '../redux/actions/orders';
import { closeNav } from '../redux/modal/nav';
import { closeList } from '../redux/products/searched';

const Cart = () => {
  const { cartItems, total, update } = useSelector((state) => state.cart);
  const {status} = useSelector(state => state.orders)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems =() => cartItems.map((item) => (
    {
      product_id: item.product_id,
      quantity: item.quantity,
    }

  ));
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getCarts());
  }, [update]);
  
 
  const handleCheckout = () => {
 
    dispatch(addOrder(data));
    // navigate('/checkout');
  };

  status == "success" && navigate('/checkout') 

  const data = {
    order_detail: {
      total,
      order_items_attributes: orderItems(),
      status: "pending"
    },
  };

  if (cartItems.length < 1) {
    return (
      <div className="warning-center product-container">

        <h2> Add to Cart</h2>
        <h4> You cart is currently empty</h4>

      </div>
    );
  }

  const selectCart = (id, quantity, sign) => {
    if (sign === '+') {
      const addQuantity = quantity + 1;
      dispatch(updateQty({ product_id: id, quantity: addQuantity }));

    } else {
      if(quantity !== 1 ){ 
        const minusQuantity = quantity - 1;
        dispatch(updateQty({ product_id: id, quantity: minusQuantity }));
       }else{ 
        quantity
        dispatch(updateQty({ product_id: id, quantity }));
      }
      
    }

    dispatch(updater());
  };
  const handleDelete = (id) => {
    dispatch(removeItem(id));
    dispatch(updater());
  };
  return (
    <>
      <div className="cart-div">
        <div className=" cart-inner-div">

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
                      <img src={cart.image} />
                    </div>
                  </td>
                  <td>
                    <p>
                      {cart.name}
                    </p>
                  </td>
                  <td>
                    <p>{cart.price}</p>
                  </td>
                  <td>
                    <p>{cart.total}</p>
                  </td>

                  <td>
                    <div className="cart-btn">
                      <div className="cart-btn-div flex-center space">

                        <button
                          className="btn change"
                          onClick={() => {
                            selectCart(cart.product_id, cart.quantity, '-');
                            cart.quantity === 1 && dispatch(removeItem(cart.id));
                          }}
                        >
                          -
                        </button>
                        <span className="cart-count">

                          {cart.quantity}
                        </span>

                        <button
                          className="btn change"
                          type="button"
                          // onClick={() => selectCart(cart.id, cart.quantity, '+')}
                          onClick={() => selectCart(cart.product_id, cart.quantity, '+')}

                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className=" btn m-h4" onClick={() => handleDelete(cart.id)}> remove</button>

                  </td>
                </tr>

              ))}
            </tbody>
          </table>

          <div className="clear">
            <button
              className="m-h4 btn"
              type="button"
              onClick={() => dispatch(openModal())}
            >
              clear cart
            </button>

          </div>
        </div>
        <div className="cart-side">
          <div className="flex-space"><h2>Order Summary</h2></div>
          <div className="flex-space">
            <span>subtotal</span>
            <span>{total}</span>
          </div>
          <div className="flex-space total">
            <span>Total</span>
            <span className="">{total}</span>
          </div>
          <div>
            <a onClick={handleCheckout} className="btn"> CHECKOUT</a>

          </div>

        </div>
      </div>
    </>
  );
};

export default Cart;
