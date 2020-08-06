import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Types = () => {
  return (
    <Fragment>
      <h1 className="large text-primary">Types</h1>
      <ul>
        <li>
          <span className="lead">
            <Link to="/types/Bug">Bug</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Dark">Dark</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Dragon">Dragon</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Electric">Electric</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Fairy">Fairy</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Fighting">Fighting</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Fire">Fire</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Flying">Flying</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Ghost">Ghost</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Grass">Grass</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Ground">Ground</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Ice">Ice</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Normal">Normal</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Poison">Poison</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Psychic">Psychic</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Rock">Rock</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Steel">Steel</Link>
          </span>
        </li>
        <li>
          <span className="lead">
            <Link to="/types/Water">Water</Link>
          </span>
        </li>
      </ul>
    </Fragment>
  );
};

export default connect()(Types);
