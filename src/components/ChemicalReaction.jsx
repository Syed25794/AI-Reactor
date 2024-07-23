import { Box, Divider, IconButton, ListItemButton, Tooltip, Typography } from '@mui/material';
import React from 'react'
import SimpleReactantBox from './SimpleReactantBox';
import InfoIcon from '@mui/icons-material/Info';
// import EastIcon from '@mui/icons-material/East';
import TrendingFlatSharpIcon from '@mui/icons-material/TrendingFlatSharp';

const ChemicalReaction = ({ producedReactant, idsAdded ,isEditable}) => {
  return (
    <Box>
        <ListItemButton disableRipple sx={{display:"flex", gap:'1rem',paddingTop:0,paddingBottom:0,height:'9rem',backgroundColor:"#edf2f7"}}>
        <Box sx={{ display:'flex', gap:'0.5rem'}}>
            {producedReactant.reactants.map(reactant=>(
                idsAdded && <SimpleReactantBox key={reactant.id} isEditable={isEditable}  state={reactant.state} Id={reactant.id} formula={reactant.formula} name={reactant.name} backgroundColor={reactant.color} />
            ))}
        </Box>
        <Box sx={{width:'20%',position:"relative"}}>
            <TrendingFlatSharpIcon sx={{fontSize:'14rem'}} />
            <Typography sx={{position:"absolute",bottom:70}}>{`${producedReactant.environmentFactors.temperature} / ${producedReactant.environmentFactors.pressure} `}</Typography>
        </Box>
        <Box sx={{ display:'flex', gap:'0.5rem'}}>
            {producedReactant.products.map(product=>(
                idsAdded && <SimpleReactantBox key={product.id}  isEditable={isEditable} state={product.state} Id={product.id} name={product.name} formula={product.formula} backgroundColor={product.color} />
            ))}
        </Box>
        <Box>
            <Tooltip title={producedReactant.safetyPrecautions}>
                <IconButton>
                    <InfoIcon />
                </IconButton>
            </Tooltip>
        </Box>
        </ListItemButton>
        <Divider />
   </Box>
  )
}

export default ChemicalReaction;
