import React from 'react';

const ClickButton = ({
  children, onClick, type, disabled = false, className,
}) => (
  <button
    disabled={disabled}
    className={`${disabled && 'cursor-not-allowed'} ${type == 'cancel' ? 'text-red-500' : ''} ${className} border text-xs px-2 py-1 rounded border-gray-400`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default ClickButton;
