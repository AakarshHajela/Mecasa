import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withFirebase } from "../../firebase";

const PrivateRoute = ({ component: Component, firebase, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!!firebase.isLoggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: "/login" }} />;
        }
      }}
    />
  );
};

export default withFirebase(PrivateRoute);
