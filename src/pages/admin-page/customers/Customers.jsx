import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  createColumnHelper, flexRender, getCoreRowModel, useReactTable,
} from '@tanstack/react-table';
import { delUsers, getUsers } from '../../../redux/actions/auth';
import Loader from '../../Loader';
import Confirmation from '../../../components/modal/Confirmation';
import OptionDropdown from '../../../components/optionsDropdown/OptionDropdown';
import { toggleAlert } from '../../../redux/app/app';

const Customers = () => {
  const { users, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [objectId, setObjectId] = useState(null);

  const handleDelete = (id) => {
    dispatch(delUsers(id)).then((result) => {
      if (delUsers.fulfilled.match(result)) {
        setOpen(false);
        dispatch(getUsers());
        dispatch(toggleAlert({
          isOpen: true,
          message: 'user deleted',
          error: true,
        }));

        setTimeout(() => {
          resetOrder();
          dispatch(toggleAlert({
            isOpen: false,
            message: null,
            error: false,
          }));
        }, 5000);
      } else {
        dispatch(toggleAlert({
          isOpen: true,
          message: result.payload.message,
          error: true,
        }));
        setTimeout(() => {
          // resetOrder();
          dispatch(toggleAlert({
            isOpen: false,
            message: null,
            error: false,
          }));
        }, 5000);
      }
    });
  };

  const columnHelper = createColumnHelper();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const columns = useMemo(() => [
    columnHelper.accessor('name', {
      header: () => 'Name',
      cell: (info) => (
        <span className="flex gap-3 capitalize font-semibold  !text-gray-600">
          {info.row.original.last_name}
          {' '}
          {info.row.original.first_name}
        </span>
      ),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('email', {
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor('role', {
      cell: (info) => (
        <span className="font-semibold ">
          {' '}
          {info.getValue()}
          {' '}
        </span>
      ),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('id', {
      header: () => 'Action',
      cell: (info) => (
        <OptionDropdown
          link="customers"
          handleDel={(id) => {
            setOpen(true);
            setObjectId(id);
          }}
          id={info.getValue()}
          setOpen={setOpen}
        />
      ),
      footer: (props) => props.column.id,
    }),

  ]);
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(objectId);

  return (
    <div className="order-container text-gray-800 bg-white p-4 rounded">
      <h2 className="font-normal mb-4">Customers</h2>

      <div className="bg-red- overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th className="bg-gray-300 text-gray-900 px-4    py-3" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                  </th>
                ))}

              </tr>
            ))}

          </thead>
          <tbody>

            {loading
              ? (
                <tr className="w-full bg-gray-50">
                  <td colSpan="5">
                    <Loader />

                  </td>
                </tr>
              )
              : getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className="px-4 py-3 text-gray-500" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>

        </table>
      </div>

      <Confirmation open={open} onConfirm={() => { handleDelete(objectId); }} onCancel={() => { setOpen(false); }} loading={loading}>
        Delete User
      </Confirmation>
    </div>
  );
};

export default Customers;
