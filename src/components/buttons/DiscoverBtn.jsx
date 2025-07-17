import React from 'react';
import { NavLink } from 'react-router-dom';

const DiscoverBtn = ({
  link,
  btnText = 'Discover',
  onclick,
  type,
  className,
  disabled,
}) => (
  <NavLink
    to={link}
    onClick={onclick}
    className={`${disabled && 'cursor-not-allowed'} ${type == 'cancel' ? 'text-red-500' : ''} ${className} font-semibold border-4 items-center block  w-max  py-2 px-5 border-theme bg-light hover:bg-theme-dark hover:text-light`}
  >
    {btnText}
  </NavLink>
);

export default DiscoverBtn;
