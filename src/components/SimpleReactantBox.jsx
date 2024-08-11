import React, { useState } from 'react';
import { Box, IconButton, Paper } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { addReactant, removeReactant } from '../context/ReactionReducer/action';
import { constants, errorMessageGenerator, successMessageGenerator } from '../constant/constants';
import Flask from './Flask';
import { setError, setSuccess } from '../context/LoadingReducer/action';

const StyledBox = styled(Box)(({ selected }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  padding: '0.5rem'
}));

const SimpleReactantBox = ({ backgroundColor, name, formula, Id, state, isEditable}) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const reactants = useSelector(state => state.reactions.reactants);
  const languageStore = useSelector((state) => state.language);
  const { language  } = languageStore;

  const handleClick = () => {
    const isReactantExist = reactants.filter(reactant => reactant.name === name && reactant.formula === formula  );
    
    if( reactants.length >= constants.maxReactants ){
      return dispatch(setError(errorMessageGenerator('ReactantLimitExceeded',language)));
    }
    
    if( selected && isEditable){
        dispatch(removeReactant(Id));
        setSelected(false);
        dispatch(setSuccess(successMessageGenerator('reactantRemoved', language)));
      }else if( !selected && reactants.length < constants.maxReactants && !isReactantExist.length && isEditable ){
        dispatch(addReactant({id: Id, name, formula, state,color:backgroundColor }));
        setSelected(true);
        dispatch(setSuccess(successMessageGenerator('reactantSelected', language)));
    }
  };

  if( name || formula ){
    return (
      <StyledBox onClick={isEditable ? ()=>handleClick() : ()=>{}} selected={selected}>
        {selected && (
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CheckIcon color="success" />
          </IconButton>
        )}
        <Paper sx={{ display: 'flex', width: '11.5rem', height: '13rem', borderRadius: '0.5rem', justifyContent: 'center', alignItems: 'center'}} >
          <Flask color={backgroundColor} name={name} state={state} formula={formula} />
        </Paper>
      </StyledBox>
    );
  }
};

export default SimpleReactantBox;
