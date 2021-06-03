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
  const [chosenPokemon, setChosenPokemon] = useState({});

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
    setFilteredOwnedPokemonDex(ownedPokemonDex);
  }, [ownedPokemonDex]);

  useEffect(() => {
    setPage(1);
  }, [filteredOwnedPokemon, filteredOwnedPokemonDex]);

  useEffect(() => {
    if (ownedPokemon) {
      let pokemon = {};
      let info = {};
      for (let i = 0; i < ownedPokemon.length; i++) {
        if (ownedPokemon[i].uid === selectedPokemonUid) {
          pokemon = ownedPokemon[i];
          info = ownedPokemonDex[i];
          break;
        }
      }
      setChosenPokemon({ pokemon, info });
    }
  }, [selectedPokemonUid, ownedPokemon, ownedPokemonDex]);

  const isShiny = (uid) => {
    let pokemon = ownedPokemon.filter((pokemon) => pokemon.uid === uid)[0];
    return pokemon?.shiny ? true : false;
  };

  const handlePokemonSelect = (pokemon, index) => {
    setSelectedPokemonUid(
      filteredOwnedPokemon[
        (page * PAGE_LENGTH - (page - 1) * PAGE_LENGTH) * page -
          PAGE_LENGTH +
          index
      ].uid
    );
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
            onClick={(pokemon, index) => {
              handlePokemonSelect(pokemon, index);
            }}
            isShiny={isShiny}
            isSelected={isSelected}
          />
        </CustomPagination>
      </div>
      <div className="pc-right">
        <OwnedPokemonInfo
          pokemon={selectedPokemonUid === -1 ? {} : chosenPokemon.pokemon}
          dexInfo={selectedPokemonUid === -1 ? {} : chosenPokemon.info}
          uid={selectedPokemonUid}
        />
      </div>
    </div>
  );
};
