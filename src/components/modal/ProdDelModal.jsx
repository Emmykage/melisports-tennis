import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../redux/actions/product';
import { updater } from '../../redux/cart/cart';
import { closeDelModal } from '../../redux/modal/delModal';

const ProdDelModal = (props) => {
    const {id} = props
    const dispatch = useDispatch();
    console.log(id)
    // const {isOpen, id} = useSelector((state) => state.delModal)
  return (
    <div className="modal-container">
      <div className="modal">
        <h3>Delete Item</h3>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(deleteProduct(id));
              dispatch(closeDelModal());
              dispatch(updater())
            }}
          >
            confirm
          </button>

          <button
            type="button"
            className="btn confirm-btn"
            onClick={()=> dispatch(closeDelModal())}
          >
            cancel
          </button>
        </div>
      </div>

    </div>

  )
}

export default ProdDelModal