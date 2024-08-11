import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, signIn } from '../context/AuthReducer/action';
import { emailRegex } from '../constant/constants';

const initialUserAuthDetails = { email: '', password: '' };
const initialInputValidationsDetails = { emailValid : false, emailExist : false, password : false };

const SignIn = ({ switchToSignUp, setIsForgotPassword, isForgotPassword }) => {
  const [userAuthDetails, setUserAuthDetails] = useState(initialUserAuthDetails);
  const [inputValidation, setInputValidation] = useState(initialInputValidationsDetails);

  const dispatch = useDispatch();
  const languageStore = useSelector((state) => state.language);
  const { translations, language } = languageStore;

  const handleChange = (e) => {
    const { id, value } = e.target;
    if( id === 'email' ){
      emailRegex.test(value) ? setInputValidation(prev => ( {...prev, emailValid : false })) : setInputValidation(prev => ( {...prev, emailValid : true }))
      setInputValidation(prev => ( { ...prev, emailExist : false }))
    }else if( id === 'password' ){ 
      setInputValidation(prev => ( { ...prev, password: false } ));
    };
    setUserAuthDetails((prev) => ({ ...prev, [id]: value }));
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    const { email, password } = userAuthDetails;
    if( !email.length ) {
      setInputValidation(prev => ( {...prev, emailExist: true }));
    }
    if( !emailRegex.test(email) && email.length && !inputValidation.emailExist){
      setInputValidation(prev => ({...prev, emailValid: true }))
    }
    if( !password.length ){
      setInputValidation(prev => ( {...prev, password: true }));
    }
    if (!inputValidation.emailValid && !inputValidation.emailExist && !inputValidation.password && email && password) {
      dispatch(signIn(email, password, language));
      setUserAuthDetails(initialUserAuthDetails)
    }
  };
  const handleForgotPassword = () => {
    const { email } = userAuthDetails;
    if( !email.length ) {
      setInputValidation(prev => ( {...prev, emailExist: true }));
    }
    if( !emailRegex.test(email) && email.length && !inputValidation.emailExist){
      setInputValidation(prev => ({...prev, emailValid: true }))
    }
    if( userAuthDetails.email && !inputValidation.emailValid && !inputValidation.emailExist){
      dispatch(forgotPassword(userAuthDetails.email,language));
      setTimeout(()=>{
        setUserAuthDetails(initialUserAuthDetails);
        setIsForgotPassword(false);
      },2000)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      { isForgotPassword ? 
        <Box>
          <TextField margin="normal" aria-describedby='component-error-text' error={inputValidation.emailExist || inputValidation.emailValid} required fullWidth onChange={handleChange} value={userAuthDetails.email} id="email" label={translations.email} name="email" autoComplete="email" autoFocus />
          {inputValidation.emailValid && <FormHelperText id="component-error-text" error>Invalid Email Address!</FormHelperText>}
          {inputValidation.emailExist && <FormHelperText id="component-error-text" error>Email Address Can't be empty!</FormHelperText>}
          <Button fullWidth variant="outlined" onClick={()=> handleForgotPassword()} sx={{ mt: 2, borderColor: '#323232', color: '#323232', boxShadow: '4px 4px #323232' }}>
              {translations.sentEmail}
            </Button>
        </Box> : 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d0e6f7', padding: 4, borderRadius: 2, boxShadow: '4px 4px #323232' }}>
          <Typography component="h1" variant="h5">
            {translations.logIn}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField margin="normal" aria-describedby='component-error-text' error={inputValidation.emailExist || inputValidation.emailValid} required fullWidth onChange={handleChange} value={userAuthDetails.email} id="email" label={translations.email} name="email" autoComplete="email" autoFocus />
            {inputValidation.emailValid && <FormHelperText id="component-error-text" error>Invalid Email Address!</FormHelperText>}
            {inputValidation.emailExist && <FormHelperText id="component-error-text" error>Email Address Can't be empty!</FormHelperText>}
            <TextField margin="normal" aria-describedby='component-error-text-password' error={inputValidation.password} required fullWidth onChange={handleChange} value={userAuthDetails.password} name="password" label={translations.password} type="password" id="password" autoComplete="current-password" />
            {inputValidation.password && !forgotPassword && <FormHelperText id="component-error-text-password" error>Password Can't be empty!</FormHelperText>}
            <Button type="submit" fullWidth onClick={(e)=>handleSignIn(e)} variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#ff7e5f', boxShadow: '4px 4px #323232' }}>
              {translations.loginButton}
            </Button>
            <Button fullWidth variant="outlined" onClick={()=> setIsForgotPassword(true)} sx={{ mt: 2, borderColor: '#323232', color: '#323232', boxShadow: '4px 4px #323232' }}>
              {translations.forgotPassword}
            </Button>
            <Button fullWidth variant="outlined" onClick={switchToSignUp} sx={{ mt: 2, borderColor: '#323232', color: '#323232', boxShadow: '4px 4px #323232' }}>
              {translations.signUpPrompt}
            </Button>
          </Box>
        </Box>
      }
    </Container>
  );
};

export default SignIn
