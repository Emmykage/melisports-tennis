import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/actions/product';
import { closeDelModal } from '../../redux/modal/delModal';
import { closeLoader, setLoader } from '../../redux/app/app';

const ProdDelModal = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  // const {isOpen, id} = useSelector((state) => state.delModal)
  return (
    <div className="modal-container">
      <div className="modal">
        <h3 className="font-normal text-lg md:text-3xl">Delete Items</h3>
        <div className="py-5 btn-container">
          <button
            type="button"
            className="btn confirm-btn px-2 py-1"
            onClick={() => {
              dispatch(setLoader());
              dispatch(deleteProduct(id)).then((result) => {
                if (deleteProduct.fulfilled.match(result)) {
                  dispatch(getProducts());
                  dispatch(closeDelModal());
                  dispatch(closeLoader());
                } else {
                  dispatch(closeLoader());
                }
              });
            }}
          >
            confirm
          </button>

          <button
            type="button"
            className="btn confirm-btn px-2 py-1"
            onClick={() => dispatch(closeDelModal())}
          >
            cancel
          </button>
        </div>
      </div>

    </div>

  );
};

export default ProdDelModal;
