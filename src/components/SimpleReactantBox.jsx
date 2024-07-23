import React, { useState } from 'react';
import ChemicalFormulaFormatter from './ChemicalFormulaFormatter'
import { Box, Typography, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { styled } from '@mui/system';
import emptyReactant from './../assets/images/emptyCart.gif';
import { useDispatch, useSelector } from 'react-redux';
import { addReactant, removeReactant } from '../context/ReactionReducer/action';
import { constants } from '../constant/constants';

const StyledBox = styled(Box)(({ selected }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  // border: selected ? '2px solid green' : 'none',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  padding: '0.5rem'
}));

const SimpleReactantBox = ({ backgroundColor, name, formula, Id, state, isEditable}) => {
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const reactants = useSelector(state => state.reactions.reactants);

  const handleClick = () => {
    const isReactantExist = reactants.filter(reactant => reactant.name === name && reactant.formula === formula  );
    if( selected && isEditable){
        dispatch(removeReactant(Id));
        setSelected(false);
    }else if( !selected && reactants.length <= constants.maxReactants && !isReactantExist.length && isEditable ){
      dispatch(addReactant({id: Id, name, formula, state,color:backgroundColor }));
      setSelected(true);
    }
  };

  if( name || formula ){
    return (
      <StyledBox onClick={handleClick} selected={selected}>
        {selected && (
          <IconButton sx={{ position: 'absolute', top: 0, right: 0 }}>
            <CheckIcon color="success" />
          </IconButton>
        )}
        <Box sx={{ display: 'flex', background: backgroundColor, width: '6rem', height: '5rem', borderRadius: '0.5rem', justifyContent: 'center', alignItems: 'center'}} >
          <ChemicalFormulaFormatter formula={formula} />
          <Typography>{`(${state})`}</Typography>
        </Box>
        <Typography sx={{ fontSize: '0.7rem', marginTop: '0.3rem' }}>
          {name}
        </Typography>
      </StyledBox>
    );
  }else {
    // return <NoElementOrReactant />
    return <></>
  }
};

const NoElementOrReactant = () => {
  return (
    <Box sx={{width:'6rem', height:'5rem', borderRadius: '0.5rem', justifyContent: 'center', alignItems: 'center'}}>
      <img src={emptyReactant} alt='Empty Reactant Box' />
    </Box>
  )
}
export default SimpleReactantBox;
