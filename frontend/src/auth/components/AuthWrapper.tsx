import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { LogoIcon } from '../../../assets/icons';

interface AuthWrapperProps {
  formTitle: string;
}



const AuthWrapper: React.FC<AuthWrapperProps> = ({children, formTitle}) => {
    const classes = useStyles()
    return (<Box className={classes.loginContainer}>
      <Box className={classes.container}>
      <LogoIcon className={classes.logo} />
      <Typography variant="subtitle2" className={classes.signIn}>
       {formTitle}
      </Typography>
        {children}
      </Box>
    </Box>);
}

const useStyles = makeStyles({
  container: {
    maxWidth: '470px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '32px',
    backgroundColor: '#202020',
    padding: '50px 60px',
    flexDirection: 'column'
  },
  logo: {
    color: 'white',
    width: '48px',
    height: '48px',
    marginBottom: '30px'
  },
  signIn: {
    color: 'white',
    textAlign: 'left',
    marginTop: '20px',
    width: '100%',
    textTransform: 'uppercase'
  },
  loginContainer: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    width: '100%',
    height: '100vh'
  }

})


export default AuthWrapper