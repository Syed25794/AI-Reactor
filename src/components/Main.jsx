import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Box, CssBaseline } from '@mui/material';
import ChemicalReactionPage from './ChemicalReactionPage';
import { useDispatch, useSelector } from 'react-redux';
import { firebaseAuth } from '../firebase/firebase';
import { signInSuccess } from '../context/AuthReducer/action';
import { getChemicalReactionHistory } from '../context/ReactionReducer/action';

import LoadingModal from './LoadingModal';

const Main = ( ) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [language, setLanguage] = useState('english');
  const [reaction, setReaction] = useState('');

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loadingStore = useSelector((state) => state.loading);
  const reactionsHistory = useSelector(state => state.reactions.history);
  const { loading } = loadingStore;
 

  
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInSuccess(user));
        dispatch(getChemicalReactionHistory(user.uid))
      }
    });
  }, [dispatch]);

  useEffect(()=>{
    if( !isAuthenticated ){
      setLoginModalOpen(true);
    }
  },[isAuthenticated])
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const setHistoryReaction = (reactionId) => {
    const desiredHistory = reactionsHistory.filter(reaction => reaction.id === reactionId );
    setReaction(desiredHistory[0].reactions);
    setOpenDrawer(false);
  }

  return (
    <>
      <LoadingModal loading={loading} />
      <CssBaseline />
      <Box sx={{ display: 'flex', position: 'relative',backgroundColor:"#e8ecef",height:'100vh' }}>
        <Navbar 
          toggleDrawer={toggleDrawer} 
          language={language} 
          setLanguage={setLanguage} 
          setLoginModalOpen={setLoginModalOpen} 
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: '80px 16px 16px 16px', 
            position: 'relative', 
          }}
        >
          
         {isAuthenticated && <Sidebar open={openDrawer} setReaction={setHistoryReaction} toggleDrawer={toggleDrawer} />}
          <ChemicalReactionPage reaction={reaction} loginModalOpen={loginModalOpen} setLoginModalOpen={setLoginModalOpen} />
        </Box>
      </Box>
    </>
  );
};

export default Main;
