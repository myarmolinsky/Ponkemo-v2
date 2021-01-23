import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { any } from "prop-types";
import { Button } from "@material-ui/core";
import { useStyles } from "../styles";
import { PokemonContext } from "../../context";
import Spinner from "../layout/Spinner";
import { SearchFilter, Dex } from "../common";

export const EggGroup = ({ match }) => {
  const classes = useStyles();

  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);
  const [eggGroup, setEggGroup] = useState([]);

  useEffect(() => {
    setEggGroup(
      pokedex.filter((pokemon) =>
        pokemon.breeding.eggGroups.includes(match.params.eggGroup)
      )
    );
  }, [pokedex, match]);

  return pokedex === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Button className={`${classes.button} ${classes.dark}`} size="large">
        <Link to="/egggroups" style={{ color: "white" }}>
          To Egg Groups
        </Link>
      </Button>
      <h1 className="large text-primary">{match.params.eggGroup} Egg Group</h1>
      <SearchFilter
        pokedex={eggGroup}
        setFilteredPokedex={(filtered) => setFilteredPokedex(filtered)}
      />
      <Dex dex={filteredPokedex} />
    </Fragment>
  );
};

EggGroup.propTypes = {
  match: any.isRequired,
};
