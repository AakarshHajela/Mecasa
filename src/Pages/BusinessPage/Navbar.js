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
import Call from "@material-ui/icons/Call"
import HelpDialog from "./HelpDialog";

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

    const [showDialog, setShowDialog] = useState(false);

    return (
      <>
      <HelpDialog open={showDialog} setOpen={setShowDialog}/>
        <div className="navbar-container">
          <div className="left-container">
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
          <Button style={{margin:10, borderRadius:0}} variant='outlined' className='call-button'><Call style={{margin:5}}/>Schedule a Call</Button>
            <IconButton style={{marginRight:10}} onClick={()=>setShowDialog(true)}><HelpIcon fontSize="large" /></IconButton>
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