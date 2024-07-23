import { Box, Typography } from '@mui/material'

const PeriodBox = ({periodNumber}) => {
  return (
    <Box sx={{display:"flex", justifyContent:"center",alignItems:"center",width:'3.5rem', height:'3.4rem',borderRadius:'0.5rem',border:"1px solid blue"}}>
      <Typography>{periodNumber}</Typography>
    </Box>
  )
}

export default PeriodBox
