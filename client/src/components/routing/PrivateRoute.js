import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  //'...rest' is the rest operator. it takes in anything else that is passed in
  const { isAuthenticated, loading } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? ( //the user should only be able to access PrivateRoutes if they are authenticated and not loading
          <Redirect to="/login" /> //otherwise they get redirected to the login page
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
