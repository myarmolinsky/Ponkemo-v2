import React from "react";

export const OwnedPokemonInfo = ({ pokemon }) => {
  return (
    <table
      style={{
        borderCollapse: "collapse",
        textAlign: "center",
        background: "gray",
        width: "150%",
      }}
    >
      <tbody>
        <tr>
          <th className="table-head" colSpan={6}>
            {pokemon.nickname}
          </th>
        </tr>
        <tr>
          <th className="table-head" colSpan={6}>
            Stats
          </th>
        </tr>
        <tr>
          <th className="table-head">HP</th>
          <th className="table-head">Atk</th>
          <th className="table-head">Def</th>
          <th className="table-head">SpA</th>
          <th className="table-head">SpD</th>
          <th className="table-head">Spe</th>
        </tr>
        <tr>
          <td className="table-body">{pokemon.stats.hp}</td>
          <td className="table-body">{pokemon.stats.atk}</td>
          <td className="table-body">{pokemon.stats.def}</td>
          <td className="table-body">{pokemon.stats.spA}</td>
          <td className="table-body">{pokemon.stats.spD}</td>
          <td className="table-body">{pokemon.stats.spe}</td>
        </tr>
      </tbody>
    </table>
  );
};
