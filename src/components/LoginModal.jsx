import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const LoginModal = ({ open, setOpen, children, isSignUp, isForgotPassword }) => {
  const languageStore = useSelector((state) => state.language);
  const { translations } = languageStore;
  const [fiveSeconds, setFiveSeconds] = React.useState(false);
  setTimeout(()=> {
    setFiveSeconds(true);
  },3000)

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {fiveSeconds && <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{isSignUp ? translations.signupPrompt : isForgotPassword ? translations.forgotPasswordPrompt : translations.loginPrompt}</DialogTitle>
        <DialogContent>
          <DialogContentText component='div' id="alert-dialog-slide-description">
           {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{translations.skip}</Button>
        </DialogActions>
      </Dialog>}
    </React.Fragment>
  );
}
