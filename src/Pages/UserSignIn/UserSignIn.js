import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
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
import { withRouter, Link } from "react-router-dom";
import { withFirebase } from "../../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const useStyles = makeStyles((theme) => ({
  margin: {
    // margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

const UserLogin = ({ firebase, history }) => {
  const classes = useStyles();
  const [signingIn, setSigningIn] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup", //redirect
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.GoogleProviderID,
      {
        provider: firebase.PhoneProviderID,
        defaultCountry: "IN",
        // recaptchaParameters: {
        //   type: "image",
        //   size: "invisible",
        //   badge: "bottomleft",
        // },
      },
    ],

    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: "https://explified.com/terms-of-service/",
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign("https://explified.com/privacy-policy/");
    },

    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: (res) => {
        const newRecord = {
          fName: res.additionalUserInfo.profile.given_name,
          lName: res.additionalUserInfo.profile.family_name,
          email: res.additionalUserInfo.profile.email,
          Url: res.additionalUserInfo.profile.picture,
          UserID: res.user.uid,
        };

        if (res.user.uid) {
          firebase.usersRef.doc(res.user.uid).set({ ...newRecord });
          firebase.addUserRecord(newRecord);
        }
      },
      signInFailure: function (error) {
        // Some unrecoverable error occurred during sign-in.
        // Return a promise when error handling is completed and FirebaseUI
        // will reset, clearing any UI. This commonly occurs for error code
        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        // occurs. Check below for more details on this.
        return setError(error.message);
      },
    },
  };

  // useEffect(() => {
  //   firebase.auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       history.push("/");
  //     }
  //     //  else {
  //     //   history.push("/login");
  //     // }
  //   });
  // }, []);
  // useEffect(() => {
  //   if (!!firebase.user) {
  //     history.push("/");
  //   }
  // }, []);

  useEffect(() => {
    if (!!email && !!password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleLoginButton = async () => {
    if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      setPasswordError("");
      return setEmailError("Enter valid Email");
    }
    if (password.length < 6) {
      setEmailError("");
      setPasswordError("Password must be at least six characters");
      return;
    }
    setDisabled(true);
    setSigningIn(true);
    const res = await firebase.signInUser(email, password);
    const { success, error } = res;
    if (success) {
      return history.push("/");
    } else {
      setPasswordError("");
      setEmailError("");
      setError(error);
      setSigningIn(false);
      setDisabled(false);
    }
  };
  // const handleGoogleLoginButton = async () => {
  //   setDisabled(true);
  //   setSigningIn(true);
  //   const res = await firebase.signInWithGoogle();
  //   //  console.log("res dgfgfg", res);
  //   const { success, error } = res;
  //   if (success) {
  //     return history.push("/");
  //   } else {
  //     setError(error);
  //     setSigningIn(false);
  //     setDisabled(false);
  //   }
  // };
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
            <h2>Sign In</h2>
          </Grid>
          {error.length > 0 && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          <FormControl
            className={clsx(classes.margin, classes.withoutLabel)}
            fullWidth
          >
            <TextField
              error={emailError.length > 0}
              helperText={emailError}
              autoFocus
              id="outlined-secondary"
              label="Enter Email"
              type="email"
              variant="outlined"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>

          <FormControl
            className={clsx(classes.margin, classes.withoutLabel)}
            variant="outlined"
            required
            fullWidth
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>

            <OutlinedInput
              error={passwordError.length > 0}
              id="outlined-adornment-password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(event) =>
                event.key === "Enter" && handleLoginButton()
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={80}
            />
            {passwordError.length > 0 && (
              <FormHelperText style={{ color: "red" }}>
                {passwordError}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl
            className={clsx(classes.margin, classes.withoutLabel)}
            fullWidth
          >
            {signingIn ? (
              <Spinner color="success" />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={disabled}
                onClick={handleLoginButton}
              >
                Login
              </Button>
            )}
          </FormControl>
          <FormControl className={clsx(classes.margin, classes.withoutLabel)}>
            <Typography>
              <Link to="/forgot-password">Forgot Password ?</Link>
            </Typography>
          </FormControl>
          <FormControl fullWidth>
            <Typography>
              Don't have an account ? <Link to="/sign-up">Create Account</Link>
            </Typography>
          </FormControl>
        </Paper>
        <Grid>
          <Paper elevation={10} className="loginForm">
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};
const Component = withFirebase(UserLogin);

export default withRouter(Component);
