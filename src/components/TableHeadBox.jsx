import { Box, Typography } from "@mui/material"

const TableHeadBox = ({group, period}) => {
  return (
    <Box sx={{display:"flex", flexDirection:"column",border:"1px solid red",width:'3.5rem', height:'3.4rem',borderRadius:'0.5rem'}}>
      <Typography sx={{textAlign:"right",paddingRight:'0.3rem',height:'50%',paddingTop:'0.1rem'}}>{group}</Typography>
      <Typography sx={{textAlign:"left",paddingLeft:'0.3rem',height:'50%'}}>{period}</Typography>
    </Box>
  )
}

export default TableHeadBox
