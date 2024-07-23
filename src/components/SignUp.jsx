import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signUp } from '../context/AuthReducer/action';

const initialUserDetails = { name: '', email: '', password: '' };

const SignUp = ({ switchToSignIn }) => {
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { name, email, password } = userDetails;
    if (name && email && password) {
      dispatch(signUp(email, password, name));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d0e6f7', padding: 4, borderRadius: 2, boxShadow: '4px 4px #323232' }}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField margin="normal" required onChange={handleChange} value={userDetails.name} fullWidth id="name" label="Name" autoFocus />
          <TextField margin="normal" required onChange={handleChange} value={userDetails.email} fullWidth id="email" label="Email Address" autoComplete="email" />
          <TextField margin="normal" required onChange={handleChange} value={userDetails.password} fullWidth label="Password" type="password" id="password" autoComplete="current-password" />
          <Button onClick={handleSignUp} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#ff7e5f', boxShadow: '4px 4px #323232' }}>
            Confirm!
          </Button>
          <Button fullWidth variant="outlined" onClick={switchToSignIn} sx={{ mt: 2, borderColor: '#323232', color: '#323232', boxShadow: '4px 4px #323232' }}>
            Already have an account? Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
