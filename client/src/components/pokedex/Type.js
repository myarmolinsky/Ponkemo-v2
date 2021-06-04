import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { any } from "prop-types";
import { Button } from "@material-ui/core";
import { PokemonContext } from "../../context";
import { Spinner } from "../layout";
import { SearchFilter, Dex, CustomPagination } from "../common";

export const Type = ({ match }) => {
  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);
  const [type, setType] = useState([]);
  const [page, setPage] = useState(1);

  const PAGE_LENGTH = 48; // how many Pokemon to show per page
  const PAGES = Math.ceil(filteredPokedex.length / PAGE_LENGTH); // how many pages there are

  useEffect(() => {
    setType(
      pokedex.filter((pokemon) => pokemon.types.includes(match.params.type))
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
        size="large"
        variant="contained"
        color="secondary"
        component={Link}
        to="/types"
      >
        To Types
      </Button>
      <h1 className="large text-primary">{match.params.type} Types</h1>
      <SearchFilter
        pokedex={type}
        setFilteredDex={(filtered) => setFilteredPokedex(filtered)}
        showBothTypes={false}
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

Type.propTypes = {
  match: any.isRequired,
};
