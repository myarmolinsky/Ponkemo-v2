import React, { Fragment, useState, useEffect, useContext } from "react";
import { PokemonContext } from "../../context";
import Spinner from "../layout/Spinner";
import { SearchFilter, Dex } from "../common";

export const Pokedex = () => {
  const { getAllPokemon, pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);

  useEffect(() => {
    getAllPokemon();
  }, [getAllPokemon]);

  useEffect(() => {
    if (pokedex) {
      setFilteredPokedex(pokedex);
    }
  }, [pokedex]);

  return (
    <Fragment>
      {filteredPokedex === null || loading ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <SearchFilter
            pokedex={pokedex}
            setFilteredPokedex={(filtered) => setFilteredPokedex(filtered)}
          />
          <hr style={{ marginTop: "1em" }} />
          <br />
          <Dex dex={filteredPokedex} />
        </Fragment>
      )}
    </Fragment>
  );
};
