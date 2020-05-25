import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  //we want to be able to dispatch more than 1 action type from this action so we make the arrow function point to 'dispatch' which points to the function
  //we are able to do this because of our 'thunk' middleware
  const id = uuid.v4(); //there a different ways we can generate a uuid, varying between versions. we are using version 4 so we do 'uuid.v4()'
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id } //the payload will contain the msg passed into 'setAlert()', the alertType passed into 'setAlert()', and the random id we generated
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout); //this will make the alert time out after 5 seconds
};
