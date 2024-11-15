import React from 'react';

const ToolTip = ({
  children, hint, left, right,
}) => {

  return (
    <span className="relative group inline-block bg-red-40 p-0 text-black cursor-pointer">

      <span className="p-0 px-1">
        {children}
      </span>
      <span className="absolute z-20 right-0 bg-light border hidde group-hover:block px-6 -top-[140%]">
        {' '}
        {hint}
      </span>
    </span>

  );
};

export default ToolTip;
