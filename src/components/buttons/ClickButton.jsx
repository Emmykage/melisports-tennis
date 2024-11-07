import React from 'react';

const ClickButton = ({
  children, onCLick, type, disabled, className,
}) => (
  <button
    className={`${disabled && 'cursor-not-allowed'} ${type == 'cancel' ? 'text-red-500' : ''} ${className} border text-xs px-2 py-1 rounded border-gray-400`}
    onClick={onCLick}
  >
    {children}
  </button>
);

export default ClickButton;
