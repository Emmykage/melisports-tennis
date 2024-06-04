import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { delUsers, getUsers } from '../../../redux/actions/auth';

const Customers = () => {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  console.log(users);
  return (
    <div className="w-full">
      <h1 className="bolder">     </h1>

      <div className="">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-2">name</th>
              <th className="px-2 text-center">Email</th>
              <th className="px-2 text-center">Role</th>
              <th className="px-2 text-center" />

            </tr>

          </thead>
          <tbody className="text-white">
            {users.map((user) => (
              <tr className="text-dark">
                <td className="font-semibold">{user.full_name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {' '}
                  <a className="cursor-pointer" onClick={() => dispatch(delUsers(user.id))}>delete</a>
                  {' '}
                  <NavLink to={`/admin/customers/${user.id}`}>view</NavLink>
                </td>
                {/* <td className={order.shipping === 'Declined' ? 'danger' : order.shipping === 'pending' ? 'warning' : 'primary'}>{order.shipping}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Customers;
