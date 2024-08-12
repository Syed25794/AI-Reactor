import { Box } from '@mui/material';
import ChemicalFormulaFormatter from './ChemicalFormulaFormatter';

const FormulaBox = ({ formula, color }) => {

  const getBoxStyle = (color) => ({
    backgroundColor: color || '#fff',
    border:`5px dashed ${color}`,
    borderRadius: '1rem',
    color: color === "#000000" || color === 'black' ? 'white' : 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth:'2.5rem',
    padding:'0.3rem 0.4rem'
  });

  return (
    <Box sx={getBoxStyle(color)}>
        <ChemicalFormulaFormatter formula={formula} />
    </Box>
  );
};

export default FormulaBox;
