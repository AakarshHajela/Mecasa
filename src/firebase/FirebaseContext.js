import React from "react";
import { useHistory } from "react-router-dom";

const FirebaseContext = React.createContext(null);

export const withFirebase = (Component) => (props) => {
  const history = useHistory();

  return (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <Component {...props} firebase={firebase} history={history} />
      )}
    </FirebaseContext.Consumer>
  );
};

export default FirebaseContext;
