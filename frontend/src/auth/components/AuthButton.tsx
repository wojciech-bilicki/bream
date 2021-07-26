import { Button, ButtonProps, makeStyles } from '@material-ui/core';
import React from 'react'


type AuthButtonProps = ButtonProps & {
  title: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({title, ...rest}) => {
  const classes = useStyles()
    return ( <Button {...rest} fullWidth={true} variant="contained" className={classes.button}>{title}</Button>);
}

const useStyles = makeStyles({
  button: {
    minHeight: '60px',
    color: 'white',
    backgroundColor: '#0074E4',
    '&:hover': {
      backgroundColor: 'rgb(40,138,232)'
    }
  }
})

export default AuthButton