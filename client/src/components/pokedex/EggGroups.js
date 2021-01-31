import React from "react";
import { Link } from "react-router-dom";

export const EggGroups = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="large text-primary">Egg Groups</h1>
      <ul>
        <li className="lead">
          <Link to="/egggroups/Amorphous">Amorphous</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Bug">Bug</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Ditto">Ditto</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Dragon">Dragon</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Fairy">Fairy</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Field">Field</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Flying">Flying</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Grass">Grass</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Human-Like">Human-Like</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Legendary">Legendary</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Mineral">Mineral</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Monster">Monster</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Unown">Unown</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Water 1">Water 1</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Water 2">Water 2</Link>
        </li>
        <li className="lead">
          <Link to="/egggroups/Water 3">Water 3</Link>
        </li>
      </ul>
    </div>
  );
};
