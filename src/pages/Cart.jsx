import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLocalCart, removeItem, updateQty, updater } from '../redux/cart/cart';
import {
  decreaseCart, increaseCart, getCarts,
} from '../redux/actions/cart';
import { openModal } from '../redux/modal/modal';
import { addOrder } from '../redux/actions/orders';
import { closeNav } from '../redux/modal/nav';
import { closeList } from '../redux/products/searched';
import { naira_format } from '../components/utils/naira_format';

const Cart = () => {
  const { cartItems, total, update } = useSelector((state) => state.cart);
  const { status } = useSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems = () => cartItems.map((item) => (
    {
      product_id: item.product_id,
      quantity: item.quantity,
    }

  ));
  useEffect(() => {
    dispatch(closeNav());
    dispatch(closeList());
    dispatch(getLocalCart());
    // dispatch(getCarts())
  }, [update]);

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
  console.log(cartItems)
  return (
    <>
      <div className="cart-div">
        <div className=" cart-inner-div">

          <table>
            <thead>
              <tr>
                <th ></th>
                <th >name</th>
                <th >Price</th>
                <th>Total</th>
                <th>Quantity</th>
                <th></th>

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
                      {cart.product_name}
                    </p>
                  </td>
                  <td className='text-base'>
                    <p>{naira_format(cart.price)}</p>
                  </td>
                  <td>
                    <p>{naira_format(cart.subTotal)}</p>
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
                  <td className=''>
                    <button className="btn block" onClick={() => handleDelete(cart.product_id)}> remove</button>

                  </td>
                </tr>

              ))}
            </tbody>
          </table>

          <div className="clear">
            <button
              className="btn"
              type="button"
              onClick={() => dispatch(openModal())}
            >
              clear cart
            </button>

          </div>
        </div>
        <div className="cart-side">
          <div className="flex-space"><h2 className='mb-4'>Order Summary</h2></div>
          <div className="flex-space my-1">
            <span className='text-xl'>Subtotal</span>
            <span className='text-gray font-semibold'>{naira_format(total)}</span>
          </div>
          <div className="flex-space total my-1">
            <span className='text-xl'>Total</span>
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
