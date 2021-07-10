import {React, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import NotificationsIcon from "@material-ui/icons/Notifications";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import "./Navbar.css";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import SideBar from "./SideBar";

const useStyles = makeStyles((theme) => ({
    cancelBtn: {
      margin: theme.spacing(2),
      color: "#fff",
      border: "1px solid #fff",
      "&:hover": {
        backgroundColor: "#fff",
        color: "#f50057",
      },
    },
  }));
  
  const Navbar = ({ firebase}) => {
    let history = useHistory();

    const [showBar, setShowBar] = useState(false);

    return (
      <>
      <SideBar showBar={showBar} setShowBar={setShowBar}/>
        <div className="navbar-container">
          <div className="left-container">
            {/* <div><Button onClick={()=>setShowBar(true)}><Menu/></Button></div> */}
            <div>
              <img src={`${process.env.PUBLIC_URL}/explified.svg`} alt="logo" />
            </div>
            <div>
              <a href={"https://explified.com"} style={{marginLeft:5, color:'white', textDecoration:'none'}}>
                Explified
                </a>
            </div>
          </div>
          <div className="right-container">
            <HelpIcon fontSize="large" />
            <NotificationsIcon fontSize="large" />
            <div id="avatar">
              <Avatar />
              <KeyboardArrowDownIcon />
              <div id="user-tools">
                <Button
                  onClick={() => {
                    firebase.signOutUser();
                    history.push("/login");
                  }}
                  title="Logout"
                  variant="contained"
                  color="secondary"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  export default Navbar;