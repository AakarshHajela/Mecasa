import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute/PrivateRoute";
import Page404 from "./Pages/Page404";
import { UserSignIn, UserSignUp, ForgotPassword, BusinessPage } from "./Pages";

const Main = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={(props) => <UserSignIn {...props} />} />

        <PrivateRoute
          exact
          path="/"
          component={(props) => <BusinessPage {...props} />}
        />

        <Route
          path="/sign-up"
          component={(props) => <UserSignUp {...props} />}
        />
        <Route
          path="/forgot-password"
          component={(props) => <ForgotPassword {...props} />}
        />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
