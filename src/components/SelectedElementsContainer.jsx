import { Box, Button, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import Flask from './Flask';

const SelectedElementsContainer = ({ selectedElements , setSelectedElements, makeReactant}) => {
  const languageStore = useSelector((state) => state.language);
  const { translations, language } = languageStore;
  const handleRemove = (symbol) => {
    setSelectedElements((prevElements) =>
      prevElements.filter((element) => element.symbol !== symbol)
    );
  };

  return (
    <Paper elevation={3} sx={{padding:'1rem',display:"flex",marginTop:"1rem",alignItems:"center", width:"95%"}}>
      <Box sx={{display:"flex" ,flexWrap:"wrap",width:'93%'}}>
        {selectedElements?.map((element,index) => (
          
          <Paper elevation={2} sx={{marginRight:'0.5rem',paddingBottom:"0.3rem"}}>
            <Flask 
              key={index}
              name={language === 'en' ? element?.name : language === 'hi' ? element?.hindiName : element?.urduName}
              symbol={element?.symbol}
              state={element?.state}
              formula={element?.symbol}
              isRemove={true}
              color={element?.color}
              onRemove={handleRemove}
            />
          </Paper>
        ))}
      </Box>
      <Button variant='contained' sx={{width:"8rem",height:"2.5rem"}} onClick={makeReactant}>{translations.doMagic}</Button>
    </Paper>
  );
};

export default SelectedElementsContainer;
