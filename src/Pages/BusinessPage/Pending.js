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
import Typography from "@material-ui/core/Typography";
import ButtonsComponent from "./ButtonsComponent";
import CustCard from "./CustCard";

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

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        history.push("/login");
      } else {
        setUser(userAuth);
        firebase.getForms(0, userAuth.uid).then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setDetails(data);
          console.log(data)
        });
        
      }
    });
  }, []);

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
                      <h1>Pending Requests</h1>
                    </Grid>
                    <div>
                      {details.map((detail) => {
                        return (
                          <>
                            <CustCard name={detail.name} email={detail.email} url={detail.url} att={detail.attachment}/>
                          </>
                        );
                      })}
                    </div>
                  </Paper>
                </div>
              </Container>
            </div>
          </Grid>
        </Grid>
      </>
    )
  );
};
const Component = withFirebase(Pending);

export default withRouter(Component);
