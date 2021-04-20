import React, { useEffect, useState, useContext } from "react";
import { UserContext, PokemonContext } from "../../context";
import { Spinner } from "../layout";
import { Dex, SearchFilter, CustomPagination } from "../common";
import { OwnedPokemonInfo } from "./OwnedPokemonInfo";

export const PC = () => {
  const { user, loading, ownedPokemon, loadUser } = useContext(UserContext);
  const { pokedex } = useContext(PokemonContext);

  const [ownedPokemonDex, setOwnedPokemonDex] = useState([]);
  const [filteredOwnedPokemon, setFilteredOwnedPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(-1);

  const PAGE_LENGTH = 30; // how many Pokemon to show per page
  const PAGES = Math.ceil(filteredOwnedPokemon.length / PAGE_LENGTH); // how many pages there are

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (pokedex.length > 0 && ownedPokemon) {
      setOwnedPokemonDex(
        ownedPokemon.map((ownedPoke) => {
          return {
            pokemon: ownedPoke,
            info: pokedex.filter(
              (pokedexPoke) => pokedexPoke.id === ownedPoke.id
            )[0],
          };
        })
      );
    }
  }, [ownedPokemon, pokedex]);

  useEffect(() => {
    if (ownedPokemon) {
      setFilteredOwnedPokemon(ownedPokemon);
    }
  }, [ownedPokemon]);

  const setCorrespondingOwnedPokemon = (pokemon, index) => {
    setSelectedPokemonIndex(
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
        {/* <SearchFilter
          pokedex={ownedPokemonDex.map((pokemon) => pokemon.info)}
          setFilteredDex={(filtered) => setFilteredOwnedPokemon(filtered)}
        /> */}
        {console.log(selectedPokemonIndex)}
        <CustomPagination pages={PAGES} currentPage={page} setPage={setPage}>
          <Dex
            dex={ownedPokemonDex
              .map((pokemon) => pokemon.info)
              .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)}
            onClick={setCorrespondingOwnedPokemon}
          />
        </CustomPagination>
      </div>
      <div className="pc-right" style={{ flex: 1 }}>
        {/* <OwnedPokemonInfo /> */}
      </div>
    </div>
  );
};
