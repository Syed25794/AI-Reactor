import { Box, Typography } from '@mui/material'

const LanthanideActinideSeriesBox = ({atomicNumber, name,backgroundColor}) => {
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center", justifyContent:"center",background:backgroundColor,width:'3.5rem', height:'3.4rem',borderRadius:'0.5rem',border:"1px solid violet"}}>
        <Typography sx={{fontSize:"0.8rem"}}>{atomicNumber}</Typography>
        <Typography sx={{fontSize:"0.6rem"}}>{name}</Typography>
    </Box>
  )
}

export default LanthanideActinideSeriesBox
