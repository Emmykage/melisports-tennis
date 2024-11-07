import React, {
  useState, useEffect, useMemo, useRef,
} from 'react';
import OrderDetail from './OrderDetail';
import './order.css';
import { useDispatch, useSelector } from 'react-redux';

import {
  createColumnHelper, flexRender, getCoreRowModel, useReactTable,
} from '@tanstack/react-table';

import { deleteOrder, getOrders } from '../../../redux/actions/orders';
import OptionDropdown from '../../optionsDropdown/OptionDropdown';
import Confirmation from '../../modal/Confirmation';
import { toggleAlert } from '../../../redux/app/app';
import { resetOrder } from '../../../redux/order/order';
import Loader from '../../../pages/Loader';
import { nairaFormat } from '../../../utils/nairaFormat';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, message, loading } = useSelector((state) => state.orders);
  const [open, setOpen] = useState(false);
  const [objectId, setObjectId] = useState(null);
  const columnHelper = createColumnHelper();


  const statusStyle = (status) =>{
    switch (status) {
      case "declined":
        return "bg-red-200 text-red-800"
        
      case "confirmed":
        return "bg-green-200 text-green-800"
        
      case "pending":
        return "bg-orange-200 text-orange-800"       
          
      default:
        return "bg-orange-200 text-orange-800"           }
  }

  const handleDelete = (id) => {
    dispatch(deleteOrder(id)).then((result) => {
      if (deleteOrder.fulfilled.match(result)) {
        setOpen(false);
        dispatch(getOrders())
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
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('status', {
      cell: (info) => <span className={` px-4 py-0.5 rounded text-xs ${statusStyle(info.getValue())}`}>{info.getValue()}</span>,
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor('total', {
      cell: (info) =>  <span className='font-semibold '> {nairaFormat(info.getValue())} </span> ,
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('id', {
      header: () => 'Action',
      cell: (info) => (
        <OptionDropdown
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
  }, [message]);
  return (
    <div className="order-container bg-white p-4 rounded">

      <div>
        <table className="order">
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
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
