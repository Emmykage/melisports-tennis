import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/actions/product';
import { closeDelModal } from '../../redux/modal/delModal';
import { closeLoader, setLoader } from '../../redux/app/app';

const ProdDelModal = (props) => {
  const {
    id, onCancel, selectedProduct, open, setSelectedProduct,
  } = props;
  const dispatch = useDispatch();
  // const {isOpen, id} = useSelector((state) => state.delModal)

  if (!open) {
    return null;
  }
  return (
    <>

      <div
        onClick={() => setSelectedProduct(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-lg w-96 p-6 z-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Confirm Delete
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete
            {' '}
            <span className="font-bold">{selectedProduct?.name}</span>
            ? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => {
                dispatch(setLoader());
                dispatch(deleteProduct(selectedProduct?.id)).then((result) => {
                  if (deleteProduct.fulfilled.match(result)) {
                    dispatch(getProducts());
                    setSelectedProduct(null);
                    dispatch(closeLoader());
                  } else {
                    dispatch(closeLoader());
                  }
                });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>

    </>

  );
};

export default ProdDelModal;
