import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  createColumnHelper, flexRender, getCoreRowModel, useReactTable,
} from '@tanstack/react-table';
import { Button } from '@mui/material';
import Loader from '../../Loader';
import Confirmation from '../../../components/modal/Confirmation';
import OptionDropdown from '../../../components/optionsDropdown/OptionDropdown';
import { toggleAlert } from '../../../redux/app/app';
import { addDeliveryFee, deleteDeliveryFee, getDeliveryFees } from '../../../redux/actions/delivery_fee';
import { resetDeliveryFee } from '../../../redux/delivery_fee';
import InfoModal from '../../../components/modal/InfoModal';
import DeliveryForm from '../../../components/deliveryForm.jsx/DeliveryForm';
import { nairaFormat } from '../../../utils/nairaFormat';

const DeliveryFee = () => {
  const {
    deliveryFees, deliverFee, loading, status,
  } = useSelector((state) => state.deliveryFees);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [objectId, setObjectId] = useState(null);
  const [feeInput, setFeeInput] = useState({
    state: '',
    city: '',
    delivery_fee: '',
  });

  const handleFeeSubmit = () => {
    dispatch(addDeliveryFee({ delivery: feeInput })).then((result) => {
      if (deleteDeliveryFee.fulfilled.match(result)) {
        setOpen(false);
        dispatch(getDeliveryFees());
        dispatch(toggleAlert({
          isOpen: true,
          message: 'delivery location deleted',
          error: true,
        }));

        setTimeout(() => {
          resetDeliveryFee();
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
  // const handleOpen

  const handleDelete = (id) => {
    dispatch(deleteDeliveryFee(id)).then((result) => {
      if (deleteDeliveryFee.fulfilled.match(result)) {
        setOpen(false);
        dispatch(getDeliveryFees());
        dispatch(toggleAlert({
          isOpen: true,
          message: 'delivery location deleted',
          error: true,
        }));

        setTimeout(() => {
          resetDeliveryFee();
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
    dispatch(getDeliveryFees());
  }, []);

  const columns = useMemo(() => [
    columnHelper.accessor('state', {
      header: () => 'State',
      cell: (info) => <span className="flex gap-3 capitalize font-semibold text-gray-600">{info.getValue()}</span>,
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('city', {
      header: () => 'City',
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor('delivery_fee', {
      header: () => 'Delivery Fee',
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
          link="delivery-fee"
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
    data: deliveryFees,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="order-container text-gray-800 bg-white p-4 rounded">

      <div className="flex justify-end my-5">
        <Button classes="ml-auto my-10 block" onClick={() => { setOpen(true); }} variant="contained">Add Delivery Fee</Button>

      </div>

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

      <InfoModal open={open} handleClose={() => dispatch(getDeliveryFees())}>
        <DeliveryForm handleFeeSubmit={handleFeeSubmit} feeInput={feeInput} setFeeInput={setFeeInput} />
      </InfoModal>
    </div>
  );
};

export default DeliveryFee;
