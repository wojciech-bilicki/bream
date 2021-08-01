import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  Check,
  InfoOutlined,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import NextLink from "next/link";
import Joi from "@hapi/joi";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import countries, { Country } from "../../../assets/countryList";
import AuthButton from "../components/AuthButton";
import CheckboxWithLabel from "../components/CheckboxWithLabel";
import EpicTextField from "../components/EpicTextField";
import PasswordInput from "../components/PasswordInput";

const validationSchema = Joi.object({
  countryCode: Joi.string().allow(...countries.map((country) => country.code)),
  email: Joi.string().required(),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  displayName: Joi.string().required(),
  password: Joi.string().required().min(6),
  subscribedToNewsletter: Joi.boolean(),
  termsAccepted: Joi.boolean().invalid(false).messages({
    "any.invalid": "Please confirm this field",
  }),
});

interface RegisterFormInput {
  email: string;
  countryCode: string | null;
  name: string;
  surname: string;
  displayName: string;
  password: string;
  subscribedToNewsletter: boolean;
  termsAccepted: boolean;
}

const RegisterForm: React.FC = () => {
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: joiResolver(validationSchema),
  });

  const onSubmit = (data: RegisterFormInput) => {
    console.log(errors);
    console.log(data);
  };

  console.log(errors);
  return (
    <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="countryCode"
        defaultValue={null}
        control={control}
        render={({ field }) => (
          <Autocomplete<Country | null>
            {...field}
            defaultValue={null}
            value={countries.find((country) => field.value === country.code)}
            onChange={(_, chosenCountry) => field.onChange(chosenCountry?.code)}
            classes={{
              paper: classes.autocompletePaper,
              option: classes.autocompleteOption,
              input: classes.autocompleteInput,
              listbox: classes.autocompleteListbox,
            }}
            fullWidth={true}
            renderInput={(params) => (
              <EpicTextField
                required={true}
                {...params}
                fullWidth={true}
                variant="outlined"
                label="Countries"
                error={!!errors.countryCode}
                helperText={errors.countryCode?.message}
              />
            )}
            options={countries}
            getOptionLabel={(option) => option?.name ?? ""}
          />
        )}
      />
      <Box display="flex" className={classes.nameBox}>
        <Controller
          defaultValue=""
          name="name"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <EpicTextField
              {...rest}
              inputRef={ref}
              required={true}
              label="Name"
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          defaultValue=""
          name="surname"
          control={control}
          render={({ field: { ref, ...rest } }) => (
            <EpicTextField
              {...rest}
              inputRef={ref}
              required={true}
              label="Surname"
              variant="outlined"
              error={!!errors.surname}
              helperText={errors.surname?.message}
            />
          )}
        />
      </Box>

      <Controller
        defaultValue=""
        name="displayName"
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <EpicTextField
            {...rest}
            inputRef={ref}
            variant="outlined"
            required={true}
            fullWidth={true}
            label="Display name"
            error={!!errors.displayName}
            helperText={errors.displayName?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment key="tooltip" position="end">
                  <Tooltip
                    classes={{ tooltip: classes.tooltip }}
                    title="The display name must be between 3 and 16 characters long. May contain letters, numbers, non-consecutive dashes, periods, underscores, and spaces."
                  >
                    <IconButton>
                      <InfoOutlined />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        defaultValue=""
        name="email"
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <EpicTextField
            {...rest}
            fullWidth={true}
            type="email"
            inputRef={ref}
            required={true}
            label="Email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        defaultValue=""
        name="password"
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <PasswordInput
            {...rest}
            inputRef={ref}
            error={!!errors.password}
            helperText={errors.password?.message}
            additionalAdornments={[
              <InputAdornment key="tooltip" position="end">
                <Tooltip
                  classes={{ tooltip: classes.tooltip }}
                  title="Your password has to be really strong!!"
                >
                  <IconButton>
                    <InfoOutlined />
                  </IconButton>
                </Tooltip>
              </InputAdornment>,
            ]}
          />
        )}
      />

      <CheckboxWithLabel label="I want to receive information about news, surveys and promotions from Epic Games." />

      <Controller
        defaultValue={false}
        control={control}
        name="termsAccepted"
        render={({ field: { ref, ...rest } }) => (
          <CheckboxWithLabel
            {...rest}
            error={!!errors.termsAccepted}
            helperText={errors.termsAccepted?.message}
            inputRef={ref}
            label={
              <Typography variant="body1">
                I understand and accept &nbsp;
                <Link underline="always" className="link">
                  The Terms of Service
                </Link>
              </Typography>
            }
          />
        )}
      />
      <Box width="100%" maxWidth="100%" marginTop={3.75}>
        <AuthButton title="Sign up" type="submit" />
      </Box>
      <Box width="100%" textAlign="center" marginTop={4.5}>
        <Link underline="always" className="link">
          Privacy policy
        </Link>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={2.5}
        width="100%"
      >
        <Typography variant="body1">
          Already have Epic Games account? &nbsp;
          <NextLink href="/login">
            <Link underline="always" className="link">
              Sign in
            </Link>
          </NextLink>
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        marginTop="5px"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body1">
          Back to &nbsp;
          <Link underline="always" className="link">
            all sign up options
          </Link>
        </Typography>
      </Box>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  autocompleteInput: {
    color: "white",
  },
  autocompletePaper: {
    backgroundColor: "#3a3a3a",
  },
  autocompleteOption: {
    color: "white",
    minHeight: "48px",
    '&[data-focus="true"]': {
      backgroundColor: "rgba(255,255,255,0.16)",
    },
  },
  autocompleteListbox: {
    "&::-webkit-scrollbar": {
      width: "0.6em",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "rgba(0,0,0,.25)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(255,255,255,0.4)",
      borderRadius: "4px",
    },
  },
  nameBox: {
    "& > :not(:first-child)": {
      marginLeft: "7.5px",
    },
    "& > :not(:last-child)": {
      marginRight: "7.5px",
    },
  },
  tooltip: {
    color: theme.palette.secondary.light,
    fontSize: "0.875rem",
    padding: "10px 20px",
    backgroundColor: "#3a3a3a",
    borderRadius: "4px",
    lineHeight: "1.5625rem",
  },
}));

export default RegisterForm;
