import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  makeStyles,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import React from "react";

type CheckboxWithLabelProps = Omit<FormControlLabelProps, "control">;

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  label,
  checked,
  onChange,
}) => {
  const { labelStyle, root } = useStyles();
  return (
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
