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
      {/*if still loading and the profile is null, show the loading spinner graphic, else show our Fragment*/}
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name}</i>
        {/*if the user exists, show the user's name*/}
      </p>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

// export default connect(mapStateToProps, { deleteAccount })(Dashboard);
export default connect(mapStateToProps, {})(Dashboard);
