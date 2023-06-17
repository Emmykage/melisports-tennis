import React from 'react';
// import { BsCartDash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
// import { addOrder } from '../redux/actions/orders';
import StripeContainer from './StripeContainer';

const Checkout = () => {
  // const dispatch = useDispatch();
  const { total, cartItems, counter } = useSelector((state) => state.cart);
  // const [state, setState] = useState({});
  // const [showItem, setShowItem] = useState(false)

  // const orderItems = cartItems.map((item) => (
  //   {
  //     product_id: item.product_id,
  //     quantity: item.quantity,
  //   }

  // ));

  // const handlePurchase = (e) => {
  //   e.preventDefault();
  //   setState({
  //     order_detail: {
  //       total,
  //       order_items_attributes: orderItems,
  //     },
  //   });

  //   dispatch(addOrder(state));
  // };
  return (
    <div className="checkout">
      <div className=" col-left">
        <h2>Billings </h2>
        <form action="">
          

        </form>
        <div>
        <h1> The store</h1>
        <StripeContainer total_cost={total}/>
        {/* {showItem ? <StripeContainer total_cost={total}/> : <><h3>{total}</h3><button onClick={()=> setShowItem(true) }>Purchase Product</button> </> } */}
      </div>

      </div>
      <div className="col-right">
        <h3> Order summary</h3>
        <ul>
          <li className="flex">
            <span>
              {' '}
              {counter}
              {' '}
              items
            </span>
          </li>
          <hr />
          <li className="flex-space">
            <span> SUBTOTAL</span>
            {' '}
            <span>{total}</span>
          </li>
          <hr />
          <li className="flex-space">
            <span> CART TOTAL</span>
            <span>{total}</span>
          </li>
        </ul>

      </div>
      

    </div>
  );
};

export default Checkout;
