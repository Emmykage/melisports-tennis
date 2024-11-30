import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUsers, updateUser } from '../../../redux/actions/auth';
import { updateUserInput } from '../../../redux/users/user';
import { updateDeliveryFee } from '../../../redux/actions/delivery_fee';
// import { updateUserInput } from '../../../redux/user/user'

const ViewDeliveryFee = () => {
  const { deliveryFee, loading } = useSelector((state) => state.deliveryFee);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateDeliveryFee({
      id,
      delivery: {
        state: state, city, fee,
      },
    }));
  };
  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  return (
    <div className=" w-full">
      <div className="customer-v dash-container">
        <form onSubmit={handleUpdate} className="">
          <div className="flex c-form-row justify-between mt-4">
            <label htmlFor="first_name">State</label>
            <input type="text" name="state" id="state" value={deliveryFee?.state} 
            // onChange={(e) => dispatch(updateUserInput(e.target))}
             />
          </div>
          <div className="flex c-form-row justify-between my-2">
            <label htmlFor="first_name">City</label>
            <input type="text" name="last_name" id="last_name" value={deliveryFee?.city} 
            // onChange={(e) => dispatch(updateUserInput(e.target))} 
            />
          </div>
          <div className="flex c-form-row justify-between my-2">
            <label htmlFor="fee">Fee</label>
            <input type="number" name="fee" id="fee" value={user?.email} onChange={(e) => dispatch(updateUserInput(e.target))} />
          </div>
          {/* <div className="flex c-form-row justify-between">
            <label htmlFor="role">Role</label>
            <select name="role" id="" value={user?.role} 
            // onChange={(e) => dispatch(updateUserInput(e.target))}
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div> */}

          <button type="submit" className="px-3 py-1 rounded border my-2 block ml-auto"> Submit</button>
        </form>

      </div>

    </div>
  );
};

export default ViewDeliveryFee;
