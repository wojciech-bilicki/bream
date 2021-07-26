import { makeStyles, TextField, TextFieldProps } from "@material-ui/core";
import React from "react";

const EpicTextField: React.FC<TextFieldProps> = (props) => {
  const { root } = useStyles();
  return (
    <TextField
      classes={{ root }}
      {...props}
      autoComplete="off"
      autoCorrect="off"
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: "85px",
    color: "white",
    "& .MuiInputBase-root": {
      color: theme.palette.secondary.light,
    },
    "& .MuiIconButton-label": {
      color: "white",
    },
    "& label": {
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.light,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.secondary.light,
    },
    "& .MuiIconButton-root": {
      color: theme.palette.secondary.light,
    },
    "& .MuiInputLabel-asterisk": {
      color: "#FFA640",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.secondary.light,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.light,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.light,
      },
    },
  },
}));

export default EpicTextField;
