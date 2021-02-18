import React from "react";

export const OwnedPokemonInfo = ({ pokemon }) => {
  return (
    <div
      style={{
        border: "solid",
        borderRadius: "25px",
        background: "gray",
        textAlign: "center",
        width: "150%",
      }}
    >
      {pokemon.nickname} <br />
      {pokemon.stats.atk}
    </div>
  );
};
