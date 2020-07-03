/*
this is where we will fetch all of our data using an action
then we'll bring it in from the redux state
then we'll pass it down to other components (such as experience and education)
*/

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Dashboard = ({ auth: { user } }) => {
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

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Dashboard);
