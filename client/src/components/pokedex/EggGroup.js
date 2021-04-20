import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { any } from "prop-types";
import { Button } from "@material-ui/core";
import { PokemonContext } from "../../context";
import { Spinner } from "../layout";
import { SearchFilter, Dex } from "../common";

export const EggGroup = ({ match }) => {
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

  const directToPokemon = (pokemon) => {
    return `/pokedex/${pokemon.id}`;
  };

  return pokedex === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        component={Link}
        to="/egggroups"
      >
        To Egg Groups
      </Button>
      <h1 className="large text-primary">{match.params.eggGroup} Egg Group</h1>
      <SearchFilter
        pokedex={eggGroup}
        setFilteredDex={(filtered) => setFilteredPokedex(filtered)}
        showBothEggGroups={false}
      />
      <Dex dex={filteredPokedex} onClick={directToPokemon} />
    </Fragment>
  );
};

EggGroup.propTypes = {
  match: any.isRequired,
};
