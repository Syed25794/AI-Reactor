import solidFlask from "./../assets/lotties/solidFlask.json";
import liquidFlask from "./../assets/lotties/liquidFlask.json";
import gasFlask from "./../assets/lotties/gasFlask.json";
import { Box, styled, Typography } from "@mui/material";
import Lottie from "react-lottie";
import ChemicalFormulaFormatter from "./ChemicalFormulaFormatter";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { flaskDifferentColors } from "../constant/constants";

const RemoveIcon = styled(IconButton)(({ theme }) => ({
    position: 'relative',
    top: theme.spacing(0.5),
    right: theme.spacing(0.5),
}));

const Flask = ({ name, formula, state, isRemove, onRemove, symbol, color }) => {
  let flaskType = state === "s" ? solidFlask : state === "g" ? gasFlask : liquidFlask;
  // flaskType = flaskDifferentColors(flaskType, color, state);



  if (name || formula) {
    return (
      <Box>
        {isRemove && <RemoveIcon size="small" onClick={() => onRemove(symbol)}>
            <CloseIcon />
        </RemoveIcon>}
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: flaskType,
          }}
          width={150}
          height={150}
        />

        <Typography
          sx={{ textAlign: "center", fontSize: "1rem", marginTop: "0.3rem" }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            height: "1rem",
            borderRadius: "0.5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChemicalFormulaFormatter formula={formula} />
          <Typography>{`(${state})`}</Typography>
        </Box>
      </Box>
    );
  }
};

export default Flask;
