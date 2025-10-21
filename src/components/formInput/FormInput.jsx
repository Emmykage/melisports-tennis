import React from 'react';
import Select, { MultiValue } from 'react-select';

const FormInput = ({
  name, label, id, size, isMulti = false, defaultValue, productStatus = 'active', type = 'text', placeholder, onChange, required, className, options = [], value,
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={label}>
      <span className="text-gray-500 font-semibold text-sm">
        {label}
        {productStatus == 'active' && '*'}
      </span>
      {' '}
      <span />
    </label>
    {type === 'select' ? (
      <Select
        name={name}
        id={name}
        isMulti={isMulti}
        options={options}
        onChange={onChange}
        defaultValue={value}
        size={size}
      />

    ) : (
      <input
        name={name}
        id={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    )}

  </div>
);

export default FormInput;
