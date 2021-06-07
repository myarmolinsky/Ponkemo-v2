import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Button, TextField, Grid, Box } from "@material-ui/core";
import { UserContext } from "../../context";
import { Alert } from "../layout";

export const ForgotPassword = () => {
  const { sendPasswordResetEmail, isAuthenticated } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(email);
  };

  // Redirect to menu if already logged in/registered
  if (isAuthenticated) {
    return <Redirect to="/menu" />;
  }

  return (
    <div className="center">
      <h1 className="large text-primary">Send Password Reset Email</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              label="Email"
              placeholder="Email"
              name="email"
              onChange={(e) => onChange(e)}
              variant="outlined"
              required
              margin="normal"
            />
          </Grid>
        </Grid>
        <Box margin={1}>
          <Button color="primary" type="submit" variant="contained">
            Send Password Reset Email
          </Button>
        </Box>
      </form>
      <Alert />
    </div>
  );
};
