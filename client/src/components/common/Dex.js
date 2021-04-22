import React from "react";
import { Link } from "react-router-dom";
import { array, func, bool } from "prop-types";
import { Grid } from "@material-ui/core";
import { PokemonSprite } from "./PokemonSprite";

export const Dex = ({ dex, showCaption, onClick, isVisible, linkTo }) => {
  /**
   *
   * @param {boolean} isLink
   * @param {any} children
   * @param {string} to
   * @returns The children are wrapped in a Link to "to" if isLink is true or wrapped in a fragment is isLink is false
   */
  const ConditionalLink = ({ isLink, children, to }) =>
    isLink ? <Link to={to}>{children}</Link> : <>{children}</>;

  return (
    <Grid container justify="space-evenly" alignContent="center" spacing={3}>
      {dex.map((pokemon, index) => (
        <Grid key={index} item xs="auto">
          <ConditionalLink isLink={linkTo(pokemon) !== ""} to={linkTo(pokemon)}>
            <PokemonSprite
              sprite={pokemon.sprite}
              caption={pokemon.name}
              alt={pokemon.name}
              visible={isVisible(index)}
              showCaption={showCaption}
              onClick={() => onClick(pokemon, index)}
            />
          </ConditionalLink>
        </Grid>
      ))}
    </Grid>
  );
};

Dex.propTypes = {
  dex: array.isRequired,
  showCaption: bool,
  onClick: func,
  isVisible: func,
  linkTo: func,
};

Dex.defaultProps = {
  showCaption: true,
  onClick: () => {},
  isVisible: () => {
    return true;
  },
  linkTo: () => "",
};
