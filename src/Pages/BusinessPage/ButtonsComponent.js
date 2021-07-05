import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from "react-router-dom";

const ButtonsComponent = (number) => {
    return(
        <div style={{marginTop:20}}>
        <Link to="/" style={{textDecoration:'none'}}>  
        <Button style={{margin:10, width:100, height:50}} variant='contained'>Request</Button>
        </Link>
        <Link to="/pending" style={{textDecoration:'none'}}>
        <Button style={{margin:10, width:100, height:50}} variant='contained'>Pending</Button>
        </Link>
        <Link to="/ongoing" style={{textDecoration:'none'}}>
        <Button style={{margin:10, width:100, height:50}} variant='contained'>Ongoing</Button>
        </Link>
        <Link to="/done" style={{textDecoration:'none'}}>
        <Button style={{margin:10, width:100, height:50}} variant='contained'>Done</Button>
        </Link>
        </div>
    );
}

export default ButtonsComponent;