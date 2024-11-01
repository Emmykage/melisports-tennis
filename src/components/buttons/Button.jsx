import React from 'react';

const Button = ({
  disabled,
  children,
  btnFunc,
  type, className,
}) => (
  <button
    onClick={btnFunc}
    disabled={disabled}
    className={`font-semibold  border-4 items-center block py-2 px-5 border-theme bg-light hover:bg-theme-dark text-dark hover:text-light md:max-w-xs ${disabled && 'cursor-not-allowed'} ${type == 'cancel' ? 'text-red-500' : ''} ${className}`}
  >

    {children}
  </button>
);

export default Button;
