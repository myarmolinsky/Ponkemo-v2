import React, { useEffect, useState, useContext } from "react";
import { UserContext, PokemonContext } from "../../context";
import { Spinner } from "../layout";
import { Dex, SearchFilter, CustomPagination } from "../common";
import { OwnedPokemonInfo } from "./OwnedPokemonInfo";

export const PC = () => {
  const { loading, ownedPokemon, getAllOwnedPokemon } = useContext(UserContext);
  const { pokedex } = useContext(PokemonContext);

  const [ownedPokemonDex, setOwnedPokemonDex] = useState([]);
  const [filteredOwnedPokemon, setFilteredOwnedPokemon] = useState([]);
  const [filteredOwnedPokemonDex, setFilteredOwnedPokemonDex] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedPokemonUid, setSelectedPokemonUid] = useState(-1);

  const PAGE_LENGTH = 30; // how many Pokemon to show per page
  const PAGES = Math.ceil(filteredOwnedPokemon.length / PAGE_LENGTH); // how many pages there are

  useEffect(() => {
    getAllOwnedPokemon();
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
    let dex = ownedPokemonDex;
    dex.forEach((pokemon, index) => (pokemon.uid = index));
    setFilteredOwnedPokemonDex(dex);
  }, [ownedPokemonDex]);

  useEffect(() => {
    setPage(1);
  }, [filteredOwnedPokemon, filteredOwnedPokemonDex]);

  const isShiny = (index) => {
    return ownedPokemon[
      (page * PAGE_LENGTH - (page - 1) * PAGE_LENGTH) * page -
        PAGE_LENGTH +
        index
    ].shiny
      ? true
      : false;
  };

  const isSelected = (pokemon, index) => {
    return selectedPokemonUid === pokemon.uid;
  };

  return loading || !ownedPokemon ? (
    <Spinner />
  ) : (
    <div className="pc">
      <div className="pc-left">
        <SearchFilter
          pokedex={ownedPokemonDex}
          setFilteredDex={(filtered) => setFilteredOwnedPokemonDex(filtered)}
          ownedPokemon={ownedPokemon}
          setFilteredOwnedPokemon={(filtered) =>
            setFilteredOwnedPokemon(filtered)
          }
        />
        <CustomPagination pages={PAGES} currentPage={page} setPage={setPage}>
          <Dex
            dex={filteredOwnedPokemonDex.slice(
              (page - 1) * PAGE_LENGTH,
              page * PAGE_LENGTH
            )}
            onClick={(pokemon) => setSelectedPokemonUid(pokemon.uid)}
            isShiny={isShiny}
            isSelected={isSelected}
          />
        </CustomPagination>
      </div>
      <div className="pc-right">
        <OwnedPokemonInfo
          pokemon={
            selectedPokemonUid === -1 ? {} : ownedPokemon[selectedPokemonUid]
          }
          dexInfo={
            selectedPokemonUid === -1 ? {} : ownedPokemonDex[selectedPokemonUid]
          }
          index={selectedPokemonUid}
        />
      </div>
    </div>
  );
};
