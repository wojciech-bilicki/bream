import { Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { Check, InfoOutlined, Visibility, VisibilityOff } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import React, { useState } from 'react'

import countries, { Country } from '../../../assets/countryList';
import AuthButton from '../components/AuthButton';
import CheckboxWithLabel from '../components/CheckboxWithLabel';
import EpicTextField from '../components/EpicTextField';

interface RegisterFormProps {

}

interface RegisterFormInput {
  country: Country | null;
  name: string;
  surname: string;
  displayName: string;
  password: string;
  subscribedToNewsletter: boolean;
  termsAccepted: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ }) => {
  // TODO: extract the state to the separate component
  const [shouldShowPassword, setShouldShowPassword] = useState<boolean>(false)
  const classes = useStyles()

  const toggleVisibility = () => {
    setShouldShowPassword(prevValue => !prevValue)
  }

  return (
    <form className="authForm" >

      <Autocomplete<Country | null>

        classes={{ paper: classes.autocompletePaper, option: classes.autocompleteOption, input: classes.autocompleteInput, listbox: classes.autocompleteListbox }}
        fullWidth={true}
        renderInput={(params) => <EpicTextField   required={true} {...params} fullWidth={true} variant="outlined" label="Countries" />} options={countries} getOptionLabel={option => option?.name ?? ""} />
   
      <Box display="flex" className={classes.nameBox}>
       <EpicTextField  required={true} label="Name" variant="outlined" />
      <EpicTextField  required={true} label="Surname" variant="outlined" /> 
        
      </Box>
    
      <EpicTextField variant="outlined" required={true} fullWidth={true} label="Display name"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip classes={{tooltip: classes.tooltip}} title="The display name must be between 3 and 16 characters long. May contain letters, numbers, non-consecutive dashes, periods, underscores, and spaces.">
                  <IconButton>
                    <InfoOutlined />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            )
          }}
      />
    
      <EpicTextField 
         


        variant="outlined" 
        required={true}
        fullWidth={true}
        label="Password"
        InputProps={{
          endAdornment: (
          <>
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={toggleVisibility}>
                {shouldShowPassword ? <Visibility /> : <VisibilityOff />}

              </IconButton>
            </InputAdornment>
            <InputAdornment position="end">
                <Tooltip classes={{tooltip: classes.tooltip}} title="Your password has to be really strong!!">
                  <IconButton>
                    <InfoOutlined />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
          </>
          )
        }}
      /> 

        <CheckboxWithLabel   label="I want to receive information about news, surveys and promotions from Epic Games." />
    

    <CheckboxWithLabel  label={
      <Typography variant="body1">
        I understand and accept &nbsp;
        <Link className="link">The Terms of Service</Link>
      </Typography>
    } />
   


     <Box  width="100%" maxWidth="100%" marginTop={3.75}>
          <AuthButton title="Sign up" type="submit" />
          </Box>
      <Box width="100%" textAlign="center" marginTop={4.5}>
        <Link className="link">Privacy policy</Link>
      </Box>     
    <Box display="flex" alignItems="center" justifyContent="center" marginTop={2.5} width="100%">
      <Typography variant="body1">
        Already have Epic Games account? &nbsp;
      <Link className="link">
        Sign in
      </Link>
      </Typography>
    </Box>
    <Box width="100%" display="flex" marginTop="5px" alignItems="center" justifyContent="center">
      <Typography variant="body1">
        Back to &nbsp;
        <Link className="link">
          all sign up options
        </Link>
      </Typography>
    </Box>
    </form>
  );
}

const useStyles = makeStyles((theme) => ({
  autocompleteInput: {
    color: 'white'
  },
  autocompletePaper: {
    backgroundColor: '#3a3a3a'
  },
  autocompleteOption: {
    color: 'white',
    minHeight: '48px',
    '&[data-focus="true"]': {
      backgroundColor: 'rgba(255,255,255,0.16)'
    }
  },
  autocompleteListbox: {
    '&::-webkit-scrollbar': {
      width: '0.6em'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,.25)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(255,255,255,0.4)',
      borderRadius: '4px'
    },

  },
  nameBox: {
    "& > :not(:first-child)": {
      marginLeft: '7.5px',
    },
    '& > :not(:last-child)': {
      marginRight: '7.5px'
    }
  },
  tooltip: {
    color: theme.palette.secondary.light,
    fontSize: '0.875rem',
    padding: '10px 20px',
    backgroundColor: '#3a3a3a',
    borderRadius: '4px',
    lineHeight: '1.5625rem'
  },

}))

export default RegisterForm;