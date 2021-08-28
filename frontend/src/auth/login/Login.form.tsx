import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckBox, Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import NextLink from "next/link";
import { useMutation } from "react-query";

import { LogoIcon } from "../../../assets/icons";
import AuthButton from "../components/AuthButton";
import EpicTextField from "../components/EpicTextField";
import PasswordInput from "../components/PasswordInput";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Joi from "@hapi/joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { login, LoginFormInput } from "../auth.api";
import { useRouter } from "next/dist/client/router";

const validationSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: {
        allow: false,
      },
    })
    .required(),
  password: Joi.string().required(),
});

const LoginForm: React.FC = () => {
  const [wrongCredentialsError, setWrongCredentialsError] = useState(false);
  const { push } = useRouter();

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      console.log("Logged in!");
      push("/");
    },
    onError: (err) => {
      if (err.response.status === 401) {
        setWrongCredentialsError(true);
      }
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    resolver: joiResolver(validationSchema),
  });

  const classes = useStyles();

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    setWrongCredentialsError(false);
    loginMutation.mutate(data);
    console.log(data);
  };

  console.log(errors);
  return (
    <form className="authForm" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { ref, ...rest } }) => (
          <EpicTextField
            {...rest}
            error={!!errors.email || wrongCredentialsError}
            helperText={
              errors.email?.message ||
              (wrongCredentialsError && "Wrong credentials")
            }
            inputRef={ref}
            fullWidth={true}
            variant="outlined"
            label="Email Address"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { ref, ...rest } }) => (
          <PasswordInput
            {...rest}
            inputRef={ref}
            error={!!errors.password || wrongCredentialsError}
            helperText={
              errors.password?.message ||
              (wrongCredentialsError && "Wrong credentials")
            }
          />
        )}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <FormControlLabel
          label="Remember me"
          classes={{ root: classes.checkboxRoot }}
          control={<CheckBox />}
        />
        <Link underline="always" className="link">
          <Typography variant="body1">Forgot your password?</Typography>
        </Link>
      </Box>
      <Box width="100%" maxWidth="100%" marginTop={3.75}>
        <AuthButton title="LOG IN NOW" type="submit" />
      </Box>
      <Box className={classes.privacyWrapper}>
        <Link underline="always" className="link">
          <Typography variant="body1">Privacy Policy</Typography>
        </Link>
      </Box>
      <Box className={classes.signUpWrapper}>
        <Typography variant="body1">
          Don't have an Epic Games account? &nbsp;
        </Typography>
        <NextLink href="/register">
          <Link underline="always" className="link">
            <Typography variant="body1">Sign Up</Typography>
          </Link>
        </NextLink>
      </Box>
      <Box className={classes.allOptionsWrapper}>
        <Typography variant="body1">Back to &nbsp;</Typography>
        <Link underline="always" className="link">
          all sign up options
        </Link>
      </Box>
    </form>
  );
};

const useStyles = makeStyles((theme) => ({
  checkboxRoot: {
    marginLeft: "-5px",
    color: theme.palette.secondary.light,
    "& .MuiCheckbox-root": {
      color: theme.palette.secondary.light,
    },
    "& .MuiFormControlLabel-label": {
      marginLeft: "8px",
    },
  },
  buttonWrapper: {
    width: "100%",
    maxWidth: "100%",
    marginTop: "30px",
  },
  button: {
    minHeight: "60px",
    color: "white",
    backgroundColor: "#0074E4",
    "&:hover": {
      backgroundColor: "rgb(40,138,232)",
    },
  },
  privacyWrapper: {
    marginTop: "36px",
    width: "100%",
    textAlign: "center",
  },
  signUpWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  allOptionsWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4px",
    display: "flex",
  },
}));

export default LoginForm;
