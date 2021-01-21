import React, { useReducer } from "react";
import { any } from "prop-types";
import { MiscContext } from "./MiscContext";
import miscReducer from "./miscReducer";
import { SET_ALERT, REMOVE_ALERT } from "./types";
import uuid from "uuid";

export const MiscState = ({ children }) => {
  const initialState = { alerts: [] };

  const [state, dispatch] = useReducer(miscReducer, initialState);

  const setAlert = (msg, alertType, timeout = 5000) => {
    const id = uuid.v4(); //there a different ways we can generate a uuid, varying between versions. we are using version 4 so we do 'uuid.v4()'
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id }, //the payload will contain the msg passed into 'setAlert()', the alertType passed into 'setAlert()', and the random id we generated
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout); //this will make the alert time out after 5 seconds
  };

  return (
    <MiscContext.Provider
      value={{
        ...state,
        setAlert,
      }}
    >
      {children}
    </MiscContext.Provider>
  );
};

MiscState.propTypes = {
  children: any.isRequired,
};
