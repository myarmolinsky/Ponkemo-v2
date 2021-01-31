import React from "react";
import { Link } from "react-router-dom";

export const Types = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="large text-primary">Types</h1>
      <ul>
        <li className="lead">
          <Link to="/types/Bug">Bug</Link>
        </li>
        <li className="lead">
          <Link to="/types/Dark">Dark</Link>
        </li>
        <li className="lead">
          <Link to="/types/Dragon">Dragon</Link>
        </li>
        <li className="lead">
          <Link to="/types/Electric">Electric</Link>
        </li>
        <li className="lead">
          <Link to="/types/Fairy">Fairy</Link>
        </li>
        <li className="lead">
          <Link to="/types/Fighting">Fighting</Link>
        </li>
        <li className="lead">
          <Link to="/types/Fire">Fire</Link>
        </li>
        <li className="lead">
          <Link to="/types/Flying">Flying</Link>
        </li>
        <li className="lead">
          <Link to="/types/Ghost">Ghost</Link>
        </li>
        <li className="lead">
          <Link to="/types/Grass">Grass</Link>
        </li>
        <li className="lead">
          <Link to="/types/Ground">Ground</Link>
        </li>
        <li className="lead">
          <Link to="/types/Ice">Ice</Link>
        </li>
        <li className="lead">
          <Link to="/types/Normal">Normal</Link>
        </li>
        <li className="lead">
          <Link to="/types/Poison">Poison</Link>
        </li>
        <li className="lead">
          <Link to="/types/Psychic">Psychic</Link>
        </li>
        <li className="lead">
          <Link to="/types/Rock">Rock</Link>
        </li>
        <li className="lead">
          <Link to="/types/Steel">Steel</Link>
        </li>
        <li className="lead">
          <Link to="/types/Water">Water</Link>
        </li>
      </ul>
    </div>
  );
};
