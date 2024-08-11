import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../context/AuthReducer/action';
import { emailRegex } from '../constant/constants';

const initialUserDetails = { email: '', password: '' };
const initialInputValidationsDetails = { emailValid : false, emailExist : false, password : false,passwordLength : false };

const SignUp = ({ switchToSignIn, setOpen }) => {
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const [inputValidation, setInputValidation] = useState(initialInputValidationsDetails);
  const dispatch = useDispatch();
  const languageStore = useSelector((state) => state.language);
  const { language, translations } = languageStore;

  const handleChange = (e) => {
    const { id, value } = e.target;
    if( id === 'email' ){
      emailRegex.test(value) ? setInputValidation(prev => ( {...prev, emailValid : false })) : setInputValidation(prev => ( {...prev, emailValid : true }))
      setInputValidation(prev => ( { ...prev, emailExist : false }))
    }else if( id === 'password' ){ 
      value.length < 6 ? setInputValidation(prev => ( { ...prev, passwordLength : true})) : setInputValidation(prev => ( { ...prev, passwordLength : false }))
      setInputValidation(prev => ( { ...prev, password: false } ));
    };
    setUserDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if( !email.length ) {
      setInputValidation(prev => ( {...prev, emailExist: true }));
    }
    if( !emailRegex.test(email) && email.length && !inputValidation.emailExist){
      setInputValidation(prev => ({...prev, emailValid: true }))
    }
    if( !password.length ){
      setInputValidation(prev => ( {...prev, password: true }));
    }
    if (!inputValidation.emailValid && !inputValidation.emailExist && !inputValidation.password && !inputValidation.passwordLength && email && password) {
      dispatch(signUp(email, password, language));
      setUserDetails(initialUserDetails);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d0e6f7', padding: 4, borderRadius: 2, boxShadow: '4px 4px #323232' }}>
        <Typography component="h1" variant="h5">
          {translations.signUp}
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField margin="normal" aria-describedby='component-error-text' error={inputValidation.emailExist || inputValidation.emailValid} required fullWidth onChange={handleChange} value={userDetails.email} id="email" label={translations.email} name="email" autoComplete="email" autoFocus />
          {inputValidation.emailValid && <FormHelperText id="component-error-text" error>Invalid Email Address!</FormHelperText>}
          {inputValidation.emailExist && <FormHelperText id="component-error-text" error>Email Address Can't be empty!</FormHelperText>}
          <TextField margin="normal" aria-describedby='component-error-text-password' error={inputValidation.password} required fullWidth onChange={handleChange} value={userDetails.password} name="password" label={translations.password} type="password" id="password" autoComplete="current-password" />
          {inputValidation.password && <FormHelperText id="component-error-text-password" error>Password Can't be empty!</FormHelperText>}
          {inputValidation.passwordLength && <FormHelperText id="component-error-text-password" error>Password should be six characters long!</FormHelperText>}
          <Button onClick={handleSignUp} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#ff7e5f', boxShadow: '4px 4px #323232' }}>
            {translations.confirm}
          </Button>
          <Button fullWidth variant="outlined" onClick={switchToSignIn} sx={{ mt: 2, borderColor: '#323232', color: '#323232', boxShadow: '4px 4px #323232' }}>
            {translations.alreadyHaveAccount}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
