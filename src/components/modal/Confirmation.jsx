import React from 'react';
import Button from '../buttons/Button';

const Confirmation = ({
  children, open, btnAction, cnlAction, loading,
}) => {
  console.log(open);
  return (
    <div className={`${open ? 'opacity-100 pointer-events-auto ' : 'opacity-0 pointer-events-none'} fixed transition-all ease-in-out duration-150 bg-black/20 h-full w-full top-0 left-0 flex justify-center items-center`}>
      <div className="px-5 py-3 pb-5 mx-10 rounded-lg shadow-2xl max-w-xl w-full bg-white">
        <h3 className="md:text-3xl text-xl text-center my-2">{children ?? 'Confirm Order'}</h3>
        <div className="flex justify-between gap-3">
          <Button className="flex-1" btnFunc={cnlAction} type="cancel" btnText="Cancel">Cancel</Button>
          <Button className="flex-1" btnFunc={btnAction} loading={loading}>Confirm Order</Button>
        </div>

      </div>

    </div>
  );
};

export default Confirmation;
