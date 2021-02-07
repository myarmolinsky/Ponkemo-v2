import React from "react";
import spinner from "../../assets/spinner.gif";

export const Spinner = () => (
  <div className="center">
    <img
      src={spinner}
      style={{
        width: "200px",
        margin: "auto",
      }}
      alt="Loading..."
    />
  </div>
);
