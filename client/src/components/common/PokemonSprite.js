import React from "react";
import { string, bool, func } from "prop-types";

export const PokemonSprite = ({ sprite, name, visible, onClick }) => {
  return (
    <div
      className="pokedex-item"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      onClick={onClick}
    >
      {visible && (
        <>
          <img className="sprite" src={sprite} alt={name} />
          <p variant="caption">{name}</p>
        </>
      )}
    </div>
  );
};

PokemonSprite.propTypes = {
  sprite: string.isRequired,
  name: string.isRequired,
  visible: bool,
  onClick: func,
};

PokemonSprite.defaultProps = {
  visible: true,
  onClick: () => {},
};
