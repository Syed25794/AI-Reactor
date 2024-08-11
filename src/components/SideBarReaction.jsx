import { Box } from '@mui/material'
import React from 'react'
import FormulaBox from './FormulaBox'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const SideBarReaction = ({ reactants, products }) => {
  return (
    <Box sx={{display:"flex",gap:'0.3rem',justifyContent:"space-between",alignItems:"center"}}>
        { reactants?.map((reactant,index)=>(
            <FormulaBox key={index} formula={reactant.formula} color={reactant.color} />
        ))}

        <ArrowForwardIcon /> 
        
        { products?.map((product,index)=>(
            <FormulaBox key={index} formula={product.formula} color={product.color} />
        ))}
    </Box>
  )
}

export default SideBarReaction
