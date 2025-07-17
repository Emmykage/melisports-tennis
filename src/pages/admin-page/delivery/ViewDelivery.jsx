import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getDeliveryFee, updateDeliveryFee } from '../../../redux/actions/delivery_fee';
import { toggleAlert } from '../../../redux/app/app';

const ViewDeliveryFee = () => {
  const { deliveryFee, loading } = useSelector((state) => state.deliveryFees);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [feeInput, setFeeInput] = useState({
    state: '',
    city: '',
    delivery_fee: '',
  });


  useEffect(() => {
    setFeeInput({
      state: deliveryFee?.state || '',
      city: deliveryFee?.city || '',
      delivery_fee: deliveryFee?.delivery_fee || '',

    })
  }, [deliveryFee]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateDeliveryFee({
      id,
      delivery: {
        ...feeInput, // spread the feeInput state
      },
    })).then((result) => {
      if (updateDeliveryFee.fulfilled.match(result)) {
        dispatch(getDeliveryFee(id));

        dispatch(toggleAlert({
          isOpen: true,
          message: 'delivery location update',
          error: false,
        }));

        setTimeout(() => {
          // resetDeliveryFee();
          dispatch(toggleAlert({
            isOpen: false,
            message: null,
            error: false,
          }));
        }, 5000);
        navigate("/admin/delivery-fee?")
      } else {
        dispatch(getDeliveryFee(id));
        dispatch(toggleAlert({
          isOpen: true,
          message: 'failed to update location update',
          error: true,
        }));

        setTimeout(() => {
          dispatch(toggleAlert({
            isOpen: false,
            message: null,
            error: false,
          }));
        }, 5000);
      }
    });
  };

  useEffect(() => {
    dispatch(getDeliveryFee(id));
  }, []);

  return (
    <div className=" w-full">
      <div className="customer-v dash-container">
        <form onSubmit={handleUpdate} className="">
          <div className="mt-4">
            <label htmlFor="state">State</label>
            <input
                        className='block mt-2'

              type="text"
              name="state"
              id="state"
              value={feeInput?.state}
              onChange={(e) => setFeeInput({...feeInput, state: e.target.value})}
            />
          </div>
          <div className="my-2">
            <label htmlFor="city">City</label>
            <input
                        className='block mt-2'

              type="text"
              name="city"
              id="city"
              value={feeInput?.city}
              onChange={(e) => setFeeInput({...feeInput, city: e.target.value})}
            />
          </div>

          <div className=" my-2">
            <label htmlFor="fee">Fee (NGN)</label>
            <input
            className='block mt-2'
              type="number" name="fee" id="fee"    
              value={feeInput?.delivery_fee}

            onChange={(e) => setFeeInput({...feeInput, delivery_fee: e.target.value})}
            />
          </div>

           

                    

          <button type="submit" className="px-3 py-1 rounded border my-2 block ml-auto"> Submit</button>
        </form>

      </div>

    </div>
  );
};

export default ViewDeliveryFee;
