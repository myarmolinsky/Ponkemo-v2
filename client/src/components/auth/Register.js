import React, { useState, useContext } from "react"; //we bring in the 'useState' hook because we are using a functional component
import { Link, Redirect } from "react-router-dom";
import { Button, TextField, Grid } from "@material-ui/core";
import { UserContext, MiscContext } from "../../context";

//since it's a form, we need to have some component state because each input needs to have its own state
//they also needs to have an 'onchange' handler so when we type in it, it updates the state
export const Register = () => {
  const { register, isAuthenticated } = useContext(UserContext);
  const { setAlert } = useContext(MiscContext);

  const [formData, setFormData] = useState(
    //pull this from useState()
    {
      //default values go inside here
      username: "",
      email: "",
      password: "",
      password2: "",
    }
  );

  const { username, email, password, password2 } = formData; //destructure and pull those values from the state 'formData'
  //the first thing inside the [] brackets is our state, which is 'formData', so it will be an object with all the field values
  //the second thing is the function we want to use to update our state, which is 'setFormData'

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //'onChange' calls 'setFormData()
  //in 'setFormData()' we want to change the state but we only want to change the 'name' field so we make a copy of 'formData' with the spread operator ('...')
  //after copying the state, we put in the field we want to change and what we want to change it to
  //we want to change the field associated with the name of the part of the form we are filling out so we use '[e.target.name]' to get the name of it
  //and we set the field to the new value in the part of the form we are changing by using 'e.target.value'

  const onSubmit = async (e) => {
    e.preventDefault(); //do this because this is a submit
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ username, email, password });
    }
  };

  // Redirect to dashboard if already logged in/registered
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: -1,
      }}
    >
      <h1 className="large text-primary">Sign Up</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="Username"
              placeholder="Username"
              name="username"
              onChange={(e) => onChange(e)}
              variant="outlined"
              required
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Email Address"
              placeholder="Email Address"
              name="email"
              onChange={(e) => onChange(e)}
              variant="outlined"
              required
              margin="normal"
              type="email"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              placeholder="Password"
              name="password"
              onChange={(e) => onChange(e)}
              variant="outlined"
              required
              margin="normal"
              type="password"
            />
          </Grid>
          <Grid item>
            <TextField
              label="Re-enter Password"
              placeholder="Re-enter Password"
              name="password2"
              onChange={(e) => onChange(e)}
              variant="outlined"
              required
              margin="normal"
              type="password"
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};
