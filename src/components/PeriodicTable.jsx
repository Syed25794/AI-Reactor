import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PeriodColumn from './PeriodColumn';
import { groupsData, LanthanidesActinidesSeries } from './../utils/AllGroupData';
import ElementBox from './ElementBox';
import { constants, errorMessageGenerator, successMessageGenerator } from './../constant/constants';
import LanthanideActinideSeriesBox from './LanthanideActinideSeriesBox';
import SelectedElementsContainer from './SelectedElementsContainer';
import ReactantsDialog from './ReactantsDialog';
import chatSession from '../gemini/config';
import { elementToReactantPrompt } from '../prompts/prompts';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeReactant } from '../context/ReactionReducer/action';
import { setError, setLoadingFalse, setLoadingTrue, setSuccess } from '../context/LoadingReducer/action';

const PeriodicTable = () => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [openReactantDialog, setOpenReactantDialog] = useState(false);
  const [producedReactants, setProducedReactants] = useState([])
  const [queries] = useSearchParams();
  const dispatch = useDispatch();
  const Id = queries.get('Id');
  const languageStore = useSelector((state) => state.language);
  const { translations, language  } = languageStore;

  useEffect(()=>{
    if( Id ){
      dispatch(removeReactant(Id));
    }
  },[Id,dispatch])

  const makeReactant = async () =>{
    try {
      dispatch(setLoadingTrue());
      if( selectedElements.length === constants.minSelectedElements ){
        dispatch(setError(errorMessageGenerator('minSelectedElements',language)));
        dispatch(setLoadingFalse());
      }else if( selectedElements.length >= constants.minSelectedElements && selectedElements.length <= constants.selectedElementsLimits ){
        const elementsToReactantPromptString = elementToReactantPrompt(selectedElements, language);
        const result = await chatSession.sendMessage(elementsToReactantPromptString);
        const parsedResult = JSON.parse(result.response.text()).possibleReactions;
        setProducedReactants(parsedResult);
        setOpenReactantDialog(true);
        dispatch(setLoadingFalse());
        dispatch(setSuccess(successMessageGenerator('makeReactant', language)));
      }else{
        dispatch(setLoadingFalse());
        dispatch(setError(errorMessageGenerator('minmaxSelectedLimit',language)))
      }
    } catch (error) {
      dispatch(setLoadingFalse());
      dispatch(setError(errorMessageGenerator(error.status,language)));
    }
  }

  const handleSelectedElement = (element) => {
    const isElementExists = selectedElements.filter(e => e.atomicNumber === element.atomicNumber);
    if( isElementExists.length ){
      return dispatch(setError(errorMessageGenerator('alreadyExist',language)));
    }
    if( selectedElements.length >= constants.selectedElementsLimits ){
      return dispatch(setError(errorMessageGenerator('minmaxSelectedLimit',language)));
    }
    if( !isElementExists.length && selectedElements.length < constants.selectedElementsLimits ){
      setSelectedElements([...selectedElements, element]);
    }
  }

  return (
    <Box sx={{display:"flex",flexDirection:"column", alignItems:"center", paddingBottom:"2rem", justifyContent: "center", gap:"2rem",backgroundColor:"#e8ecef"}}>

      {openReactantDialog && <ReactantsDialog setOpenReactantDialog={setOpenReactantDialog} Id={Id} openReactantDialog={openReactantDialog} producedReactants={producedReactants} />}

      <SelectedElementsContainer selectedElements={selectedElements} setSelectedElements={setSelectedElements}  makeReactant={makeReactant} />
      <Link style={{color:"black",textDecoration:"none"}} to='/'>{translations.goToHome}</Link>
      <Box sx={{boxShadow:"rgba(0, 0, 0, 0.18) 0px 2px 4px", padding:"1rem",background:"white",borderRadius:"1rem"}}>
        <Box sx={{display:"flex",gap:"0.5rem",justifyContent:'center',flexDirection:"row"}}>
            {/* Period Column from 1-7 */}
            <PeriodColumn />
            
            {/* All groups elements from 1 to 18 excluding elements Lanthanides and Actinides */}
            {groupsData?.map((group) => (
            <Box key={group.id} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.3rem' }}>
              {group.elements?.map((element, index) => (
                element.symbol === constants.ActinidesSeriesFirstElementSymbol ||
                element.symbol === constants.LanthanidesSeriesFirstElementSymbol ? 
                <LanthanideActinideSeriesBox key={index} atomicNumber={element.atomicNumber} backgroundColor={element.color} name={language === 'ur' ? element.urduName : language === 'hi' ? element.hindiName : element.name}/>
              : <ElementBox
                  key={index}
                  selectElement={()=>handleSelectedElement(element)}
                  name={language === 'ur' ? element.urduName : language === 'hi' ? element.hindiName : element.name}
                  atomicNumber={element.atomicNumber}
                  backgroundColor={element.color}
                  symbol={element.symbol}
                />
              ))}
            </Box>
          ))}
          </Box>
          {/* Lanthanide And Actinides Series Elements  */}
          <Box sx={{display:"flex",flexDirection:"column",marginLeft:'6rem',gap:"0.5rem",marginTop:"1rem"}}>
            {LanthanidesActinidesSeries?.map((series)=>(
              <Box sx={{display:"flex",alignItems:"center",gap:"1rem"}} key={series.id}>
                <Typography sx={{width:"15%"}}>{series.id === 20 ? translations.actinidesSeries : translations.lanthanideSeries}</Typography>
                <Box sx={{display:"flex", justifyContent:"center", gap:'0.3rem'}}>
                  {series.elements?.map((element,index) => (
                    <ElementBox 
                      key={index}
                      selectElement={()=>handleSelectedElement(element)}
                      name={language === 'ur' ? element.urduName : language === 'hi' ? element.hindiName : element.name}
                      atomicNumber={element.atomicNumber}
                      backgroundColor={element.color}
                      symbol={element.symbol}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
      </Box>
    </Box>
  );
};

export default PeriodicTable;