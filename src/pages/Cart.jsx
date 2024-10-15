import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getLocalCart, removeItem, updateQty, updater,
} from '../redux/cart/cart';
import {
  decreaseCart, increaseCart, getCarts,
} from '../redux/actions/cart';
import { openModal } from '../redux/modal/modal';
import { addOrder } from '../redux/actions/orders';
import { closeNav } from '../redux/modal/nav';
import { closeList } from '../redux/products/searched';
import { naira_format } from '../utils/naira_format';
import { fetchToken } from '../hooks/localStorage';

const Cart = () => {
  const {user } = useSelector(state => state.user)
  const { cartItems, total, update } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();

const location = useLocation()
  const orderItems = () => cartItems.map((item) => (
    {
      product_id: item.product_id,
      quantity: item.quantity,
      amount: item.price
    }

  ));
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getLocalCart());
    // dispatch(getCarts())
  }, [update]);

  // console.log(user)

  useEffect(() => {
    (!user && fetchToken()) && navigate('/auth/login', {state: {from: location.pathname}})
  }, []) 

  const handleCheckout = () => {
    dispatch(addOrder(data));
  };

  status == 'success' && navigate('/checkout');

  const data = {
    order_detail: {
      total,
      order_items_attributes: orderItems(),
      status: 'pending',
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
    } else if (quantity !== 1) {
      const minusQuantity = quantity - 1;
      dispatch(updateQty({ product_id: id, quantity: minusQuantity }));
    } else {
      quantity;
      dispatch(updateQty({ product_id: id, quantity }));
    }

    dispatch(updater());
  };
  const handleDelete = (id) => {
    dispatch(removeItem(id));
    dispatch(updater());
  };

  return (
    <>
      <div className="cart-div bg-white">
        <div className=" cart-inner-div">

          <table>
            <caption className="py-6 text-lg bg-gray-200">Cart Items</caption>
            <thead>
              <tr>
                <th className="hidden lg:table-cell" />
                <th className="hidden lg:table-cell sticky top-0  z-10 border-b border-gray-200/50  bg-opacity-75 px-3 py-3.5 pr-3 text-left font-semibold  backdrop-blur backdrop-filter">name</th>
                <th className=" hidden lg:table-cell sticky top-0  z-10 border-b border-gray-200/50  bg-opacity-75 px-3 py-3.5 pr-3 text-left font-semibold  backdrop-blur backdrop-filter">Price</th>
                <th className="hidden lg:table-cell sticky top-0  z-10 border-b border-gray-200/50  bg-opacity-75 px-3 py-3.5 pr-3 text-left font-semibold  backdrop-blur backdrop-filter">Total</th>
                <th className="hidden lg:table-cell sticky top-0  z-10 border-b border-gray-200/50  bg-opacity-75 px-3 py-3.5 pr-3 text-left font-semibold  backdrop-blur backdrop-filter">Quantity</th>
                <th className="hidden lg:table-cell" />

              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart) => (
                <tr>
                  <td data-cell="image" className="whitespace-nowrap border-b border-gray-200 block px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-normal">
                    <div className="cart-img">
                      <img src={cart.image} />
                    </div>
                  </td>
                  <td data-cell="name" className="whitespace-nowrap border-b border-gray-200 block px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-normal">
                    <p>
                      {cart.product_name}
                    </p>
                  </td>
                  <td data-cell="price" className="whitespace-nowrap border-b border-gray-200 block px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-normal">
                    <p>{naira_format(cart.price)}</p>
                  </td>
                  <td data-cell="total" className="whitespace-nowrap border-b border-gray-200 block px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-normal">
                    <p>{naira_format(cart.subTotal)}</p>
                  </td>

                  <td data-cell="quantity" className="whitespace-nowrap border-b border-gray-200 block px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-normal">
                    <div className="cart-btn ">
                      <div className="cart-btn-div flex space bg-green-400">

                        <button
                          className="btn change px-2"
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
                  <td className="whitespace-nowrap block sm:table-cell border-b border-gray-200 px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-normal">
                    <button className="btn block" onClick={() => handleDelete(cart.product_id)}> remove</button>

                  </td>
                </tr>

              ))}
            </tbody>
          </table>

          <div className="clear">
            <button
              className="btn "
              type="button"
              onClick={() => dispatch(openModal())}
            >
              clear cart
            </button>

          </div>
        </div>
        <div className="cart-side">
          <div className="flex justify-between items-center"><h2 className="mb-4">Order Summary</h2></div>
          <div className="flex justify-between items-center my-1">
            <span className="text-xl">Subtotal</span>
            <span className="text-gray font-semibold">{naira_format(total)}</span>
          </div>
          <div className="flex justify-between items-center total my-1">
            <span className="text-xl">Total</span>
            <span className=" text-gray font-bold">{naira_format(total)}</span>
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
