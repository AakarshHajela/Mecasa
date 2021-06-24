import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { withFirebase } from "../../firebase";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

const useStyles = makeStyles((theme) => ({
  withoutLabel: {
    marginTop: theme.spacing(4),
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));
const ForgotPassword = ({ firebase }) => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailerror] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [msg, setMessage] = useState("");

  useEffect(() => {
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      setDisabled(true);
      return setEmailerror("Enter valid email");
    } else {
      setEmailerror("");
      setDisabled(false);
    }
  }, [email]);
  const handleForgotPassword = async () => {
    setDisabled(true);
    setIsEmailSending(true);
    await firebase
      .resetPassword(email)
      .then(function () {
        // Email sent.
        setDisabled(false);
        setIsEmailSending(false);
        setError("");
        return setMessage("Check your inbox for further instructions");
      })
      .catch(function (error) {
        // An error happened.
        setDisabled(false);
        setIsEmailSending(false);
        setMessage("");
        return setError(error.message);
      });
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="loginGrid"
    >
      <Grid>
        <Paper elevation={10} className="loginForm">
          <Grid align="center">
            <Avatar className={classes.pink}>
              <LockOpenOutlinedIcon />
            </Avatar>
            <h1>Password Reset</h1>
          </Grid>
          {error.length > 0 && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          {msg.length > 0 && (
            <Alert variant="filled" severity="success">
              {msg}
            </Alert>
          )}
          <FormControl className={clsx(classes.withoutLabel)} fullWidth>
            <TextField
              error={emailError.length > 0}
              helperText={emailError}
              autoFocus
              id="email"
              label="Enter Email"
              type="email"
              variant="outlined"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl className={clsx(classes.withoutLabel)} fullWidth>
            {isEmailSending ? (
              <Spinner color="success" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={handleForgotPassword}
              >
                Send Reset Password Link
              </Button>
            )}
          </FormControl>

          <FormControl className={clsx(classes.withoutLabel)} fullWidth>
            <Typography>
              <Link to="/login">Back to Login</Link>
            </Typography>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
};
const Component = withFirebase(ForgotPassword);

export default withRouter(Component);
