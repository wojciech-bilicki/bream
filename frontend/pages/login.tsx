import { Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import LoginForm from '../src/auth/login/Login.form'

const useStyles = makeStyles({
  loginContainer: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    width: '100%',
    height: '100vh'
  }

})

interface LoginProps {

}

const Login: React.FC<LoginProps> = ({}) => {
  const classes = useStyles();
    return (<Box className={classes.loginContainer}>
        <LoginForm />
    </Box>);
}

export default Login;