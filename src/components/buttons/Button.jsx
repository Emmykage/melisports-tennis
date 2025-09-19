import React from 'react';

const Button = ({
  disabled,
  children,
  btnFunc,
  onClick,
  type = 'button',
  className,
  ariaLabel = 'buton',
  loading,
}) => (
  <button
    aria-label={ariaLabel}
    type={type}

    onClick={onClick || btnFunc}
    disabled={disabled}

    className={`font-semibold max-w-xs w-full  border-4 md:py-2 py-1 px-4 flex  justify-center items-center border-theme bg-light hover:bg-theme-dark text-dark hover:text-light md:max-w-xs ${disabled && 'cursor-not-allowed'} ${type == 'cancel' ? 'text-red-500' : ''} ${className}`}
  >

    {loading ? 'loadding' : children}
  </button>
);

export default Button;
