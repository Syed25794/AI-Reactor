import { Box, Button, Typography } from "@mui/material";


const ElementBox = ({ atomicNumber, symbol, backgroundColor,name, selectElement }) => {
    return (
        <Button onClick={selectElement} sx={{ padding: 0, margin: 0, border: 'none', width: '3.5rem', height: '3.4rem', minWidth: '3.5rem', minHeight: '3.4rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', '&:hover .ripple': {   opacity: 0.7, }}}>
            <Box sx={{display:"flex",background:backgroundColor,position:"relative",width:'3.5rem', height:'3.4rem',borderRadius:'0.5rem',border:"1px solid violet"}}>
                <Typography sx={{position:"absolute",top:'0.15rem',left:'0.2rem',fontSize:'0.8rem'}}>{atomicNumber}</Typography>
                <Box sx={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",marginTop:"0.3rem"}}>
                    <Typography sx={{fontSize:"1rem",textTransform: "none"}}>{symbol}</Typography>
                    <Typography sx={{fontSize:"0.5rem"}}>{name}</Typography>
                </Box>
            </Box>
        </Button>
    )
};

export default ElementBox;
