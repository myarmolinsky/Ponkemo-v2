import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useStyles } from "../styles";
import { UserContext } from "../../context";

export const Landing = () => {
  const classes = useStyles();

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
          <div>
            <Button
              className={`${classes.button} ${classes.active} ${classes.dark}`}
            >
              <Link to="/login" style={{ color: "white" }}>
                Login
              </Link>
            </Button>
            <Button
              className={`${classes.button} ${classes.active} ${classes.primary}`}
            >
              <Link to="/register" style={{ color: "white" }}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
