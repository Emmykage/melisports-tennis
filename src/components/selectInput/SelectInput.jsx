import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectInput({
  label, options, className, handleChange, defaultValue,
}) {
  return (
    <div>
      <FormControl className={className} variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={defaultValue}
          onChange={handleChange}
          label="Age"
        >
          {options.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>

          ))}
        </Select>
      </FormControl>

    </div>
  );
}
