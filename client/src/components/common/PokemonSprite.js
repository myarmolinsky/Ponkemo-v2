import React from "react";
import { string, bool, func } from "prop-types";

export const PokemonSprite = ({ sprite, caption, alt, visible, onClick }) => {
  return (
    <div className="pokedex-item" onClick={onClick}>
      {visible && (
        <>
          <img className="sprite" src={sprite} alt={alt} />
          {caption && <p variant="caption">{caption}</p>}
        </>
      )}
    </div>
  );
};

PokemonSprite.propTypes = {
  sprite: string.isRequired,
  caption: string,
  alt: string.isRequired,
  visible: bool,
  onClick: func,
};

PokemonSprite.defaultProps = {
  visible: true,
  caption: "",
  onClick: () => {},
};
