import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../firebase";
import {
  TextField,
  Grid,
  FormControl,
  Button,
  CircularProgress,
} from "@material-ui/core/";
import "./BusinessPage.css";
import { PopUpToast } from "../../components";
import { Container} from "react-bootstrap";
import Navbar from "./Navbar";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  withoutLabel: {
    marginTop: theme.spacing(4),
  },
}));

const BusinessPage = ({ firebase, history }) => {
  const classes = useStyles();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [dmenu, setDmenu] = useState("");
  
  const userId = useRef("");
  
  console.log(user)

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (userAuth) => {
      if(userAuth){
        userId.current = userAuth.uid;
        let userDetails = await firebase.getUserProfileDetails(userAuth.uid)
        const data = userDetails.data();
        console.log(data);
        if(data){
          setUser({...userAuth, name:data.fName+" "+data.lName, email:data.email, phone:data.phone});}
        }
      else{
        history.push("/login");
      }
    });
  }, []);

  const handleFormSubmit = async () => {

    if(!message){
      return setMessageError("Enter something");
    }else{
      setMessageError("");
    }

    setIsFormSubmitting(true);

    let obj = {
      name:user.name,
      email:user.email,
      phone:user.phone,
      info:dmenu,
      message,      
      status:0,
    };
      obj.timestamp = firebase.fromSecondsToTimestamp();
      let res = await firebase.addBusinessForm(obj);
      if (res) {
        clearState();
        setSuccessSnackBarOpen(true);
      } else {
        setSuccessSnackBarOpen(false);
      }
      setIsFormSubmitting(false);   
  };
  
  const clearState = () => {
    setDmenu("");
    setMessage("");
  };

  const handleDropdown = (e) => {
      setDmenu(e.target.value);
  }

  return (
      user && (<>
      <Navbar firebase={firebase}/>
        <Grid className="BusinessPage">
          <Grid className="form-container">
            <div class="float-container">
            <img style={{width:670, height:500, marginTop:30}} src="https://p1.pxfuel.com/preview/210/23/628/contact-visit-letters-email.jpg"></img>
              <Container style={{width:640, float:'right', marginTop:40, marginRight:30}}>
                <div class="float-child">
                  <Grid align="center">
                      <h3>Fill out this form to get in touch with us</h3>
                    </Grid>
                    
                    <div style={{display:'inline-flex'}}>
                    <FormControl
                      className={clsx(classes.withoutLabel)}
                    >
                      <TextField
                        style={{ marginRight: 10, marginLeft: 10, width:245}}
                        disabled
                        type="text"
                        variant="outlined"
                        value={user.name}
                      />
                    </FormControl>
                    <FormControl
                      className={clsx(classes.withoutLabel)}
                    >
                      <TextField
                        style={{ marginRight: 10, marginLeft: 10, width:280}}
                        disabled
                        type="text"
                        variant="outlined"
                        value={user.email}
                      />
                    </FormControl>
                    </div>
                    <div style={{display:'inline-flex'}}>
                    <FormControl
                      className={clsx(classes.withoutLabel)}
                      
                    >
                    <TextField
                        style={{ marginRight: 10, marginLeft: 10, width:245}}
                        disabled
                        type="text"
                        variant="outlined"
                        value={user.phone}
                    />
                    </FormControl>
                    <FormControl
                      className={clsx(classes.withoutLabel)}
                    >
                    <div style={{ marginRight: 10, marginLeft: 10, width:280}}>
                    <select style={{height:55, width:280}} value={dmenu} onChange={handleDropdown}>
                      <option value="How did you hear about Explified?">How did you hear about Explified?</option>
                      <option value="Friends or Business Referral">Friends or Business Referral</option>
                      <option value="Google">Google</option>
                      <option value="Youtube">Youtube</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Linkdin">Linkdin</option>
                      <option value="Others">Others</option>
                    </select> 
                    </div>
                    </FormControl>
                    </div>                  
                    <FormControl
                      className={clsx(classes.withoutLabel)}
                      fullWidth
                    >
                    
                      <TextField
                        style={{ marginRight: 10, marginLeft: 10 }}
                        id="message"
                        error={messageError.length > 0}
                        helperText={messageError}
                        label="Message"
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="Enter your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </FormControl>
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
                          style={{ marginLeft:10 }}
                          type="submit"
                          variant="contained"
                          color="primary"
                          onClick={handleFormSubmit}
                        >
                          Submit
                        </Button>
                      </FormControl>
                    )}
                    <div style={{marginTop:20, fontSize:15}}>* Kindly wait patiently, our team will contact you after reviewing your submission</div>
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
        <Footer/>
      </>)
  );
};
const Component = withFirebase(BusinessPage);

export default withRouter(Component);
