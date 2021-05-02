import React, { useEffect, useState, useContext } from "react";
import { UserContext, PokemonContext } from "../../context";
import { Spinner } from "../layout";
import { Dex, SearchFilter, CustomPagination } from "../common";
import { OwnedPokemonInfo } from "./OwnedPokemonInfo";

export const PC = () => {
  const { user, loading, ownedPokemon, loadUser, getOwnedPokemon } = useContext(
    UserContext
  );
  const { pokedex } = useContext(PokemonContext);

  const [ownedPokemonDex, setOwnedPokemonDex] = useState([]);
  const [filteredOwnedPokemon, setFilteredOwnedPokemon] = useState([]);
  const [filteredOwnedPokemonDex, setFilteredOwnedPokemonDex] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(-1);

  const PAGE_LENGTH = 30; // how many Pokemon to show per page
  const PAGES = Math.ceil(filteredOwnedPokemon.length / PAGE_LENGTH); // how many pages there are

  useEffect(() => {
    loadUser();
    getOwnedPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pokedex.length > 0 && ownedPokemon) {
      setOwnedPokemonDex(
        ownedPokemon.map(
          (ownedPoke) =>
            pokedex.filter((pokedexPoke) => pokedexPoke.id === ownedPoke.id)[0]
        )
      );
    }
  }, [ownedPokemon, pokedex]);

  useEffect(() => {
    if (ownedPokemon) {
      setFilteredOwnedPokemon(ownedPokemon);
    }
  }, [ownedPokemon]);

  useEffect(() => {
    setFilteredOwnedPokemonDex(ownedPokemonDex);
  }, [ownedPokemonDex]);

  const setOwnedPokemonIndex = (pokemon, index) => {
    setSelectedPokemonIndex(
      (page * PAGE_LENGTH - (page - 1) * PAGE_LENGTH) * page -
        PAGE_LENGTH +
        index
    );
  };

  const isShiny = (index) => {
    return ownedPokemon[
      (page * PAGE_LENGTH - (page - 1) * PAGE_LENGTH) * page -
        PAGE_LENGTH +
        index
    ].shiny
      ? true
      : false;
  };

  const isSelected = (index) => {
    return (
      selectedPokemonIndex ===
      (page * PAGE_LENGTH - (page - 1) * PAGE_LENGTH) * page -
        PAGE_LENGTH +
        index
    );
  };

  return loading || !user ? (
    <Spinner />
  ) : (
    <div className="pc" style={{ display: "flex", flexDirection: "row" }}>
      <div className="pc-left" style={{ flex: 3 }}>
        {/* PC SearchFilter TODO */}
        {/* <SearchFilter
          pokedex={ownedPokemonDex.map((pokemon) => pokemon.dexInfo)}
          setFilteredDex={(filtered) => setFilteredOwnedPokemon(filtered)}
        /> */}
        <CustomPagination pages={PAGES} currentPage={page} setPage={setPage}>
          <Dex
            dex={ownedPokemonDex.slice(
              (page - 1) * PAGE_LENGTH,
              page * PAGE_LENGTH
            )}
            onClick={setOwnedPokemonIndex}
            isShiny={isShiny}
            isSelected={isSelected}
          />
        </CustomPagination>
      </div>
      <div className="pc-right" style={{ flex: 1 }}>
        <OwnedPokemonInfo
          pokemon={
            selectedPokemonIndex === -1
              ? {}
              : ownedPokemon[selectedPokemonIndex]
          }
          dexInfo={
            selectedPokemonIndex === -1
              ? {}
              : ownedPokemonDex[selectedPokemonIndex]
          }
          index={selectedPokemonIndex}
        />
      </div>
    </div>
  );
};
