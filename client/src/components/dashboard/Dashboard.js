import React, { Fragment, useContext } from "react";
import { UserContext } from "../../context";

export const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.username}</i>
        {/*if the user exists, show the user's name*/}
      </p>
      {/* THIS IS WHERE ALL THE BUTTONS FOR CATCHING, FORAGING, TRAINING, ETC GO */}
    </Fragment>
  );
};
