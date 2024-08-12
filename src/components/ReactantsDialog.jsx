import { forwardRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import ChemicalReaction from './ChemicalReaction';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import emptyImage from './../assets/images/emptyCart.gif';

const Transition = forwardRef(function Transition( props,ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReactantsDialog({ openReactantDialog, setOpenReactantDialog, producedReactants, Id }) {
  const languageStore = useSelector((state) => state.language);
  const { translations } = languageStore;
  const [idsAdded, setIdsAdded] = useState(false);

  useEffect(()=>{
    (function (){
      producedReactants?.map(producedReactant=> {
        producedReactant.reactants.forEach((reactant)=>{
          reactant.id = uuid();
        })
        producedReactant.products.forEach((product)=>{
          product.id = uuid();
        })
        return producedReactant;
      })
      setIdsAdded(true);
    })()
    return (()=>{
      setIdsAdded(false);
    })
  },[producedReactants])
  const handleClose = () => {
    setOpenReactantDialog(false);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={openReactantDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{height:"90%", width: '95%',alignSelf: 'center',margin:'2.5%'}}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {translations.allPossibleReactions}
            </Typography>
            <Button autoFocus sx={{color:"white !important"}} onClick={handleClose}>
              <Link style={{color:"white",textDecoration:"none"}} to='/'>
                {translations.goToDashboard}
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
        {
          (producedReactants?.length === 0 || producedReactants) ? 
          <Box sx={{display:"flex",flexDirection:"column", gap:"1rem", paddingTop:"4rem", textAlign:"center", justifyContent:"center", alignItems:"center"}}>
            <Typography sx={{fontSize:"2rem", fontWeight:"bold"}}>No Chemical Reaction Found!</Typography>
            <img src={emptyImage} alt='Empty Reactant' />
          </Box>
          :
          <List>
            {producedReactants?.map((producedReactant,index)=> (
              <ChemicalReaction producedReactant={producedReactant} isEditable={true} idsAdded={idsAdded} key={index} />
            ))}
          </List>
        }
      </Dialog>
    </>
  );
}
