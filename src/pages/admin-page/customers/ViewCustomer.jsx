import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUsers, updateUser } from '../../../redux/actions/auth';
import { updateUserInput } from '../../../redux/users/user';
// import { updateUserInput } from '../../../redux/user/user'

const ViewCustomer = () => {
  const { user, loading } = useSelector((state) => state.users);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleUserUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({
      id,
      user: {
        first_name: user.first_name, last_name: user.last_name, role: user.role, email: user.email,
      },
    }));
  };
  useEffect(() => {
    dispatch(getUser(id));
  }, []);

  return (
    <div className=" w-full">
      <div className="customer-v dash-container">
        <form onSubmit={handleUserUpdate} className="">
          <div className="mt-4">
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" id="first_name" value={user?.first_name} onChange={(e) => dispatch(updateUserInput(e.target))} />
          </div>
          <div className=" my-2">
            <label htmlFor="first_name">Last Name</label>
            <input type="text" name="last_name" id="last_name" value={user?.last_name} onChange={(e) => dispatch(updateUserInput(e.target))} />
          </div>
          <div className=" my-2">
            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email" value={user?.email} onChange={(e) => dispatch(updateUserInput(e.target))} />
          </div>
          <div className="my-2">
            <label htmlFor="role">Role</label>
            <select name="role" id="" value={user?.role} onChange={(e) => dispatch(updateUserInput(e.target))}>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>

          <button type="submit" className="px-3 py-1 rounded border my-2 block ml-auto"> Submit</button>
        </form>

      </div>

    </div>
  );
};

export default ViewCustomer;
