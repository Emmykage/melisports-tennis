import React from "react";
import Select, { MultiValue } from "react-select";
import { nairaFormat } from "../../utils/nairaFormat";

const FormInput = ({
  name,
  label,
  id,
  size,
  isMulti = false,
  productStatus = "active",
  type = "text",
  placeholder,
  onChange,
  required,
  className,
  options = [],
  value,
  ...props
}) => {
  //     const formatNumber = (val) => {
  // if (val === null || val === undefined || val === "") return "";
  // const num = Number(String(val).replace(/,/g, ""));
  //     if (isNaN(num)) return val;
  //     return num.toLocaleString("en-US", { minimumFractionDigits: 2 });
  //   };

  // remove commas

  const formatNumber = (val) => {
    if (val === null || val === undefined || val === "") return "";

    const num = Number(String(val).replace(/,/g, ""));
    if (isNaN(num)) return val;

    return num.toLocaleString("en-US");
  };

  const cleanNumber = (val) => val.replace(/,/g, "");

  const handleChange = (e) => {
    const raw = cleanNumber(e.target.value);

    // update parent with raw number
    onChange({ target: { name, value: raw } });
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={label}>{label}</label>
      {type === "select" ? (
        <Select
          {...props}
          name={name}
          id={name}
          isMulti={isMulti}
          options={options}
          onChange={onChange}
          value={
            value ??
            (isMulti
              ? []
              : { value: options[0]?.value, label: options[0]?.label })
          }
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
          {...props}
        />
      )}
    </div>
  );
};

export default FormInput;
