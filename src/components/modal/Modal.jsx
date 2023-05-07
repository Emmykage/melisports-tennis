import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/actions/cart';
import { updater } from '../../redux/cart/cart';
import { closeModal } from '../../redux/modal/modal';

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <div className="modal-container">
      <div>X</div>
      <div className="modal">
        <h4 className="center">remove all item from shopping cart?</h4>
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
