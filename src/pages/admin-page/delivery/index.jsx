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
import DeliveryForm from '../../../components/deliveryForm/DeliveryForm';
import { nairaFormat } from '../../../utils/nairaFormat';

const DeliveryFee = () => {
  const {
    deliveryFees, deliverFee, loading, status,
  } = useSelector((state) => state.deliveryFees);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [delModal, setDeleteModal] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);
  const [feeInput, setFeeInput] = useState({
    state: '',
    city: '',
    delivery_fee: '',
  });

  const handleFeeSubmit = () => {
    dispatch(addDeliveryFee({ delivery: feeInput })).then((result) => {
      if (addDeliveryFee.fulfilled.match(result)) {
        setOpen(false);
        dispatch(getDeliveryFees());
        dispatch(toggleAlert({
          isOpen: true,
          message: 'delivery location deleted',
          error: true,
        }));
        setFeeInput({
          state: '',
          city: '',
          delivery_fee: '',
        });

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

  const handleDelete = (id) => {
    dispatch(deleteDeliveryFee(id)).then((result) => {
      if (deleteDeliveryFee.fulfilled.match(result)) {
        setDeleteModal(false);
        setSelectedObject(null);
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
          handleDel={(item) => {
            setDeleteModal(true);
            setSelectedObject(item);
          }}
          item={info.row.original}
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
      <h2 className="font-normal mb-4">Delivery</h2>

      <div className="flex justify-end my-5">
        <Button classes="ml-auto my-10 block" onClick={() => { setOpen(true); }} variant="contained">Add Delivery Fee</Button>

      </div>

      <div>
        <table className="order">
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="text-gray-700 bg-gray-200">
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

      <InfoModal open={delModal} handleClose={() => setDeleteModal(false)}>
        <div className="bg-white rounded-2xl shadow-lg p-6  w-full">
          <h2 className="text-lg font-normal text-gray-800">Delete Confirmation</h2>
          <p className="text-gray-600 mt-2">
            Are you sure you want to delete
            {' '}
            <span className="font-medium">{selectedObject?.state}</span>
            ?
            This action cannot be undone.
          </p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setDeleteModal(false)}
              className="px-4 py-2 text-sm rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(selectedObject?.id)}
              className="px-4 py-2 text-sm rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </InfoModal>

      <InfoModal open={open} handleClose={() => setOpen(false)}>
        <DeliveryForm handleFeeSubmit={handleFeeSubmit} feeInput={feeInput} setFeeInput={setFeeInput} />
      </InfoModal>
    </div>
  );
};

export default DeliveryFee;
