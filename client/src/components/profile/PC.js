import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context";
import { Spinner } from "../layout";
import { Dex, SearchFilter, CustomPagination } from "../common";

export const PC = () => {
  const { user, loading, ownedPokemon, loadUser } = useContext(UserContext);

  const [ownedPokemonDex, setOwnedPokemonDex] = useState([]);
  const [filteredOwnedPokemon, setFilteredOwnedPokemon] = useState([]);
  const [page, setPage] = useState(1);

  const PAGE_LENGTH = 48; // how many Pokemon to show per page
  const PAGES = Math.ceil(filteredOwnedPokemon.length / PAGE_LENGTH); // how many pages there are

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (ownedPokemon) {
      setOwnedPokemonDex(ownedPokemon.map((pokemon) => pokemon.pokemon));
      setFilteredOwnedPokemon(ownedPokemon.map((pokemon) => pokemon.pokemon));
    }
  }, [ownedPokemon]);

  return loading || !user ? (
    <Spinner />
  ) : (
    <>
      <SearchFilter
        pokedex={ownedPokemonDex}
        setFilteredDex={(filtered) => setFilteredOwnedPokemon(filtered)}
      />
      <CustomPagination pages={PAGES} currentPage={page} setPage={setPage}>
        <Dex
          dex={filteredOwnedPokemon.slice(
            (page - 1) * PAGE_LENGTH,
            page * PAGE_LENGTH
          )}
        />
      </CustomPagination>
    </>
  );
};
