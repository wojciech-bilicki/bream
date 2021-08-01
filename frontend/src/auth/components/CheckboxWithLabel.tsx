import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React from "react";

type CheckboxWithLabelProps = Omit<FormControlLabelProps, "control"> & {
  error?: boolean;
  helperText?: string;
};

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  label,
  checked,
  onChange,
  error,
  helperText,
}) => {
  const { labelStyle, root } = useStyles();
  return (
    <>
      <FormControlLabel
        classes={{ label: labelStyle }}
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            classes={{ root }}
            checkedIcon={
              <Check
                style={{
                  fontSize: 24,
                  backgroundColor: "#0074E4",
                  color: "white",
                  borderRadius: "4px",
                  border: "1px solid black",
                }}
              />
            }
          />
        }
        label={label}
      />
      {error && <FormHelperText error={true}>{helperText}</FormHelperText>}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.light,
  },
  labelStyle: {
    marginLeft: "10px",
  },
}));

export default CheckboxWithLabel;
