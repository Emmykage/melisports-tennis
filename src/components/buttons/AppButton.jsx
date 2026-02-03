import { Button } from 'flowbite-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const AppButton = ({
  link,
  btnText,
  onclick,
  type= "button",
  className,
  disabled,
  children
}) => (
  <button
  type={type}
    onClick={onclick}
    className={`${disabled && 'cursor-not-allowed'} ${type === 'cancel' ? 'text-red-500' : ''} ${className} font-semibold border-4 items-center block  w-max  border-theme bg-light hover:bg-theme-dark hover:text-light text-sm px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition`}
  >
    {btnText ?? children}
  </button>
);

export default AppButton;
