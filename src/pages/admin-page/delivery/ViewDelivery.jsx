import React, { useState, useEffect } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUsers, updateUser } from '../../../redux/actions/auth';
import { updateUserInput } from '../../../redux/users/user';
import { getDeliveryFee, updateDeliveryFee } from '../../../redux/actions/delivery_fee';
import { resetDeliveryFee, updateFeeInput } from '../../../redux/delivery_fee';
import { toggleAlert } from '../../../redux/app/app';
// import { updateUserInput } from '../../../redux/user/user'

const ViewDeliveryFee = () => {
  const { deliveryFee, loading } = useSelector((state) => state.deliveryFees);

  const { id } = useParams();
  const dispatch = useDispatch();
  const [feeInput, setFeeInput] = useState({
    state: "",
    city: "",
    delivery_fee: ""
})

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateDeliveryFee({
      id,
      delivery: {
        state: deliveryFee.state, city: deliveryFee.city, delivery_fee: deliveryFee.delivery_fee,
      },
    })).then(result => {
    
            if(updateDeliveryFee.fulfilled.match(result)){
              dispatch(getDeliveryFee(id))

              dispatch(toggleAlert({
                isOpen: true,
                message: "delivery location update",
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
      
      }else{
        dispatch(getDeliveryFee(id))
        dispatch(toggleAlert({
          isOpen: true,
          message: "failed to update location update",
          error: true,
        }));
  
        setTimeout(() => {
          // resetDeliveryFee();
          dispatch(toggleAlert({
            isOpen: false,
            message: null,
            error: false,
          }));
        }, 5000);

      }
    }
    );
  };

  useEffect(() => {
    dispatch(getDeliveryFee(id));
  }, []);

  return (
    <div className=" w-full">
      <div className="customer-v dash-container">
        <form onSubmit={handleUpdate} className="">
          <div className="flex c-form-row justify-between mt-4">
            <label htmlFor="first_name">State</label>
            <input type="text" name="state" id="state" value={deliveryFee?.state} 
            onChange={(e) => dispatch(updateFeeInput(e.target))}
             />
          </div>
          <div className="flex c-form-row justify-between my-2">
            <label htmlFor="first_name">City</label>
            <input type="text" name="last_name" id="last_name" value={deliveryFee?.city} 
            onChange={(e) => dispatch(updateFeeInput(e.target))} 
            />
          </div>
          <div className="flex c-form-row justify-between my-2">
            <label htmlFor="fee">Fee</label>
            <input type="number" name="fee" id="fee" value={deliveryFee?.delivery_fee} onChange={(e) => dispatch(updateFeeInput(e.target))} />
          </div>
      

          <button type="submit" className="px-3 py-1 rounded border my-2 block ml-auto"> Submit</button>
        </form>

      </div>

    </div>
  );
};

export default ViewDeliveryFee;
