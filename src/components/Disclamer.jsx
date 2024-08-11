import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const Disclaimer = () => {
  const languageStore = useSelector((state) => state.language);
  const { translations } = languageStore;
  return (
    <Paper>
      <Box sx={{textAlign:"center",padding:"0.2rem 1rem"}}>
        <ReportProblemIcon sx={{width:'1rem',height:"1rem",marginTop:"-0.2rem"}} /> {translations.disclaimer}
      </Box>
    </Paper>
  );
};

export default Disclaimer;
