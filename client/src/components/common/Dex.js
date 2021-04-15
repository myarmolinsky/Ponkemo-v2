import React from "react";
import { array, bool, func } from "prop-types";
import { Grid } from "@material-ui/core";
import { PokemonSprite } from "./PokemonSprite";

export const Dex = ({ dex, onClick, matching, invisibleIndexes }) => {
  return (
    <Grid container spacing={3}>
      {dex.map((pokemon, index) => (
        <Grid item key={index} xs={2}>
          <PokemonSprite
            sprite={pokemon.sprite}
            caption={pokemon.name}
            alt={pokemon.name}
            visible={matching ? invisibleIndexes.includes(index) : true}
            onClick={() => onClick({ pokemon, index })}
          />
        </Grid>
      ))}
    </Grid>
  );
};

Dex.propTypes = {
  dex: array.isRequired,
  onClick: func,
  matching: bool,
  invisibleIndexes: array,
};

Dex.defaultProps = {
  onClick: () => {},
  matching: false,
  invisibleIndexes: [],
};
