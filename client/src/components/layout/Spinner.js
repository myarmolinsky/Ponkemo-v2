import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: "200px",
        margin: "auto",
        display: "block",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      alt="Loading..."
    />
  </Fragment>
);
