import React, {
  useState, useEffect, useMemo,
} from 'react';
import './order.css';
import { useDispatch, useSelector } from 'react-redux';

import {
  createColumnHelper, flexRender, getCoreRowModel, useReactTable,
} from '@tanstack/react-table';

import { deleteOrder, getOrders } from '../../../redux/actions/orders';
import OptionDropdown from '../../../components/optionsDropdown/OptionDropdown';
import Confirmation from '../../../components/modal/Confirmation';
import { toggleAlert } from '../../../redux/app/app';
import { resetOrder } from '../../../redux/order/order';
import Loader from '../../Loader';
import { nairaFormat } from '../../../utils/nairaFormat';
import StatusButton from '../../../components/buttons/StatusButton';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, message, loading } = useSelector((state) => state.orders);
  const [open, setOpen] = useState(false);
  const [objectId, setObjectId] = useState(null);
  const columnHelper = createColumnHelper();
  console.log(orders)
  const handleDelete = (id) => {
    dispatch(deleteOrder(id)).then((result) => {
      if (deleteOrder.fulfilled.match(result)) {
        setOpen(false);
        dispatch(getOrders());
        dispatch(toggleAlert({
          isOpen: true,
          message: result.payload.message,
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
          resetOrder();
          dispatch(toggleAlert({
            isOpen: false,
            message: null,
            error: false,
          }));
        }, 5000);
      }
    });
  };

  const columns = useMemo(() => [
    columnHelper.accessor('billing_address.name', {
      header: () => 'Name',
      cell: (info) => (
        <span className="flex gap-3">
          {info.getValue() ?? (`${info.row.original.user.first_name} ${info.row.original.user.last_name}`)}
          {!info.row.original.viewed && <span className="text-white rounded px-2 bg-orange-700">new</span>}
        </span>
      ),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('status', {
      header: () => "Status",
      cell: (info) => <StatusButton status={info.getValue()} />,
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor('total', {
      header: () => "Total",
      cell: (info) => (
        <span className="font-semibold ">
          {' '}
          {nairaFormat(info.getValue())}
          {' '}
        </span>
      ),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('id', {
      header: () => 'Action',
      cell: (info) => (
        <OptionDropdown
          link="orders"

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
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="order-container text-gray-800 bg-white p-4 rounded">

      <div>
        <table className="order"> 
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className='text-gray-700 bg-gray-200'>
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
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>

        </table>
      </div>

      <Confirmation open={open} btnAction={() => { handleDelete(objectId); }} cnlAction={() => { setOpen(false); }} loading={loading}>
        Confirm Delete
      </Confirmation>
    </div>
  );
};

export default Orders;
