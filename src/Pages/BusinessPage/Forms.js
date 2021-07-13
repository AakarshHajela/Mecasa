import {React, useState} from 'react';
import {TextField,FormControl} from "@material-ui/core/";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  withoutLabel: {
    marginTop: theme.spacing(4),
  },
}));

const Forms = ({name, setName, email, setEmail}) => {
    const classes = useStyles();
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    if (!name) {
      setEmailError("");
      return setNameError("Name is Required");
    } else {
      setNameError("");
    }
    if (email !== /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) {
      return setEmailError("Enter valid Email address");
    } else {
      setNameError("");
      setEmailError("");
    }

    return(
        <div style={{display:'inline-flex'}}>
        <FormControl
          className={clsx(classes.withoutLabel)}
          fullWidth
        >
          <TextField
            style={{ marginRight: 10, marginLeft: 10, width:240}}
            error={nameError.length > 0}
            helperText={nameError}
            autoFocus
            id="name"
            label="Enter Name"
            type="text"
            variant="outlined"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl
          className={clsx(classes.withoutLabel)}
          fullWidth
        >
          <TextField
            style={{ marginRight: 10, marginLeft: 10, width:245}}
            error={emailError.length > 0}
            helperText={emailError}
            id="Email"
            label="Enter Email"
            type="text"
            variant="outlined"
            placeholder="Enter your Email"
            value={email}
            multiline
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        </div>
    );
}

export default Forms;