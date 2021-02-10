import React from "react";
import { string } from "prop-types";

export const MenuItem = ({ text, color }) => {
  return (
    <button
      className="menu-item"
      style={{ background: color }}
      onClick={() => console.log(text)}
    >
      {text}
    </button>
  );
};

MenuItem.propTypes = {
  text: string.isRequired,
  color: string.isRequired,
};
