import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  alerts = uniqueAlerts(alerts);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};
//map through the alerts and output the message along with the class styling

const uniqueAlerts = (alerts) => {
  let dispatchedAlerts = [];
  let uniqueAlerts = [];
  alerts.forEach((alert) => {
    if (!dispatchedAlerts.includes(alert.msg)) {
      dispatchedAlerts.push(alert.msg);
      uniqueAlerts.push(alert);
    }
  });
  return uniqueAlerts;
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  //we want to map the state via connect()
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
