import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { any } from "prop-types";
import { Button } from "@material-ui/core";
import { PokemonContext } from "../../context";
import { Spinner } from "../layout";
import { SearchFilter, Dex, DexSettingsButtons } from "../common";

export const Type = ({ match }) => {
  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);
  const [type, setType] = useState([]);
  const [showFormes, setShowFormes] = useState(false);
  const [shinySprites, setShinySprites] = useState(false);

  useEffect(() => {
    setType(
      pokedex.filter((pokemon) => pokemon.types.includes(match.params.type))
    );
  }, [pokedex, match]);

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
        setFilteredPokedex={(filtered) => setFilteredPokedex(filtered)}
        showBothTypes={false}
      />
      <DexSettingsButtons
        toggleShinySprites={() => setShinySprites(!shinySprites)}
        toggleShowFormes={() => setShowFormes(!showFormes)}
      />
      <Dex dex={filteredPokedex} />
    </Fragment>
  );
};

Type.propTypes = {
  match: any.isRequired,
};
