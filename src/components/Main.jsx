import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChemicalReactionPage from './ChemicalReactionPage';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../firebase/firebase';
import { logOut, logOutSuccess, signInSuccess } from '../context/AuthReducer/action';
import { Flask } from './Flask';
import { getChemicalReactionHistory } from '../context/ReactionReducer/action';

const Main = () => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      console.log('user',user);
      if (user) {
        dispatch(signInSuccess(user));
        dispatch(getChemicalReactionHistory(user.uid))
      } else {
        dispatch(logOut());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    }), [darkMode]
  );
  const reactant = { color: 'red'};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <Flask reactant={reactant}/> */}
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <Navbar 
          toggleDrawer={toggleDrawer} 
          language={language} 
          setLanguage={setLanguage} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: '80px 16px 16px 16px', 
            position: 'relative', 
          }}
        >
         {isAuthenticated && <Sidebar open={open} toggleDrawer={toggleDrawer} />}
          <ChemicalReactionPage />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Main;
