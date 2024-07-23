import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signIn } from '../context/AuthReducer/action';

const initialUserAuthDetails = { email: '', password: '' };

const SignIn = ({ switchToSignUp }) => {
  const [userAuthDetails, setUserAuthDetails] = useState(initialUserAuthDetails);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserAuthDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    const { email, password } = userAuthDetails;
    if (email && password) {
      dispatch(signIn(email, password));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d0e6f7', padding: 4, borderRadius: 2, boxShadow: '4px 4px #323232' }}>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth onChange={handleChange} value={userAuthDetails.email} id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
          <TextField margin="normal" required fullWidth onChange={handleChange} value={userAuthDetails.password} name="password" label="Password" type="password" id="password" autoComplete="current-password" />
          <Button type="submit" fullWidth onClick={handleSignIn} variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#ff7e5f', boxShadow: '4px 4px #323232' }}>
            Let's go!
          </Button>
          <Button fullWidth variant="outlined" onClick={switchToSignUp} sx={{ mt: 2, borderColor: '#323232', color: '#323232', boxShadow: '4px 4px #323232' }}>
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
