import React, {useState, useEffect, useRef} from 'react';
import './Content.css';
import Products from './Products';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Prod_details from './Prod_details';
import { withRouter } from "react-router-dom";
import {withFirebase} from "../../firebase";
import {getDownloadURL, getStorage} from "firebase/storage";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Content=({firebase, history}) => {
  
  const [option,setOption] = useState("Option 1");
  const [productId, setProductId] = useState("1");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(false);
  const userId = useRef("");

  useEffect(() => {
    firebase.auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        userId.current = userAuth.uid;
        console.log(userId);
        let userDetails = await firebase.getUserProfileDetails(userAuth.uid)
        const data = userDetails.data();
        console.log(data);
        if(data){
          setUser({...userAuth, name:data.fName+" "+data.lName, email:data.email, phone:data.phone});}
          }
      })
    },[])

  useEffect(()=>{
    firebase.getImageOption(option).then((querySnapshot)=>{
      const dat = querySnapshot.docs.map((doc) => ({...doc.data(), docId:doc.id}));
      console.log(dat);
      setData(dat);
    });
  },[option])

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e, id) => {
    console.log(id);
    setProductId(id);
    setOpen(true);
  };

  console.log(productId);
  const handleClose = () => {
    setOpen(false);
  };

  firebase.getURL("p1");

  return (
    <>
      <div style={{margin:30, marginLeft:'400px'}}>
        <ToggleButtonGroup
          value={option}
          onChange={(e, newOption)=>{
            if(newOption !== null)
              setOption(newOption);
          }}
          exclusive>
        <ToggleButton className='toggle_button' value="Option 1"><h3>Option 1</h3></ToggleButton>
        <ToggleButton className='toggle_button' value="Option 2"><h3>Option 2</h3></ToggleButton>
        <ToggleButton className='toggle_button' value="Option 3"><h3>Option 3</h3></ToggleButton>
        </ToggleButtonGroup>
      </div>
      <main className="content">
            {data.map((item) => (
              <div className='card' key={item.id} onClick={event => handleClickOpen(event, item.id)}>
                  <img alt="" style={{height:'180px', width:'180px', borderTopRightRadius:'20px', borderTopLeftRadius:'20px'}} src={item.thumb}/>
                  <div class="hoverText">
                    <div style={{fontWeight:'bolder', fontSize:16}}>SELECT PRODUCT</div>
                  </div>
                  <p style={{marginTop:2}}>{item.name}</p>
              </div>
          ))}
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Sound
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <List>
              {Prod_details(productId)}
            </List>
          </Dialog>
      </main>
      
    </>
  )
}

const Component = withFirebase(Content);
export default withRouter(Component);