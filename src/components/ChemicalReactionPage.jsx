import React, { useState } from 'react';
import { Box, Button, Paper, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ReactantSelectionModal from './ReactantSelectionModal';
import { useDispatch, useSelector } from 'react-redux';
import { addReactant, removeReactant } from '../context/ReactionReducer/action';
import {v4 as uuid} from 'uuid';
import SimpleReactantBox from './SimpleReactantBox';
import { constants } from '../constant/constants';
import { elementToReactantPrompt } from '../prompts/prompts';
import chatSession from '../gemini/config';
import ChemicalReaction from './ChemicalReaction';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { collection, addDoc } from 'firebase/firestore'
import { firestoreDb } from '../firebase/firebase';
import { chemicalReactionDbModal } from '../models/chemicalReactionDb';

const MagicBox = styled(Paper)(({ theme }) => ({
  width: '20%',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  margin: '0 10px',
  border: `2px dashed ${theme.palette.primary.main}`,
  animation: 'upDown 3s infinite ease-in-out',
  boxShadow: `0 10px 20px ${theme.palette.primary.main}`,
  '@keyframes upDown': {
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0)' },
  },
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

const ProductBox = styled(Paper)(({ theme }) => ({
  flex: '1 1 30%',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  border: `2px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(2),
  margin: theme.spacing(1),
}));

const ChemicalReactionPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedReactantId, setSelectedReactantId] = useState('');
  const [mainProduct, setMainProduct] = useState([]);
  const [otherPossibleProducts, setOtherPossibleProducts] = useState([]);
  const [isSignUp, setIsSignUp] = useState(false);

  const reactants = useSelector(state=> state.reactions.reactants);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  console.log('isAuthenticated',isAuthenticated);
  console.log('user',user);
  const dispatch = useDispatch()
  console.log('reactants',reactants,reactants.length)
  
  const addReactantInput = () => {
    if (reactants.length <= constants.maxReactants ) {
      const newReactant = { id: uuid(), name: '', formula: '', state : '' };
      dispatch(addReactant(newReactant));
      setSelectedReactantId(newReactant.id);
      setOpen(true);
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
      console.log(userId,chemicalReactions);
      const data = chemicalReactionDbModal({ userId, chemicalReactions });
      console.log(data,"data");
      const docRef = await addDoc(collection(firestoreDb, '/chemicalReactions'), data);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
  
  const performReaction = async () => {
    try {
      if( reactants.length <= constants.maxReactants ){
        setOtherPossibleProducts([]);
        const elementsToReactantPromptString = elementToReactantPrompt(reactants);
        console.log('prompt',elementsToReactantPromptString);
        const result = await chatSession.sendMessage(elementsToReactantPromptString);
        const parsedResult = JSON.parse(result.response.text()).possibleReactions;
        await addChemicalReaction(user.uid, parsedResult);
        setMainProduct(parsedResult[0]?.products)
        console.log('parsedResult',parsedResult)
        parsedResult?.forEach((result,index) => {
          console.log(index,result);
          if( index ){
            setOtherPossibleProducts(prev=> [...prev, result]);
          }
        })
        console.log('otherPossibleProducts',otherPossibleProducts)
      }
    } catch (error) {
      console.log('error',error); 
    }
  }

  return (
    <Box>
      { !isAuthenticated ? isSignUp ?  <SignUp switchToSignIn={switchToSignIn} /> : <SignIn switchToSignUp={switchToSignUp} />  : <></>}
      {/* //   ({(isSignUp && !isAuthenticated) ? ( */}
      {/* //   <SignUp switchToSignIn={switchToSignIn} /> */}
      {/* // ) : ( */}
      {/* //   <SignIn switchToSignUp={switchToSignUp} /> */}
      {/* // )} */}

        <ReactantSelectionModal Id={selectedReactantId} open={open} setOpen={setOpen} />
        <Box sx={{display:"flex", justifyContent:"flex-start", width:"100%"}}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems:"center", width: '40%', gap: '10px', border:"1px solid blue" }}>
                {reactants.map((reactant, index) => (
                  <Box sx={{display:"flex",flexDirection:"column",height:'26vh',justifyContent:'flex-end'}} key={index}>
                    <SimpleReactantBox name={reactant?.name} mainReactantId={reactant.id} state={reactant?.state} key={index} backgroundColor={reactant.color} Id={reactant.id} formula={reactant?.formula} />
                    <ReactantBox sx={{maxHeight:"40px"}} key={reactant.id}>
                      { ( reactant.name || reactant.formula ) && 
                        <>
                          <Button variant="contained" color="primary" onClick={()=>openModal(reactant.id)}>Update Reactant</Button>
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
                    Add Reactant
                    </Button>
                </ReactantBox>
                )}
            </Box>
            <MagicBox>
            <Typography variant="h5" color="primary">Magic Box</Typography>
            <Button variant="contained" color="secondary" sx={{ marginTop: '10px' }} onClick={performReaction}>Perform Reaction</Button>
            </MagicBox>
            <Box sx={{display:"flex", width:"40%",justifyContent:"flex-start", alignItems:"center", border:"1px solid green", gap:"10px", flexWrap:"wrap"}}>
                {mainProduct.map((product,index)=> (
                  <SimpleReactantBox key={index} name={product.name} formula={product.formula} backgroundColor={product.color} state={product.state}  />
                ))}
            </Box>
        </Box>
        {Boolean(otherPossibleProducts.length) && <Box sx={{display:"flex", flexDirection:"column", marginTop:"2rem", gap:'0.5rem'}}>
          <Typography sx={{fontSize:'1.5rem',fontWeight:'bold'}}>Other Possible Reactions</Typography>
          {otherPossibleProducts.map((product,index)=> (
            <ChemicalReaction key={index} producedReactant={product} isEditable={false} idsAdded={true} />
          ))}
        </Box>}
    </Box>
  );
};

export default ChemicalReactionPage;
