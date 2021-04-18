import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { PokemonContext } from "../../context";
import { Spinner } from "../layout";
import { SearchFilter, Dex, CustomPagination } from "../common";

export const Pokedex = () => {
  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);
  const [page, setPage] = useState(1);

  const PAGE_LENGTH = 48; // how many Pokemon to show per page
  const PAGES = Math.ceil(filteredPokedex.length / PAGE_LENGTH); // how many pages there are
  let history = useHistory();

  useEffect(() => {
    if (pokedex) {
      setFilteredPokedex(pokedex);
    }
  }, [pokedex]);

  const directToPokemon = (pokemon) => {
    history.push(`/pokedex/${pokemon.id}`);
  };

  return (
    <Fragment>
      {filteredPokedex === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <SearchFilter
            pokedex={pokedex}
            setFilteredDex={(filtered) => setFilteredPokedex(filtered)}
          />
          <CustomPagination pages={PAGES} currentPage={page} setPage={setPage}>
            <Dex
              dex={filteredPokedex.slice(
                (page - 1) * PAGE_LENGTH,
                page * PAGE_LENGTH
              )}
              onClick={directToPokemon}
            />
          </CustomPagination>
        </Fragment>
      )}
    </Fragment>
  );
};
