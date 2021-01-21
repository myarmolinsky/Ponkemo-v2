import { SET_ALERT, REMOVE_ALERT } from "./types";

export default function (state, action) {
  const { type, payload } = action;
  let { alerts } = state;
  //this function takes in state as the first parameter
  //the second parameter is an action, which will potentially contain 2 things
  //the first thing the action contains (which is mandatory) is the type
  //and the second thing is a payload which is the data (which we may not always have so this one is optional)
  switch (type) {
    case SET_ALERT:
      alerts.push(payload);
      return { ...state, alerts };
    //this way if there is already an alert in there, we just copy it and add our new alert
    //we add our new alert by making the second parameter 'payload'
    //the payload has an id, a msg, and an alertType as can be seen in the example in our initialState const
    case REMOVE_ALERT: //here we are trying to remove all alerts with an id matching the payload (the payload is an id) from our 'state' array
      //to do this we do state.filter() and give the filter an arrow function which checks if the alert's id matches the payload
      alerts = alerts.filter((alert) => alert.id !== payload);
      return {
        ...state,
        alerts,
      };
    default:
      //every reducer we create will have a default state of 'return state'
      return state;
  }
}
