import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ReactantSelectionModal from './ReactantSelectionModal';
import { useDispatch, useSelector } from 'react-redux';
import { addReactant, getChemicalReactionHistory, removeReactant } from '../context/ReactionReducer/action';
import {v4 as uuid} from 'uuid';
import { constants, errorMessageGenerator, successMessageGenerator } from '../constant/constants';
import { elementToReactantPrompt } from '../prompts/prompts';
import chatSession from '../gemini/config';
import ChemicalReaction from './ChemicalReaction';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { collection, addDoc } from 'firebase/firestore'
import { firestoreDb } from '../firebase/firebase';
import { chemicalReactionDbModal } from '../models/chemicalReactionDb';
import { LoginModal } from './LoginModal';
import { setError, setLoadingFalse, setLoadingTrue, setSuccess } from '../context/LoadingReducer/action';
import Flask from './Flask';

const MagicBox = styled(Paper)(({ theme }) => ({
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  height:'5rem',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 10px',
  padding: '1rem',
  border: 'black',
  boxShadow: 'gray',
}));

const ReactantBox = styled(Box)(({ theme }) => ({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px 0px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));


const ChemicalReactionPage = ({ loginModalOpen, setLoginModalOpen, reaction }) => {
  const [open, setOpen] = useState(false);
  const [selectedReactantId, setSelectedReactantId] = useState('');
  const [mainProduct, setMainProduct] = useState([]);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const reactants = useSelector(state=> state.reactions.reactants);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const languageStore = useSelector((state) => state.language);
  const { translations, language } = languageStore;
  const dispatch = useDispatch()

  useEffect(()=>{
    if( reaction.length ){
      setMainProduct(reaction)
    }
  },[reaction])

  useEffect(()=>{
    if( !user ){
      setMainProduct([]);
    }
  },[user])
  
  const addReactantInput = () => {
    if (reactants.length <= constants.maxReactants ) {
      const newReactant = { id: uuid(), name: '', formula: '', state : '' };
      dispatch(addReactant(newReactant));
      setSelectedReactantId(newReactant.id);
      setOpen(true);
    }else{
      dispatch(setError(errorMessageGenerator('maxReactantLimit',language)));
    }
  };

  const switchToSignIn = () => {
    setIsSignUp(false);
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
  };
  
  const removeReactantState = (id) => {
    dispatch(removeReactant(id));
  };

  const openModal = (id) => {
    setSelectedReactantId(id);
    setOpen(true);
  }

  const addChemicalReaction = async (userId, chemicalReactions) => {
    try {
      dispatch(setLoadingTrue());
      const data = chemicalReactionDbModal({ userId, chemicalReactions });
      await addDoc(collection(firestoreDb, '/chemicalReactions'), data);
      dispatch(setLoadingFalse());
    } catch (e) {
      dispatch(setLoadingFalse());
    }
  };
  
  const performReaction = async () => {
    try {
      if( reactants.length <= constants.maxReactants ){
        dispatch(setLoadingTrue());
        const elementsToReactantPromptString = elementToReactantPrompt(reactants,language);
        const result = await chatSession.sendMessage(elementsToReactantPromptString);
        const parsedResult = JSON.parse(result.response.text()).possibleReactions;
        if( user && parsedResult.length){
          parsedResult?.map(async(reaction) => {
            await addChemicalReaction(user.uid, [{...reaction}]);
          })
          getChemicalReactionHistory(user.uid);
        }
        setMainProduct(parsedResult)
        dispatch(setLoadingFalse());
        dispatch(setSuccess(successMessageGenerator('performReaction', language)))
      }else{
        dispatch(setError(errorMessageGenerator('maxReactantLimit',language)));
      }
    } catch (error) {
      dispatch(setLoadingFalse());
      dispatch(setError(errorMessageGenerator(error.status,language)));
    }
  }
  

  return (
    <Box>
      {!isAuthenticated && <LoginModal isForgotPassword={isForgotPassword} open={loginModalOpen} isSignUp={isSignUp} setOpen={setLoginModalOpen}>
        { isSignUp ?  <SignUp switchToSignIn={switchToSignIn} /> : <SignIn isForgotPassword={isForgotPassword} setIsForgotPassword={setIsForgotPassword} switchToSignUp={switchToSignUp} />}
      </LoginModal>}


        <ReactantSelectionModal Id={selectedReactantId} open={open} setOpen={setOpen} />
        <Paper elevation={3} sx={{display:"flex", justifyContent:"flex-start",alignItems:"center",marginTop:"2.5rem",height:'17rem'}}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems:"center", width: '85%',marginTop:"4rem", gap: '10px', padding:'0rem 0.5rem'}}>
                {reactants?.map((reactant, index) => (
                  <Box sx={{display:"flex",flexDirection:"column",height:'26vh',justifyContent:'flex-end'}} key={index}>
                    <Flask color={reactant?.color} name={reactant?.name} state={reactant?.state} formula={reactant?.formula} key={index} />
          
                    <ReactantBox sx={{maxHeight:"40px"}} key={reactant.id}>
                      { ( reactant.name || reactant.formula ) && 
                        <>
                          <Button variant="contained" color="primary" onClick={()=>openModal(reactant.id)}>{translations.updateReactant}</Button>
                          <IconButton 
                              onClick={() => removeReactantState(reactant.id)}
                              sx={{ position: 'absolute',color:"red", top: -25, right: -15 }}
                          >
                              <CloseIcon fontSize="large" />
                          </IconButton>
                        </>
                      }
                    </ReactantBox>
                  </Box>
                ))}
                {reactants.length < constants.maxReactants && (
                <ReactantBox sx={{ maxWidth: '150px',display:"flex", alignItems:"center" }}>
                    <Button variant="contained" color="primary" onClick={addReactantInput}>
                      {translations.addReactant}
                    </Button>
                </ReactantBox>
                )}
            </Box>
            <MagicBox elevation={0}>
            <Typography variant="h5" color="primary">{translations.magicBox}</Typography>
              <Button variant="contained" color="secondary" sx={{ marginTop: '10px' }} onClick={performReaction}>{translations.performReaction}</Button>
            </MagicBox>
        </Paper>
        
        {mainProduct?.map((reaction,index) => {
          return <ChemicalReaction key={index} producedReactant={reaction} idsAdded={true} isEditable={false} />
        })}
         
    </Box>
  );
};

export default ChemicalReactionPage;
