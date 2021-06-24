import { Snackbar } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
const PopUpToast = ({
  successSnackBarOpen,
  setSuccessSnackBarOpen,
  vertical,
  horizontal,
  severity,
  message,
}) => {
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessSnackBarOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
      open={successSnackBarOpen}
      autoHideDuration={3000}
      onClose={handleSnackBarClose}
    >
      <Alert onClose={handleSnackBarClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PopUpToast;
