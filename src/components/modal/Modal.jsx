import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cart/cart';
import { closeModal } from '../../redux/modal/modal';

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all item from shopping cart?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            confirm
          </button>

          <button
            type="button"
            className="btn confirm-btn"
            onClick={dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>

    </aside>
  );
};

export default Modal;
