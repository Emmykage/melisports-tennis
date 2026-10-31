import React from "react";

const Button = ({
  type = "button",
  onClick,
  loading,
  children,
  disabled,
  className,
}) => (
  <button
    disabled={disabled}
    loading={loading}
    onClick={onClick}
    type={type}
    className={`${className}  py-3 rounded-xl bg-theme text-white hover:bg-theme-light transition shadow-md`}
  >
    {children}
  </button>
);

export default Button;
