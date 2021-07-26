import { IconButton, InputAdornment, TextFieldProps } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import EpicTextField from "./EpicTextField";

type PasswordInputProps = Omit<TextFieldProps, "variant"> & {
  additionalAdornments?: JSX.Element[];
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  additionalAdornments,
  ...rest
}) => {
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false);

  const toggleVisibility = () => {
    setShouldShowPassword((prevValue) => !prevValue);
  };

  return (
    <EpicTextField
      {...rest}
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment key="showhide" position="end">
              <IconButton onClick={toggleVisibility}>
                {shouldShowPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
            {additionalAdornments}
          </>
        ),
      }}
      type={shouldShowPassword ? "text" : "password"}
      fullWidth={true}
      variant="outlined"
      label="Password"
    />
  );
};

export default PasswordInput;
