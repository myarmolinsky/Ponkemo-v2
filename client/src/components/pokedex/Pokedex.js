import React, { Fragment, useState, useEffect, useContext } from "react";
import { PokemonContext } from "../../context";
import { Spinner } from "../layout";
import { SearchFilter, Dex, DexSettingsButtons } from "../common";

export const Pokedex = () => {
  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);
  const [showFormes, setShowFormes] = useState(false);
  const [shinySprites, setShinySprites] = useState(false);

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
          <DexSettingsButtons
            toggleShinySprites={() => setShinySprites(!shinySprites)}
            toggleShowFormes={() => setShowFormes(!showFormes)}
          />
          <Dex dex={filteredPokedex} />
        </Fragment>
      )}
    </Fragment>
  );
};
