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
import localDateString from '../../../utils/dateString';
import { toast } from 'react-toastify';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, message, loading } = useSelector((state) => state.orders);
  const [open, setOpen] = useState(false);
  const [objectId, setObjectId] = useState(null);
  const columnHelper = createColumnHelper();
  console.log(orders);
  const handleDelete = (id) => {
    dispatch(deleteOrder(id)).then((result) => {
      if (deleteOrder.fulfilled.match(result)) {
        setOpen(false);
        dispatch(getOrders());
       toast(result.payload.message, {type: "success"})
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
    columnHelper.display({
      id: 'serial',
      header: () => 'S/N',
      cell: (info) => (
        <span className="flex gap-3">
          {info.row.index + 1}
        </span>
      ),
    }),
    columnHelper.accessor('created_at', {
      header: () => 'Date',
      cell: (info) => (
        <span className="flex gap-3">
          { localDateString(info.getValue())}
          {!info.row.original.viewed && <span className="text-white rounded px-2 bg-orange-700">new</span>}
        </span>
      ),
      footer: (props) => props.column.id,
    }), columnHelper.accessor('billing_address.name', {
      header: () => 'Name',
      cell: (info) => (
        <span className="flex gap-3">
          {info.getValue() ?? (`${info.row.original.user?.first_name} ${info.row.original.user.last_name}`)}
          {!info.row.original.viewed && <span className="text-white rounded px-2 bg-orange-700">new</span>}
        </span>
      ),
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor('order_number', {
      header: () => 'Order ID',
      cell: (info) => (
        <span className="flex gap-3">
          {info.getValue() ?? (`${info.getValue()}`)}
        </span>
      ),
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: (info) => <StatusButton status={info.getValue()} />,
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor('total', {
      header: () => 'Total',
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
            console.log(id)
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

  console.log(objectId)

  return (
    <div className="order-container text-gray-800 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div>
        <h2 className="font-semibold text-lg text-gray-800 mb-4">Orders</h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-600">

            {/* Header */}
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup?.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-3">
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

            {/* Body */}
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr className="bg-gray-50">
                  <td colSpan="100%" className="px-4 py-6 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : (
                getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100 transition`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Confirmation
        open={open}
        onConfirm={() => {
          handleDelete(objectId);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        loading={loading}
      >
        Confirm Delete
      </Confirmation>
    </div>
  );
};

export default Orders;
