import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCart, updater } from '../../redux/cart/cart';

import { closeModal } from '../../redux/modal/modal';
import Button from '../buttons/Button';

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <div className="modal-container">
      <div className="modal">
        <h3 className="center font-normal text-xl my-4">remove all items from shopping cart?</h3>
        <div className="btn-container">
          <Button
 
            btnFunc={() => {
              dispatch(clearCart());
              dispatch(closeModal());
              dispatch(updater());
            }}
          >
            confirm
          </Button>

          <Button
            type="cancel"
            className="btn confirm-btn"
            btnFunc={() => dispatch(closeModal())}
          >
            cancel
          </Button>
        </div>
      </div>

    </div>
  );
};

export default Modal;
