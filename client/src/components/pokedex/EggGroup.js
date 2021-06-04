import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { any } from "prop-types";
import { Button } from "@material-ui/core";
import { PokemonContext } from "../../context";
import { Spinner } from "../layout";
import { SearchFilter, Dex, CustomPagination } from "../common";

export const EggGroup = ({ match }) => {
  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);
  const [eggGroup, setEggGroup] = useState([]);
  const [page, setPage] = useState(1);

  const PAGE_LENGTH = 48; // how many Pokemon to show per page
  const PAGES = Math.ceil(filteredPokedex.length / PAGE_LENGTH); // how many pages there are

  useEffect(() => {
    setEggGroup(
      pokedex.filter((pokemon) =>
        pokemon.breeding.eggGroups.includes(match.params.eggGroup)
      )
    );
  }, [pokedex, match]);

  useEffect(() => {
    setPage(1);
  }, [filteredPokedex]);

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
      <CustomPagination pages={PAGES} currentPage={page} setPage={setPage}>
        <Dex
          dex={filteredPokedex.slice(
            (page - 1) * PAGE_LENGTH,
            page * PAGE_LENGTH
          )}
          getLinkTo={directToPokemon}
        />
      </CustomPagination>
    </Fragment>
  );
};

EggGroup.propTypes = {
  match: any.isRequired,
};
