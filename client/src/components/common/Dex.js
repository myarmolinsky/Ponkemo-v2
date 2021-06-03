import React from "react";
import { Link } from "react-router-dom";
import { array, func, bool } from "prop-types";
import { Grid } from "@material-ui/core";
import { PokemonSprite } from "./PokemonSprite";

export const Dex = ({
  dex,
  showCaption,
  onClick,
  isVisible,
  getLinkTo,
  isShiny,
  isSelected,
}) => {
  /**
   * @desc Determine whether to wrap the children in a Link or a fragment
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
          <ConditionalLink
            isLink={getLinkTo(pokemon) !== ""}
            to={getLinkTo(pokemon)}
          >
            <PokemonSprite
              sprite={isShiny(index) ? pokemon.shinySprite : pokemon.sprite}
              caption={pokemon.name}
              alt={pokemon.name}
              visible={isVisible(pokemon, index)}
              showCaption={showCaption}
              onClick={() => onClick(pokemon, index)}
              selected={isSelected(pokemon, index)}
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
  getLinkTo: func,
  isShiny: func,
  isSelected: func,
};

Dex.defaultProps = {
  showCaption: true,
  onClick: () => {},
  isVisible: () => true,
  getLinkTo: () => "",
  isShiny: () => false,
  isSelected: () => false,
};
