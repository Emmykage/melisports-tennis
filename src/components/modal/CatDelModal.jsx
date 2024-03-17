import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../redux/actions/product';
import { closeDelCatModal } from '../../redux/modal/catDelModal';
import { deleteCategory } from '../../redux/actions/product_category';

const CatDelModal = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  return (
    <div className="modal-container">
      <div className="modal">
        <h3>Delete Item</h3>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(deleteCategory(id));
              dispatch(closeDelCatModal());
            }}
          >
            confirm
          </button>

          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => dispatch(closeDelCatModal())}
          >
            cancel
          </button>
        </div>
      </div>

    </div>
  );
};

export default CatDelModal;
