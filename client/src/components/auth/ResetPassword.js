import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button, TextField, Grid, Box } from "@material-ui/core";
import { UserContext, MiscContext } from "../../context";
import { AccessDenied, Alert } from "../layout";

export const ResetPassword = ({ match }) => {
  const {
    resetPassword,
    isPasswordResetTokenValid,
    isAuthenticated,
    resetPasswordUsername,
  } = useContext(UserContext);
  const { setAlert } = useContext(MiscContext);

  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });

  const { password, password2 } = formData;

  useEffect(() => {
    isPasswordResetTokenValid(match.params.token);
  }, [match.params.token, isPasswordResetTokenValid]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      resetPassword(password);
    }
  };

  // Redirect to menu if already logged in/registered or if the token is invalid
  if (isAuthenticated) {
    return <Redirect to="/menu" />;
  }

  return !resetPasswordUsername ? (
    <AccessDenied />
  ) : (
    <div className="center">
      <h1 className="large text-primary">Reset Password</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container direction="column">
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
        <Box margin={1}>
          <Button color="primary" type="submit" variant="contained">
            Submit New Password
          </Button>
        </Box>
      </form>
      <Alert />
    </div>
  );
};
