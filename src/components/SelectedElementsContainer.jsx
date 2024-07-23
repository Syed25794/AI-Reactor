import { Box, Button, Paper } from '@mui/material';
import SelectedElementsBox from './SelectedElementsBox';

const SelectedElementsContainer = ({ selectedElements , setSelectedElements, makeReactant}) => {
  
  const handleRemove = (symbol) => {
    setSelectedElements((prevElements) =>
      prevElements.filter((element) => element.symbol !== symbol)
    );
  };

  return (
    <Paper sx={{padding:'0.5rem 1rem',display:"flex",alignItems:"center"}}>
      <Box sx={{display:"flex" ,flexWrap:"wrap",width:'93%'}}>
        {selectedElements.map((element,index) => (
          <SelectedElementsBox
            key={element.atomicNumber+element.name}
            element={element}
            onRemove={handleRemove}
          />
        ))}
      </Box>
      <Button variant='text' sx={{width:"6rem",height:"2.5rem"}} onClick={makeReactant}>Do Magic</Button>
    </Paper>
  );
};

export default SelectedElementsContainer;
