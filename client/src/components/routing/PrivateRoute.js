import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  //'...rest' is the rest operator. it takes in anything else that is passed in
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? ( //the user should only be able to access PrivateRoutes if they are authenticated and not loading
        <Redirect to="/login" /> //otherwise they get redirected to the login page
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth //pull in all the state that is in the auth reducer
});

export default connect(mapStateToProps)(PrivateRoute);
