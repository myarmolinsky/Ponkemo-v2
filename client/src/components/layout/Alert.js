import React, { useContext } from "react";
import { MiscContext } from "../../context";

export const Alert = () => {
  const { alerts } = useContext(MiscContext);

  let uniqueAlerts = getUniqueAlerts(alerts);
  return (
    uniqueAlerts !== null &&
    uniqueAlerts.length > 0 &&
    uniqueAlerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};
//map through the alerts and output the message along with the class styling

const getUniqueAlerts = (alerts) => {
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
