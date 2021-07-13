import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../../firebase";
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
import Typography from "@material-ui/core/Typography";
import ButtonsComponent from "./ButtonsComponent";
import CustCard from "./CustCard";
import Navbar from "./Navbar";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  withoutLabel: {
    marginTop: theme.spacing(4),
  },
}));

const Pending = ({ firebase, history }) => {
  const classes = useStyles();
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [user, setUser] = useState(false);
  const userId = useRef("");

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        history.push("/login");
      } else {
        setUser(userAuth);
        userId.current = userAuth.uid;
        firebase.getForms(0, userAuth.uid).then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({...doc.data(),docId:doc.id}));
          setDetails(data);
          console.log(data)
        });
        
      }
    });
  }, []);

  const handleDelete = async (id,name) => {
    let storageRef = firebase.storage.ref();
    let fil = storageRef.child(`business/users/${userId.current}/attachments/${name}`)
    fil.delete().then(() => {
      console.log("File deleted successfully")
    }).catch((error) => {
      console.log("Uh-oh, an error occurred!")
    });
    await firebase.deleteBusinessForm(id);
    let newDetail = [];
    details.map((detail) => {
      if (detail.docId !== id) {
        newDetail.push(detail);
      } else {
        return;
      }
    });
    setDetails(newDetail);
  }

  return (
    user && (
      <>
      <Navbar firebase={firebase}/>
        <Grid className="BusinessPage">
          <Grid className="form-container">
            <div class="float-container">
              <Container>
              <div class="float-child-button">
              </div>
                <div class="float-child">
                    <Grid align="center">
                      <h1>Pending Requests</h1>
                    </Grid>
                    <div>
                      {details.map((detail) => {
                        return (
                          <>
                            <CustCard
                            edit = {1}
                            resubmit = {0}
                            det = {detail}                            
                            timestamp ={detail.timestamp
                              .toDate()
                              .toString()
                              .substr(0, 24)}
                            handleDelete={handleDelete}
                            />
                          </>
                        );
                      })}
                    </div>
                </div>
              </Container>
            </div>
          </Grid>
        </Grid>
        <Footer/>
      </>
    )
  );
};
const Component = withFirebase(Pending);

export default withRouter(Component);
