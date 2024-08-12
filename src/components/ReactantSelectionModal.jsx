import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import { Box, TextField, Button, DialogTitle, Dialog, styled, DialogContent, DialogActions, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeReactant, updateReactants } from '../context/ReactionReducer/action';
import { getCorrectNameAndFormulaOfReactant } from '../prompts/prompts';
import chatSession from '../gemini/config';
import { setError, setLoadingFalse, setLoadingTrue, setSuccess } from '../context/LoadingReducer/action';
import { errorMessageGenerator, successMessageGenerator } from '../constant/constants';
import ChemicalFormulaFormatter from './ChemicalFormulaFormatter';

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
  const languageStore = useSelector((state) => state.language);
  const { translations, language } = languageStore;

  useEffect(()=>{
    // setting the default value when open the existing reactants box
    reactants?.map(reactant => reactant.id === Id && setReactantInput({name: reactant.name, formula: reactant.formula, state: reactant.state}));
  },[Id, reactants])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReactantInput({...reactantInput, [name]:value});
  };

  const handleSaveReactant = async () => {
    try {
      if( reactantInput.name || reactantInput.formula ){
        dispatch(setLoadingTrue());
        const payload = { ...reactantInput };
        delete payload.id;
        const getPromptForCorrectReactantValues = getCorrectNameAndFormulaOfReactant(payload, language);
        const result = await chatSession.sendMessage(getPromptForCorrectReactantValues);
        const parsedResult = JSON.parse(result.response.text());
        dispatch(setSuccess(successMessageGenerator('reactantCreated', language)));
        dispatch(updateReactants({id: Id, ...parsedResult}));
        setReactantInput(inputInitialState);
        setOpen(false);
        dispatch(setLoadingFalse());
      }
    } catch (error) {
      dispatch(updateReactants({id: Id, ...reactantInput}));
      setReactantInput(inputInitialState);
      setOpen(false);
      dispatch(setLoadingFalse());
      dispatch(setError(errorMessageGenerator(error.status,language)));
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
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        id='addReactantDialog'
      >
        <DialogTitle sx={{ m: 0, p: 2}} id="customized-dialog-title">
          {translations.popUpHeadingReactant}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{display:"flex",justifyContent:"center",alignItems:"center", flexDirection:"column", gap:"20px",height:"50vh"}}>
          <TextField type='text' value={reactantInput?.name} name='name' onChange={handleInputChange} label={translations.reactantName} variant="outlined" sx={{width:"90%"}}/>
          <Box sx={{display:"flex", justifyContent:"flex-start", alignItems:"center",gap:'1rem',width:"90%"}}>
            <TextField type='text'  value={reactantInput?.formula} name='formula' onChange={handleInputChange} label={translations.reactantFormula} variant="outlined" sx={{width:"60%"}}/>
            <ChemicalFormulaFormatter formula={reactantInput?.formula} /> 
          </Box>
          <FormControl sx={{width:"90%"}}>
            <InputLabel id="state-label">{translations.reactantState}</InputLabel>
              <Select 
                labelId="state-label"
                name="state"
                value={reactantInput?.state}
                label={translations.reactantState}
                onChange={handleInputChange}
              >
              <MenuItem value={'s'}>{translations.solid}</MenuItem>
              <MenuItem value={'l'}>{translations.liquid}</MenuItem>
              <MenuItem value={'g'}>{translations.gas}</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' sx={{width:"90%"}}>
            <Link to={`/periodic-table?Id=${Id}`} style={{textDecoration:"none",color:"white"}}>
              {translations.createManualReactant}
            </Link>
            <LaunchIcon sx={{marginLeft:"0.3rem"}} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button disabled={!reactantInput.name && !reactantInput.formula} variant='contained' autoFocus onClick={handleSaveReactant}>
            {translations.saveReactant}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
