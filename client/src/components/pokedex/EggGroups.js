import React from "react";
import { Link } from "react-router-dom";

export const EggGroups = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="large text-primary">Egg Groups</h1>
      <ul>
        <li>
          <span className="lead">
            <Link to="/egggroups/Amorphous">Amorphous</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Bug">Bug</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Ditto">Ditto</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Dragon">Dragon</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Fairy">Fairy</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Field">Field</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Flying">Flying</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Grass">Grass</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Human-Like">Human-Like</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Legendary">Legendary</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Mineral">Mineral</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Monster">Monster</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Unown">Unown</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Water 1">Water 1</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Water 2">Water 2</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/egggroups/Water 3">Water 3</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};
