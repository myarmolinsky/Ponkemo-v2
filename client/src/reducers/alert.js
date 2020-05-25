import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  //this function takes in initialState as the first parameter called 'state'
  //the second parameter is an action, which will potentially contain 2 things
  //the first thing the action contains (which is mandatory) is the type
  //and the second thing is a payload which is the data (which we may not always have so this one is optional)
  switch (
    type //we evaluate the type of the action with this switch statement
  ) {
    //depending on the type, we need to decide what we want to send down as far as state, so we need to return something
    case SET_ALERT:
      return [...state, payload];
    //state is immutable so we have to include any other state that is already there so we use the spread operator followed by our 'state' parameter
    //this way if there is already an alert in there, we just copy it and add our new alert
    //we add our new alert by making the second parameter 'payload'
    //the payload has an id, a msg, and an alertType as can be seen in the example in our initialState const
    case REMOVE_ALERT: //here we are trying to remove all alerts with an id matching the payload (the payload is an id) from our 'state' array
      //to do this we do state.filter() and give the filter an arrow function which checks if the alert's id matches the payload
      return state.filter((alert) => alert.id !== payload);
    default:
      //every reducer we create will have a default state of 'return state'
      return state;
  }
}
