import React, { Fragment, useState, useEffect, useContext } from "react";
import { PokemonContext } from "../../context";
import Spinner from "../layout/Spinner";
import { SearchFilter, Dex } from "../common";

export const Pokedex = () => {
  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);

  useEffect(() => {
    if (pokedex) {
      setFilteredPokedex(pokedex);
    }
  }, [pokedex]);

  return (
    <Fragment>
      {filteredPokedex === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <SearchFilter
            pokedex={pokedex}
            setFilteredPokedex={(filtered) => setFilteredPokedex(filtered)}
          />
          <Dex dex={filteredPokedex} />
        </Fragment>
      )}
    </Fragment>
  );
};
