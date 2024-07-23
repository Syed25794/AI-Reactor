import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { Box, TextField, Button, DialogTitle, Dialog, styled, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReactant, removeReactant, updateReactants } from '../context/ReactionReducer/action';
import { getCorrectNameAndFormulaOfReactant } from '../prompts/prompts';
import chatSession from '../gemini/config';
// import ChemicalFormulaFormatter from './ChemicalFormulaFormatter';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const inputInitialState = {name:'',formula:'', state: ''};
export default function ReactantSelectionModal({ open, setOpen, Id}) {
  const [reactantInput, setReactantInput] = useState(inputInitialState);
  const dispatch = useDispatch();
  const reactants = useSelector(state => state.reactions.reactants);

  useEffect(()=>{
    // setting the default value when open the existing reactants box
    reactants.map(reactant => reactant.id === Id && setReactantInput({name: reactant.name, formula: reactant.formula, state: reactant.state}));
  },[Id, reactants])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReactantInput({...reactantInput, [name]:value});
  };

  const handleSaveReactant = async () => {
    try {
      const payload = { ...reactantInput };
      delete payload.id;
      const getPromptForCorrectReactantValues = getCorrectNameAndFormulaOfReactant(payload);
      console.log('prompt',getPromptForCorrectReactantValues);
      const result = await chatSession.sendMessage(getPromptForCorrectReactantValues);
      const parsedResult = JSON.parse(result.response.text());
      console.log('response',parsedResult);
      dispatch(updateReactants({id: Id, ...parsedResult}));
      setReactantInput(inputInitialState);
      setOpen(false);
    } catch (error) {
      dispatch(updateReactants({id: Id, ...reactantInput}));
      setReactantInput(inputInitialState);
      setOpen(false);
      console.log("error",error);
    }
  };

  const handleClose = () => {
    if( !(reactantInput.name || reactantInput.formula) ){
      dispatch(removeReactant(Id))
    }
    setOpen(false);
  };

  return (
    <Box>
      <BootstrapDialog
        sx={{border:"1px solid red"}}
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Type or Select Your Reactant
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column", gap:"20px",height:"30vh"}}>
          <TextField type='text' value={reactantInput?.name} name='name' onChange={handleInputChange} label={`Write Your Reactant Name`} variant="outlined" sx={{width:"90%"}}/>
          {/* <ChemicalFormulaFormatter formula={reactantInput?.formula} /> */}
          <TextField type='text' value={reactantInput?.formula} name='formula' onChange={handleInputChange} label={`Write Your Reactant Formula`} variant="outlined" sx={{width:"90%"}}/>
          <FormControl sx={{width:"90%"}}>
            <InputLabel id="state-label">Select Reactant State</InputLabel>
              <Select 
                labelId="state-label"
                name="state"
                value={reactantInput?.state}
                label="Select Reactant State"
                onChange={handleInputChange}
              >
              <MenuItem value={'s'}>Solid</MenuItem>
              <MenuItem value={'l'}>Liquid</MenuItem>
              <MenuItem value={'g'}>Gas</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' sx={{width:"90%"}}>
            <Link to={`/periodic-table?Id=${Id}`} style={{textDecoration:"none"}}>
              Create Manual Reactant From Periodic Table 
            </Link>
            <LaunchIcon />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSaveReactant}>
            Save Reactant
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
