import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { UserContext } from "../../context";

export const Landing = () => {
  const { isAuthenticated } = useContext(UserContext);

  if (isAuthenticated) {
    //we don't want logged in users to be sent to the landing page, instead we want to send them to the dashboard
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Ponkemo</h1>
          <p className="lead">
            Log in or create an account so you can catch, train, and battle
            Pokemon!
          </p>
          <Grid container justify="center" spacing={1}>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" fullWidth>
                <Link to="/login" style={{ color: "white" }}>
                  Login
                </Link>
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="secondary" fullWidth>
                <Link to="/register" style={{ color: "white" }}>
                  Sign Up
                </Link>
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  );
};
