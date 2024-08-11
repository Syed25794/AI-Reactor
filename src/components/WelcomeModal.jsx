import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';
import welcomeLottie from './../assets/lotties/welcome.json';
import { Box, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import aiReactorLogo from './../assets/images/logo.png';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const WelcomeModal = ({ open, setOpen }) => {
  const { translations } = useSelector((state) => state.language);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('isWelcome',true);
  };

  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
      <DialogTitle sx={{ paddingBottom: "0px" }}>
        <img src={aiReactorLogo} style={{ width: "6rem", height: "5rem", borderRadius: "1rem", alignItems: "center" }} alt='AI Reactor Logo' />
      </DialogTitle>
      <DialogContent>
        <Box>
          <Lottie
            options={{
              animationData: welcomeLottie,
              loop: true,
              autoplay: true,
            }}
            width={200}
            height={200}
          />
        </Box>
        <DialogContentText sx={{ textAlign: "center", fontSize: "1.2rem" }} component='div' id="alert-dialog-slide-description">
          <Typography sx={{ fontSize: "1.2rem" }}>
            🎉 Welcome to AI Reactor! 🎉
          </Typography>
          <Typography sx={{ marginTop: "0.5rem" }}>
            Dive into the fascinating world of chemistry, where you can create and experiment with chemical reactions. Use the AI to generate reactants by mixing elements from the periodic table, and explore the endless possibilities. Don't forget to save your reactions by creating an account.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{translations.close}</Button>
      </DialogActions>
    </Dialog>
  );
};
