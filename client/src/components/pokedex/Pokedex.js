import React, { Fragment } from "react";
import { connect } from "react-redux";

const Pokedex = () => {
  return (
    <Fragment>
      <h1 className="large text-primary">Pokedex</h1>
      <p className="lead">Display all Pokemon</p>
    </Fragment>
  );
};

export default connect()(Pokedex);
