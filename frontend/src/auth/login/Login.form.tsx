import { Box, Button, FormControlLabel, IconButton, InputAdornment, Link, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CheckBox, Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react'

import { LogoIcon } from '../../../assets/icons'
import AuthButton from '../components/AuthButton';
import EpicTextField from '../components/EpicTextField';

interface LoginFormProps {

}

interface LoginFormInput {
  email: string;
  password: string;
}

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  
    const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false)
    const classes = useStyles()

    const toggleVisibility = () => {
      setShouldShowPassword(prevValue => !prevValue)
    }

    return (
      <form className="authForm" >
            <EpicTextField  fullWidth={true} variant="outlined" label="Email Address"/>
        <EpicTextField  InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleVisibility}>
                {shouldShowPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }} type={shouldShowPassword ? "text" : "password"} fullWidth={true} variant="outlined"label="Password" />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel label="Remember me" classes={{root: classes.checkboxRoot}} control={<CheckBox />}/>
          <Link className="link">
            <Typography variant="body1">Forgot your password?</Typography>
          </Link>
        </Box>
        <Box  width="100%" maxWidth="100%" marginTop={3.75}>
          <AuthButton title="LOG IN NOW" type="submit" />
        </Box>
        <Box className={classes.privacyWrapper}>
            <Link className="link">
              <Typography variant="body1">Privacy Policy</Typography>
            </Link>
        </Box>
        <Box className={classes.signUpWrapper}>
          <Typography variant="body1">
            Don't have an Epic Games account? &nbsp;
          </Typography>
          <Link className="link">
            <Typography variant="body1">Sign Up</Typography>
          </Link>
        </Box>
        <Box className={classes.allOptionsWrapper}>
          <Typography variant="body1">Back to &nbsp;</Typography>
          <Link className="link">
            all sign up options
          </Link>
        </Box>

      </form>

    );
}


const useStyles = makeStyles((theme) => ({
  checkboxRoot: {
    marginLeft: '-5px',
    color: theme.palette.secondary.light,
    '& .MuiCheckbox-root': {
      color: theme.palette.secondary.light
    },
    '& .MuiFormControlLabel-label': {
      marginLeft: '8px'
    }
  },
  buttonWrapper: {
    width: '100%',
    maxWidth: '100%',
    marginTop: '30px',
  },
  button: {
    minHeight: '60px',
    color: 'white',
    backgroundColor: '#0074E4',
    '&:hover': {
      backgroundColor: 'rgb(40,138,232)'
    }
  },
  privacyWrapper: {
    marginTop: '36px',
    width: '100%',
    textAlign: 'center'
  },
  signUpWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px'
  },
  allOptionsWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4px',
    display: 'flex'
  }

}))

export default LoginForm;