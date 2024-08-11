import { Box, Typography } from '@mui/material'
import Lottie from 'react-lottie'
import arrowLottie from './../assets/lotties/arrow.json';
import temperatureLottie from './../assets/lotties/temperature1.json';
import pressureLottie from './../assets/lotties/pressure.json';

const Arrow = ({producedReactant}) => {
  return (
    <Box sx={{ width: '20%', display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        {/* Temperature Section */}
        <Box sx={{marginRight:"1rem", width:"35%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "-3rem" }}>
            <Typography >{producedReactant?.environmentFactors.temperature}</Typography>
            <Lottie
                options={{
                    animationData: temperatureLottie,
                    loop: true,
                    autoplay: true,
                }}
                width={40}
                height={40}
            />
        </Box>

        {/* Arrow Section */}
        <Box sx={{marginTop:"-1.2rem"}}>
            <Lottie
                options={{
                    animationData: arrowLottie,
                    loop: true,
                    autoplay: true,
                }}
                width={320}
                height={150}
            />
        </Box>

        {/* Pressure Section */}
        <Box sx={{marginRight:"1rem", width:"35%", display: "flex", alignItems: "center", justifyContent: "center" ,marginTop:"-3.5rem"}}>
            <Typography>{producedReactant.environmentFactors.pressure}</Typography>
            <Lottie
                options={{
                    animationData: pressureLottie,
                    loop: true,
                    autoplay: true,
                }}
                width={40}
                height={40}
            />
        </Box>
    </Box>
  )
}

export default Arrow
