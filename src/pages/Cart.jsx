import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  getLocalCart, removeItem, updateQty, updater,
} from '../redux/cart/cart';

import { openModal } from '../redux/modal/modal';
import { closeNav } from '../redux/modal/nav';
import { closeList } from '../redux/products/searched';
import { nairaFormat } from '../utils/nairaFormat';
import { fetchToken } from '../hooks/localStorage';

const Cart = () => {
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems, total, update } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getLocalCart());
  }, [update]);

  // if ((!user && !loading && !fetchToken())) {
  //   navigate('/auth/login', { state: { from: location.pathname } });
  // }

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

  console.log(cartItems)
  if (cartItems.length < 1) {
    return (
      <div className="warning-center product-container">

        <h2> Add to Cart</h2>
        <h4> You cart is currently empty</h4>

      </div>
    );
  }

  return (
    <>
      <div className="cart-div  my-4 px-4 gap-4 bg-white flex justify-between m-auto max-w-[1500px] min-h-[70%]">
        <div className="overflow-x-scroll flex-1 cart-inner-div">

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
                    <div className="cart-img m-auto shrink-0 w-36  ">
                      <img src={cart.image} className="w-full h-full" />
                    </div>
                  </td>
                  <td data-cell="name" className="whitespace-nowrap border-b border-gray-200 block px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-medium">
                    <p>
                      {cart.product_name}
                    </p>
                  </td>
                  <td data-cell="price" className="whitespace-nowrap border-b font- border-gray-200 block px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-medium">
                    <p>{nairaFormat(cart.price)}</p>
                  </td>
                  <td data-cell="total" className="whitespace-nowrap border-b border-gray-200 block px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-medium">
                    <p>{nairaFormat(cart.subTotal)}</p>
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
        <div className="cart-side md:w-72 shrink-0  py-4 px-2 border rounded-lg">
          <div className="flex justify-between items-center"><h2 className="mb-4">Order Summary</h2></div>
          <div className="flex justify-between items-center my-1">
            <span className="text-lg">Subtotal</span>
            <span className="text-gray font-semibold">{nairaFormat(total)}</span>
          </div>
          <div className="flex justify-between items-center my-2">
            <span className="text-lg">Shipping</span>
            <span className="text-gray font-semibold">--</span>
          </div>
          <div className="flex justify-between items-center total my-1">
            <span className="text-xl">Total</span>
            <span className=" text-gray font-bold">{nairaFormat(total)}</span>
          </div>
          <div>
            <NavLink to="/checkout" className="btn"> CHECKOUT</NavLink>

          </div>

        </div>
      </div>
    </>
  );
};

export default Cart;
