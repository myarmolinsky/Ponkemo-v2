import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { any } from "prop-types";
import { Button } from "@material-ui/core";
import { useStyles } from "../styles";
import { PokemonContext } from "../../context";
import Spinner from "../layout/Spinner";
import { SearchFilter, Dex } from "../common";

export const Type = ({ match }) => {
  const classes = useStyles();

  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    setType(
      pokedex.filter((pokemon) => pokemon.types.includes(match.params.type))
    );
  }, [pokedex, match]);

  return pokedex === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Button
        className={`${classes.button} ${classes.active} ${classes.dark}`}
        size="large"
      >
        <Link to="/types" style={{ color: "white" }}>
          To Types
        </Link>
      </Button>
      <h1 className="large text-primary">{match.params.type} Types</h1>
      <SearchFilter
        pokedex={type}
        setFilteredPokedex={(filtered) => setFilteredPokedex(filtered)}
        showBothTypes={false}
      />
      <Dex dex={filteredPokedex} />
    </Fragment>
  );
};

Type.propTypes = {
  match: any.isRequired,
};
