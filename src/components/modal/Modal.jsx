import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cart/cart';
import { updater } from '../../redux/cart/cart';
import { closeModal } from '../../redux/modal/modal';

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <div className="modal-container">
         <div className="modal">
        <h3 className="center">remove all items from shopping cart?</h3>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
              dispatch(updater());
            }}
          >
            confirm
          </button>

          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>

    </div>
  );
};

export default Modal;
