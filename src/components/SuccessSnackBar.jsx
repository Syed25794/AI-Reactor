import { Alert, Slide, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetSuccess } from "../context/LoadingReducer/action";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const SuccessSnackBar = ({ message, open }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(resetSuccess());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackBar;
