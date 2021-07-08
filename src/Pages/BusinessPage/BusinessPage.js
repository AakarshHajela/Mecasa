import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../firebase";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import {
  TextField,
  Grid,
  FormControl,
  Paper,
  Button,
  CircularProgress,
} from "@material-ui/core/";
import "./BusinessPage.css";
import { PopUpToast } from "../../components";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ButtonsComponent from "./ButtonsComponent";
import { ProgressBar } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  withoutLabel: {
    marginTop: theme.spacing(4),
  },
}));

const BusinessPage = ({ firebase, history }) => {
  const classes = useStyles();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [attachment, setAttachment] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState(false);
  
  const userId = useRef("");

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        history.push("/login");
      } else {
        userId.current = userAuth.uid;

        setUser(userAuth);
      }
    });
  }, []);

  {/*useEffect(()=>{
    if(attachment){
      console.log(attachment);
    }
  })*/}

  const [progress, setProgress] = useState(0);
  const handleFormSubmit = async () => {
    if (
      email.length > 0 &&
      !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
    ) {
      setDisabled(true);
      return setEmailError("Enter valid email");
    } else {
      setEmailError("");
      setDisabled(false);
    }
    if (!name) {
      setUrlError("");
      return setNameError("Name is Required");
    } else {
      setNameError("");
    }
    if (!url) {
      return setUrlError("Url(s) is Required");
    } else {
      setNameError("");
      setUrlError("");
    }

    setIsFormSubmitting(true);

    let obj = {
      name,
      url,
      email,
      status: 0,
      id: user.uid,
      attName:attachment.name,
    };

    let storageRef = firebase.storage.ref();
    if(attachment)
    {
      let metaData = {
        contentType : attachment.type
      }
      let uploadTask = storageRef
        .child(`business/users/${userId.current}/attachments/${attachment.name}`)
        .put(attachment, metaData);
      
        uploadTask.on('state_changed', 
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress)
          // console.log('Upload is ' + progress + '% done');
          // switch (snapshot.state) {
          //   case firebase.storage.TaskState.PAUSED: // or 'paused'
          //     console.log('Upload is paused');
          //     break;
          //   case firebase.storage.TaskState.RUNNING: // or 'running'
          //     console.log('Upload is running');
          //     break;
          // }
        }, 
        (error) => {
          // Handle unsuccessful uploads
          console.log(error)
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then( async (downloadURL) => {
            // console.log('File available at', downloadURL);
            obj.attachmentUrl = downloadURL;
            obj.timestamp = firebase.fromSecondsToTimestamp();
            let res = await firebase.addBusinessForm(obj);
            if (res) {
              clearState();
              setSuccessSnackBarOpen(true);
            } else {
              setSuccessSnackBarOpen(false);
            }
            setIsFormSubmitting(false);
          });
        }
      );     
    }
    else{
      obj.timestamp = firebase.fromSecondsToTimestamp();
      let res = await firebase.addBusinessForm(obj);
      if (res) {
        clearState();
        setSuccessSnackBarOpen(true);
      } else {
        setSuccessSnackBarOpen(false);
      }
      setIsFormSubmitting(false);
    }    
  };
  
  const clearState = () => {
    setName("");
    setEmail("");
    setUrl("");
    setAttachment("");
    setProgress(0);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let att = e.target.files[0];
      setAttachment(att);
    } 
  };

  return (
    user && (
      <>
        <Grid className="BusinessPage">
          <Grid className="form-container">
            <div class="float-container">
              <div class="float-child-button">
                <Container>
                  <ButtonsComponent />
                </Container>
              </div>
              <Container>
                <div class="float-child">
                  <Paper elevation={10} className="form">
                    <Grid align="center">
                      <h1>Contact Us</h1>
                    </Grid>
                    <FormControl
                      className={clsx(classes.withoutLabel)}
                      fullWidth
                    >
                      <TextField
                        style={{ marginRight: 10, marginLeft: 10 }}
                        error={nameError.length > 0}
                        helperText={nameError}
                        autoFocus
                        id="name"
                        label="Enter Name"
                        type="text"
                        variant="outlined"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormControl
                      className={clsx(classes.withoutLabel)}
                      fullWidth
                    >
                      <TextField
                        style={{ marginRight: 10, marginLeft: 10 }}
                        error={emailError.length > 0}
                        helperText={emailError}
                        id="email"
                        label="Enter Email"
                        type="email"
                        variant="outlined"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </FormControl>
                    <FormControl
                      className={clsx(classes.withoutLabel)}
                      fullWidth
                    >
                      <TextField
                        style={{ marginRight: 10, marginLeft: 10 }}
                        error={urlError.length > 0}
                        helperText={urlError}
                        id="url"
                        label="URL of Videos"
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="urls..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                      />
                    </FormControl>
                    <Typography
                      style={{ marginTop: 15, marginLeft: 10, fontSize: 20 }}
                    >
                      Attachment
                    </Typography>
                    <div>
                      <Input
                        style={{ marginLeft: 10, marginRight: 10}}
                        type="file"
                        onChange={handleChange}
                        value={attachment.value}
                      />
                      {progress>0 && <ProgressBar animated now={`${progress}`} label={`${progress}%`} srOnly/>}
                    </div>

                    {isFormSubmitting ? (
                      <div
                        className={clsx(classes.withoutLabel)}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <CircularProgress color="secondary" />
                      </div>
                    ) : (
                      <FormControl className={clsx(classes.withoutLabel)}>
                        <Button
                          style={{ margin: 5 }}
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={handleFormSubmit}
                        >
                          Submit
                        </Button>
                      </FormControl>
                    )}
                  </Paper>
                </div>
              </Container>
            </div>
          </Grid>
        </Grid>
        <PopUpToast
          successSnackBarOpen={successSnackBarOpen}
          setSuccessSnackBarOpen={setSuccessSnackBarOpen}
          vertical="top"
          horizontal="center"
          severity="success"
          message="Form Submitted Succesfully"
        />
      </>
    )
  );
};
const Component = withFirebase(BusinessPage);

export default withRouter(Component);
