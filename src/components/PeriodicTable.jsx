import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import PeriodColumn from './PeriodColumn';
import { groupsData, LanthanidesActinidesSeries } from './../utils/AllGroupData';
import ElementBox from './ElementBox';
import { constants } from './../constant/constants';
import LanthanideActinideSeriesBox from './LanthanideActinideSeriesBox';
import SelectedElementsContainer from './SelectedElementsContainer';
import ReactantsDialog from './ReactantsDialog';
import chatSession from '../gemini/config';
import { elementToReactantPrompt } from '../prompts/prompts';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeReactant } from '../context/ReactionReducer/action';

const PeriodicTable = () => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [openReactantDialog, setOpenReactantDialog] = useState(false);
  const [producedReactants, setProducedReactants] = useState([])
  const [queries] = useSearchParams();
  const dispatch = useDispatch();
  const Id = queries.get('Id');

  useEffect(()=>{
    if( Id ){
      dispatch(removeReactant(Id));
    }
  },[Id,dispatch])

  const makeReactant = async () =>{
    try {
      if( selectedElements.length >= constants.minSelectedElements && selectedElements.length <= constants.selectedElementsLimits ){
        const elementsToReactantPromptString = elementToReactantPrompt(selectedElements);
        const result = await chatSession.sendMessage(elementsToReactantPromptString);
        const parsedResult = JSON.parse(result.response.text()).possibleReactions;
        setProducedReactants(parsedResult);
        setOpenReactantDialog(true);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  const handleSelectedElement = (element) => {
    const isElementExists = selectedElements.filter(e => e.atomicNumber === element.atomicNumber);
    if( !isElementExists.length && selectedElements.length < constants.selectedElementsLimits ){
      setSelectedElements([...selectedElements, element]);
    }
  }

  return (
    <Box sx={{display:"flex",flexDirection:"column", justifyContent: "center", gap:"2rem"}}>

      {openReactantDialog && <ReactantsDialog setOpenReactantDialog={setOpenReactantDialog} Id={Id} openReactantDialog={openReactantDialog} producedReactants={producedReactants} />}

      <SelectedElementsContainer selectedElements={selectedElements} setSelectedElements={setSelectedElements}  makeReactant={makeReactant} />
      <Link to='/'>Go To Dashboard</Link>
      <Box sx={{display:"flex",gap:"0.5rem",justifyContent:'center',flexDirection:"row",border:"1px solid red"}}>
          {/* Period Column from 1-7 */}
          <PeriodColumn />
          
          {/* All groups elements from 1 to 18 excluding elements Lanthanides and Actinides */}
          {groupsData.map((group) => (
          <Box key={group.id} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.3rem' }}>
            {group.elements.map((element, index) => (
              element.symbol === constants.ActinidesSeriesFirstElementSymbol ||
              element.symbol === constants.LanthanidesSeriesFirstElementSymbol ? 
              <LanthanideActinideSeriesBox key={index} atomicNumber={element.atomicNumber} backgroundColor={element.color} name={element.name} />
            : <ElementBox
                key={index}
                selectElement={()=>handleSelectedElement(element)}
                name={element.name}
                atomicNumber={element.atomicNumber}
                backgroundColor={element.color}
                symbol={element.symbol}
              />
            ))}
          </Box>
        ))}
        </Box>
        {/* Lanthanide And Actinides Series Elements  */}
        <Box sx={{display:"flex",flexDirection:"column",marginLeft:'6rem',gap:"0.5rem",border:"1px solid red"}}>
          {LanthanidesActinidesSeries.map((series)=>(
            <Box sx={{display:"flex",alignItems:"center",gap:"1rem"}} key={series.id}>
              <Typography sx={{width:"15%"}}>{series.id === 1 ? 'Lanthanides Series' : 'Actinides Series'}</Typography>
              <Box sx={{display:"flex", justifyContent:"center", gap:'0.3rem'}}>
                {series.elements.map((element,index) => (
                  <ElementBox 
                    key={index}
                    selectElement={()=>handleSelectedElement(element)}
                    name={element.name}
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
  );
};

export default PeriodicTable;