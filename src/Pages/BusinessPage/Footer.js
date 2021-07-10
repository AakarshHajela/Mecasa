import React from 'react';
import './Footer.css';

const Footer = () => {
    return(
        <div className="footer" style={{display:'inline-flex',}}>
        <a style={{color:'white', marginRight:5}} href="https://explified.com/privacy-policy">
            Privacy Policy
        </a>
        <p style={{color:'white'}}> | </p>
        <a style={{color:'white', marginLeft:5}} href="http://explified.com/terms-of-service">
            Terms of Service
        </a>
        <p style={{color:'white', marginLeft:15}}>Copyright © 2021 EXPLIFIED. All Rights Reserved</p>
        </div>
    );
}

export default Footer;