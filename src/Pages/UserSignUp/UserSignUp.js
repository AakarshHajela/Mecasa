import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { withFirebase } from "../../firebase";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/material.css";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  IconButton,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginRight: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

const UserSignUp = ({ firebase, history }) => {
  const classes = useStyles();
  const [signingIn, setSigningIn] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fNameError, setFnameError] = useState("");
  const [lNameError, setLnameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   firebase.auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       history.push("/");
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   if (!!firebase.user) {
  //     history.push("/");
  //   }
  // }, []);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUpButton = async () => {
    if (firstName.length === 0) {
      setPasswordError("");
      setEmailError("");
      setLnameError("");
      setError("");
      return setFnameError("Please enter valid name");
    }
    if (lastName.length === 0) {
      setPasswordError("");
      setEmailError("");
      setFnameError("");
      setError("");
      return setLnameError("Please enter valid name");
    }
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      setFnameError("");
      setLnameError("");
      setPasswordError("");
      setError("");
      return setEmailError("Enter valid email");
    }
    if (password.length < 6) {
      clearError();
      setPasswordError("Password must be at least six characters");
      return;
    }
    if (password !== confirmPassword) {
      clearError();
      return setPasswordError("Password do not match.");
    }
    if (!isValidPhoneNumber("+" + number)) {
      setPasswordError("");
      setEmailError("");
      setFnameError("");
      setLnameError("");
      return setError("Please enter a valid number");
    }

    setDisabled(true);
    setSigningIn(true);
    const res = await firebase.createUser(email, password);
    const newRecord = {
      fName: firstName,
      lName: lastName,
      phone: "+" + number,
      email: email,
    };
    const { success, error } = res;
    if (success) {
      firebase.addUserRecord(newRecord);
      history.push("/");
    } else {
      setError(error);
      setSigningIn(false);
      setDisabled(false);
    }
  };
  const clearError = () => {
    setEmailError("");
    setFnameError("");
    setLnameError("");
    setError("");
  };
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className="loginGrid"
      >
        <Paper elevation={10} className="loginForm">
          <Grid align="center">
            <Avatar className={classes.pink}>
              <LockOpenOutlinedIcon />
            </Avatar>
            <h1>Sign Up</h1>
          </Grid>
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          <FormControl
            id="signUpName"
            className={clsx(classes.margin, classes.withoutLabel)}
          >
            <TextField
              error={fNameError.length > 0}
              helperText={fNameError}
              autoFocus
              id="first-name"
              label="Enter First Name"
              type="text"
              variant="outlined"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="signUpName" className={clsx(classes.withoutLabel)}>
            <TextField
              error={lNameError.length > 0}
              helperText={lNameError}
              id="second-name"
              label="Enter Last Name"
              type="text"
              variant="outlined"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl className={clsx(classes.withoutLabel)} fullWidth>
            <TextField
              error={emailError.length > 0}
              helperText={emailError}
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
            <PhoneInput
              enableSearch
              autocompleteSearch
              country={"in"}
              value={number}
              onChange={setNumber}
              required
            />
          </FormControl>
          <FormControl
            className={clsx(classes.withoutLabel)}
            variant="outlined"
            required
            fullWidth
          >
            <InputLabel htmlFor="password">Password</InputLabel>

            <OutlinedInput
              error={passwordError.length > 0}
              id="password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
            />
            {passwordError && (
              <FormHelperText style={{ color: "red" }}>
                {passwordError}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            className={clsx(classes.withoutLabel)}
            variant="outlined"
            required
            fullWidth
          >
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>

            <OutlinedInput
              error={passwordError.length > 0}
              id="confirm-password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={(event) =>
                event.key === "Enter" && handleSignUpButton()
              }
              labelWidth={150}
            />
            {passwordError && (
              <FormHelperText style={{ color: "red" }}>
                {passwordError}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl className={clsx(classes.withoutLabel)} fullWidth>
            {signingIn ? (
              <Spinner color="success" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={handleSignUpButton}
              >
                Create Account
              </Button>
            )}
          </FormControl>

          <Typography className={clsx(classes.withoutLabel)} align="right">
            Already have an Account ? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};
const Component = withFirebase(UserSignUp);

export default withRouter(Component);