import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

function InputText({ control, inputType, autoFocus, required, fullWidth }) {
  return (
    <Controller
      name={inputType.toLowerCase()}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...field}
          margin="normal"
          required={required}
          fullWidth={fullWidth}
          label={inputType}
          type={inputType.toLowerCase()}
          id={inputType.toLowerCase()}
          autoComplete={inputType.toLowerCase()}
          autoFocus={autoFocus}
        />
      )}
    />
  );
}

export default InputText;
