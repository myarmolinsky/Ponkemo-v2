import React from "react";
import { string } from "prop-types";
import { Link } from "react-router-dom";

export const MenuItem = ({ text, color }) => {
  return (
    <Link to={`/${text}`}>
      <button className="menu-item" style={{ background: color }}>
        {text}
      </button>
    </Link>
  );
};

MenuItem.propTypes = {
  text: string.isRequired,
  color: string.isRequired,
};
