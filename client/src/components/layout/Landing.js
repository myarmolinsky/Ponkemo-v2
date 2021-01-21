import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
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
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
