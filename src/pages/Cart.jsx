import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { nairaFormat } from '../utils/nairaFormat';
import Nav from '../components/nav/Nav';
import Modal from '../components/modal/Modal';
import Button from '../components/buttons/Button';
import {
  deleteCartItem, emptyCart, getUserCart, updateQuantity,
} from '../redux/actions/cart';
import Container from '../components/container';

const Cart = () => {
  // const { user, loading } = useSelector((state) => state.user);
  const { cartItems, total } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // dispatch(closeList());
    dispatch(getUserCart());
  }, []);

  // if ((!user && !loading && !fetchToken())) {
  //   navigate('/auth/login', { state: { from: location.pathname } });
  // }

  const selectCart = (id, quantity, sign) => {
    if (sign === '+') {
      const addQuantity = quantity + 1;
      dispatch(updateQuantity({ id, quantity: addQuantity }));
    } else if (quantity !== 1) {
      const minusQuantity = quantity - 1;
      dispatch(updateQuantity({ id, quantity: minusQuantity }));
    } else {
      quantity;
      dispatch(updateQuantity({ id, quantity }));
    }
  };
  const handleDelete = (id) => {
    dispatch(deleteCartItem(id));
  };

  console.log(cartItems);

  return (
    <>
      <Nav />
      <Container>

        {cartItems.length < 1
          ? (
            <div className="warning-center product-container">

              <h2> Add to Cart</h2>
              <h4> You cart is currently empty</h4>

            </div>
          )
          : (
            <div className="cart-div  my-4 px-4 gap-4 bg-white flex justify-between m-auto max-w-[1500px] min-h-[70%]">
              <div className="overflow-x-scroll flex-1 cart-inner-div">

                <div className="md:hidden space-y-4 px-4">
                  {cartItems?.map((cart) => (
                    <div
                      key={cart?.id}
                      className="bg-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4"
                    >
                      <img src={cart?.image} className="w-36 h-36 object-contain rounded-full" />

                      <div className="flex-1">
                        <p className="text-gray-700 font-semibold text-center">{cart?.product_name}</p>
                        <p className="text-gray-600 mt-1 text-center">
                          Size:
                          {' '}
                          {cart?.size}
                        </p>
                        <p className="text-lg text-gray-700 font-semibold mt-2 text-center">

                          {nairaFormat(cart?.price)}
                        </p>

                        <div className="flex items-center justify-center gap-2 mt-2">
                          <button
                            className="w-8 h-8 flex items-center justify-center bg-gray-600 text-white rounded-full"
                            onClick={() => {
                              selectCart(cart.id, cart.quantity, '-');
                              cart?.quantity === 1 && dispatch(deleteCartItem(cart?.id));
                            }}
                          >
                            -
                          </button>
                          <span className="font-semibold">{cart?.quantity}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center bg-gray-600 text-white rounded-full"
                            onClick={() => selectCart(cart?.id, cart?.quantity, '+')}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button onClick={() => handleDelete(cart?.id)}>
                        <MdClose className="text-2xl text-gray-600" />
                      </button>
                    </div>
                  ))}

                  <div className="text-right mt-4">
                    <button
                      className="w-full md:w-auto flex items-center justify-center gap-2 font-semibold text-theme rounded py-2.5 shadow-lg border border-theme-light hover:bg-theme-light hover:text-white transition-all duration-300"
                      type="button"
                      onClick={() => setOpen(true)}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                <table className="hidden md:table md:border-separate md:border-spacing-y-4 w-full">
                  <caption className="py-6 text-lg text-left px-4 font-semibold text-gray-600">Your Shopping Cart Items</caption>
                  <thead>
                    <tr>
                      <th className="hidden lg:table-cell" />
                      <th className="hidden lg:table-cell sticky top-0  z-10 border-gray-200/50  bg-opacity-75 px-3 py-3.5 pr-3 text-left font-semibold  backdrop-blur backdrop-filter" />
                      <th className=" hidden lg:table-cell sticky top-0  z-10 border-gray-200/50  bg-opacity-75 px-3 py-3.5 pr-3 text-right font-semibold  backdrop-blur backdrop-filter">Price</th>
                      <th className="hidden lg:table-cell sticky top-0  z-10 border-gray-200/50  bg-opacity-75 px-3 py-3.5 pr-3 text-right font-semibold  backdrop-blur backdrop-filter"> Quantity</th>
                      <th className="hidden lg:table-cell sticky top-0  z-10 border-gray-200/50  bg-opacity-75 px-3 py-3.5 pr-3 text-left font-semibold  backdrop-blur backdrop-filter" />
                      <th className="hidden lg:table-cell" />

                    </tr>
                  </thead>
                  <tbody className="">
                    {cartItems?.map((cart) => (
                      <tr key={cart.product_name} className="grid grid-cols-1 w-full items-center md:table-row lg:grid-cols-0">
                        <td data-cell="image" className="flex w-full md:w-36 md:table-cell whitespace-nowrap  mb-4 overflow-hidden bg-gray-100  py-3 text-sm text-gray-600/90 font-normal">
                          <div className="cart-img m-auto shrink-1 p-4 flex  ">
                            <img src={cart?.image} className="w-36 h-36 shrink-0 object-fill " />
                          </div>
                        </td>
                        <td data-cell="name" className="md:table-cell whitespace-nowrap  bg-gray-100  pl-3 py-3 text-sm text-gray-900 font-medium">
                          <p className="text-gray-700 font-semibold">
                            {cart?.product_name}

                          </p>
                          <p className="text-gray-700 text-sm font-semibold">
                            <span className="mr-3 font-semibold text-xs text-gray-500">Colour: </span>

                            {cart?.colours}

                          </p>
                          <p>
                            <span className="mr-3 font-semibold text-gray-500 text-xs">Size: </span>
                            {cart?.size }
                          </p>
                        </td>
                        <td data-cell="price" className="md:table-cell whitespace-nowrap text-right bg-gray-100 px-3 py-3 ">
                          {(cart?.discount || cart?.discount_amount) && <p className="text-sm text-gray-700 font-normal line-through">{nairaFormat(cart?.discount ?? cart?.discount_amount)}</p>}
                          <p className="text-base text-gray-700 font-semibold">{nairaFormat(cart?.price)}</p>

                        </td>

                        <td data-cell="quantity" className=" md:table-cell whitespace-nowrap bg-gray-100  px-3 py-3 text-sm text-gray-600/90 font-normal text-right">
                          <div className="border ml-auto border-gray-400 rounded-lg w-16">
                            <div className="flex  justify-between px-2 items-center ">

                              <span className="cart- font-semibold ">

                                {cart?.quantity}
                              </span>
                              <div className="ml-4">

                                <span
                                  className="text-center flex items-center justify-center w-5 h-4 cursor-pointer text-gray-600"
                                  onClick={() => {
                                    selectCart(cart.id, cart.quantity, '-');
                                    cart?.quantity === 1 && dispatch(deleteCartItem(cart?.id));
                                  }}
                                >
                                  <IoIosArrowUp />
                                </span>

                                <span
                                  className="text-center flex items-center justify-center w-5 h-4 cursor-pointer text-gray-600"
                                  type="button"
                          // onClick={() => selectCart(cart.id, cart.quantity, '+')}
                                  onClick={() => selectCart(cart?.id, cart?.quantity, '+')}
                                >
                                  <IoIosArrowDown />
                                </span>

                              </div>
                            </div>
                          </div>
                        </td>

                        <td className=" block sm:table-cell w-10 px-3 py-3 lg:table-cell text-sm text-gray-600/90 font-normal text-left">
                          <button className="" onClick={() => handleDelete(cart?.id)}>
                            {' '}
                            <MdClose className="text-2xl" />
                            {' '}
                          </button>

                        </td>
                      </tr>

                    ))}
                    <tr className="py-4 my-4">
                      <td />
                      <td />
                      <td />
                      <td className="text-right ">
                        <button
                          className="w-full mt-4 flex items-center justify-center gap-2 font-semibold text-theme rounded py-2.5 shadow-lg border border-theme-light hover:bg-theme-light  hover:text-white transition-all duration-300"
                          type="button"
                          onClick={() => setOpen(true)}
                        >
                          clear cart
                        </button>

                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="clear" />
              </div>
              <div className="cart-side md:w-72 shrink-0  py-4 px-2 border rounded-lg">
                <div className="flex justify-between items-center"><h2 className="mb-4 font-light">Order Summary</h2></div>
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
                  <Button onClick={() => navigate('/checkout')} className="btn"> CHECKOUT</Button>

                </div>

              </div>
            </div>
          )}

        <Modal open={open} setOpen={setOpen}>
          <h2 className="text-xl font-medium text-theme">Remove all items?</h2>
          <p className="text-gray-600">Are you sure you want to clear your shopping cart?</p>

          <div className="flex gap-3">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                dispatch(emptyCart());
                setOpen(false);
              }}
              className="flex-1 py-3 rounded-xl bg-theme text-white hover:bg-theme-light transition shadow-md"
            >
              Confirm
            </button>
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default Cart;
