import React, { forwardRef } from "react";

const CheckBox = forwardRef(
  (
    { label, size, htmlFor, className, value, onChange, ...props },
    ref = null,
  ) => {
    return (
      <label className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
        <input
          ref={ref}
          {...props}
          type="checkbox"
          onChange={(e) => {
            console.log(e.target);
            onChange(e);
          }}
          value={value}
          className="w-4 h-4  appearance-none after:block border border-green-500   text-blue-600 bg-gray-100 border-gray-00 rounded focus:ring-blue-500 checked:text-red-700 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-3"
        />
        <span className="text-base">{label}</span>
      </label>
    );
  },
);

export default CheckBox;
