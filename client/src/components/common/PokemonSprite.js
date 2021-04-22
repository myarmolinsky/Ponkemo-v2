import React from "react";
import { string, bool, func } from "prop-types";

export const PokemonSprite = ({
  sprite,
  caption,
  alt,
  visible,
  showCaption,
  onClick,
}) => {
  return (
    <>
      <div className="dex-entry" onClick={onClick}>
        {visible && (
          <img
            style={{ height: "auto", width: "auto" }}
            src={sprite}
            alt={alt}
          />
        )}
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
  onClick: func,
};

PokemonSprite.defaultProps = {
  caption: "",
  visible: true,
  showCaption: true,
  onClick: () => {},
};
