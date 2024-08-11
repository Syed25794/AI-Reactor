import { Alert, Slide, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetError } from "../context/LoadingReducer/action";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

const ErrorSnackBar = ({ message, open }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetError());
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
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackBar;
