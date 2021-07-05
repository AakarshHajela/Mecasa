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
import { Container,Row,Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ButtonsComponent from "./ButtonsComponent";

const useStyles = makeStyles((theme) => ({
  withoutLabel: {
    marginTop: theme.spacing(4),
  },
}));

const Done = ({ firebase, history }) => {
  const classes = useStyles();
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [details,setDetails] = useState([]);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        history.push("/login");
      } else {
        setUser(userAuth);
      }
    });
  }, []);

  useEffect(() => {
    firebase.getForms(2).then(querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      setDetails(data);
    });
  }, [])

  return (
    user && (
      <>
        <Grid className="BusinessPage">
          <Grid className="form-container">
          <div class="float-container">
            <div class="float-child-button">
            <Container>
              <ButtonsComponent/>
            </Container>
            </div>
            <Container>
            <div class="float-child">
            <Paper elevation={10} className="form">
              <Grid align="center">
                <h1>Finished Projects</h1>
              </Grid>
              <div>
              {details.map((detail) => {return <><div  className='card' style={{margin:10}}> <h5>{detail.name} {detail.email} {detail.url} {detail.attachment} </h5></div></>})}
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
const Component = withFirebase(Done);

export default withRouter(Component);
