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
  className={`
    inline-flex items-center justify-center gap-2
    px-4 py-2 rounded-md text-sm font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2

    ${
      disabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : type === "cancel"
        ? "border border-red-300 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-300"
        : "bg-gray-200 text-gray-800 font-semibold hover:bg-gray-700 hover:text-white focus:ring-gray-300"
    }

    ${className}
  `}
>
  {loading ? (
    <span className="animate-pulse">Loading...</span>
  ) : (
    children
  )}
</button>
);

export default Button;
