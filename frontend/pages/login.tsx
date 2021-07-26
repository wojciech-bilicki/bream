import { Box, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import AuthWrapper from '../src/auth/components/AuthWrapper'
import LoginForm from '../src/auth/login/Login.form'


const Login: React.FC = () => {
    return (<AuthWrapper formTitle="Sign in with an epic games account">
          <LoginForm />
        </AuthWrapper>
    );
}

export default Login;