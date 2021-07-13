import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
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

const Ongoing = ({ firebase, history }) => {
  const classes = useStyles();
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        history.push("/login");
      } else {
        setUser(userAuth);
        firebase.getForms(1, userAuth.uid).then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setDetails(data);
        });
      }
  }
  )
})

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
                      <h1>Ongoing Projects</h1>
                    </Grid>
                    <div>
                      {details.map((detail) => {
                        return (
                          <>
                            
                            <CustCard 
                            edit = {0}
                            docName = {detail.attName}
                            t={detail.docId}
                             timestamp ={detail.timestamp
                              .toDate()
                              .toString()
                              .substr(0, 24)}
                             url={detail.url} 
                             att={detail.attachment}/>
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
const Component = withFirebase(Ongoing);

export default withRouter(Component);
