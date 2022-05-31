import React,{useEffect, useState, useRef} from 'react';
import './Navbar.css';
import { withRouter } from "react-router-dom";
import {withFirebase} from "../../firebase";
const Navbar=({firebase, history}) => {
  const [scrolled,setScrolled]=React.useState(false);
  const [user, setUser] = useState(false);
  const userId = useRef("");

  // useEffect(() => {
  //   firebase.auth.onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       userId.current = userAuth.uid;
  //       console.log(userId);
  //       let userDetails = await firebase.getUserProfileDetails(userAuth.uid)
  //       const data = userDetails.data();
  //       console.log(data);
  //       if(data){
  //         setUser({...userAuth, name:data.fName+" "+data.lName, email:data.email, phone:data.phone});}
  //         }
  //     else{
  //       history.push("/");
  //     }
  //     })
  //   },[])
const handleScroll=() => {
    setScrolled(true);
  }

  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })
let navbarClasses=['navbar'];
  if(scrolled){
    navbarClasses.push('scrolled');
  }

  const handleLogin = ()=> {
    history.push('/login');
  }

  const handleLogout = ()=>{
    firebase.signOutUser();
    window.location.reload();
  }

   return (
    <header className="header">
        <div className="logo">
            <img src="/mecasa_logo.png" style={{height:'80px'}}/>
        </div>
    </header>
   )
};
const Component = withFirebase(Navbar);
export default withRouter(Component);