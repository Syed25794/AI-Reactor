import { Box, Divider, IconButton, ListItemButton, Tooltip } from '@mui/material';
import SimpleReactantBox from './SimpleReactantBox';
import InfoIcon from '@mui/icons-material/Info';
import Arrow from './Arrow';


const ChemicalReaction = ({ producedReactant, idsAdded ,isEditable}) => {

  return (
    <Box>
        <ListItemButton disableRipple sx={{display:"flex",marginTop:'1rem', gap:'1rem',paddingTop:0,paddingBottom:0,height:'14rem',backgroundColor:"#edf2f7"}}>
        <Box sx={{ display:'flex', gap:'0.5rem'}}>
            {producedReactant?.reactants?.map(reactant=>(
                idsAdded && <SimpleReactantBox key={reactant.id} isEditable={isEditable}  state={reactant.state} Id={reactant.id} formula={reactant.formula} name={reactant.name} backgroundColor={reactant.color} />
            ))}
        </Box>
        <Arrow producedReactant={producedReactant} />
        <Box sx={{ display:'flex', gap:'0.5rem'}}>
            {producedReactant?.products?.map(product=>(
                idsAdded && <SimpleReactantBox key={product.id}  isEditable={isEditable} state={product.state} Id={product.id} name={product.name} formula={product.formula} backgroundColor={product.color} />
            ))}
        </Box>
        <Box>
            <Tooltip title={`Safety Precautions : ${producedReactant?.safetyPrecautions}`}>
                <IconButton >
                    <InfoIcon sx={{color:"rgba(250, 2, 2,0.7)"}} />
                </IconButton>
            </Tooltip>
        </Box>
        </ListItemButton>
        <Divider />
   </Box>
  )
}

export default ChemicalReaction;
