import React from "react";
import { string, bool, func } from "prop-types";

export const PokemonSprite = ({
  sprite,
  caption,
  alt,
  visible,
  showCaption,
  selected,
  onClick,
}) => {
  return (
    <>
      <div
        className="dex-entry"
        style={selected ? { border: "solid" } : {}}
        onClick={onClick}
      >
        {visible && <img style={{ padding: "5%" }} src={sprite} alt={alt} />}
      </div>
      {visible && showCaption && (
        <div className="dex-entry-caption">{caption}</div>
      )}
    </>
  );
};

PokemonSprite.propTypes = {
  sprite: string.isRequired,
  caption: string,
  alt: string.isRequired,
  visible: bool,
  showCaption: bool,
  selected: bool,
  onClick: func,
};

PokemonSprite.defaultProps = {
  caption: "",
  visible: true,
  showCaption: true,
  selected: false,
  onClick: () => {},
};
