import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute/PrivateRoute";
import Page404 from "./Pages/Page404";
import {
  UserSignIn,
  UserSignUp,
  ForgotPassword,
} from "./Pages";
import Home from "./Pages/LandingPage/Home";
import LandingPage from "./Pages/LandingPage/LandingPage";
import About from "./Pages/LandingPage/About";
import Services from "./Pages/LandingPage/Services";
import Portfolio from "./Pages/LandingPage/Portfolio";

const Main = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={(props) => <UserSignIn {...props} />} />

        <PrivateRoute
          exact
          path="/"
          component={(props) => <LandingPage {...props} />}
        />

        <Route path="/home" component={(props) => <Home {...props}/>} />

        <Route path="/about" component={(props) => <About {...props}/>} />
        
        <Route path="/services" component={(props) => <Services {...props}/>} />

        <Route path="/portfolio" component={(props) => <Portfolio {...props}/>} />

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
