import React, { useContext } from "react";
import { MiscContext } from "../../context";

export const Alert = () => {
  let { alerts } = useContext(MiscContext);

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
