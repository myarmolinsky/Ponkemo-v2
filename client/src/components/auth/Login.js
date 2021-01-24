import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, TextField, Grid } from "@material-ui/core";
import { UserContext } from "../../context";

export const Login = () => {
  const { login, isAuthenticated } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
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
      <h1 className="large text-primary">Sign In</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <Grid container direction="column">
          <Grid item>
            <TextField
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
              placeholder="Password"
              name="password"
              onChange={(e) => onChange(e)}
              variant="outlined"
              required
              margin="normal"
              type="password"
            />
          </Grid>
        </Grid>
        <Button color="primary" type="submit" variant="contained">
          Login
        </Button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};
