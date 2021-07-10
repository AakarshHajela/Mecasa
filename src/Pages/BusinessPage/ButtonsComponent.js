import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const ButtonsComponent = (number) => {
  return (
    <>
    <div style={{ marginTop: 20 }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button
          style={{ margin: 10, width: 100, height: 50 }}
          variant="contained"
          color='primary'
        >
          Request
        </Button>
      </Link>
      </div>
      <div>
      <Link to="/pending" style={{ textDecoration: "none" }}>
        <Button
          style={{ margin: 10, width: 100, height: 50 }}
          variant="contained"
          color='primary'
        >
          Pending
        </Button>
      </Link>
      </div>
      <div>
      <Link to="/ongoing" style={{ textDecoration: "none" }}>
        <Button
          style={{ margin: 10, width: 100, height: 50 }}
          variant="contained"
          color='primary'
        >
          Ongoing
        </Button>
      </Link>
      </div>
      <div>
      <Link to="/done" style={{ textDecoration: "none" }}>
        <Button
          style={{ margin: 10, width: 100, height: 50, backgroundColor:'#00EA20' }}
          variant="contained"
          color='primary'
        >
          Done
        </Button>
      </Link>
      </div>
      <div>
      <Link to="/rejected" style={{ textDecoration: "none" }}>
        <Button
          style={{ margin: 10, width: 100, height: 50, backgroundColor:'#F51E19' }}
          variant="contained"
          color='primary'
        >
          Rejected
        </Button>
      </Link>
    </div>
    </>
  );
};

export default ButtonsComponent;
