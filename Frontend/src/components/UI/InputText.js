import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

function InputText(props) {
  const {size, InputProps, control, name, type, autoFocus, required, fullWidth } = props
  const finalName = name.replaceAll(" ", "_")
  return (
    <Controller
      name={finalName.toLowerCase()}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          required={required}
          fullWidth={fullWidth}
          label={name}
          type={type}
          id={name.toLowerCase()}
          autoFocus={autoFocus}
          InputProps={InputProps}
          InputLabelProps={{ shrink: true  } }
          size={size}
        />
      )}
    />
  );
}

export default InputText;
