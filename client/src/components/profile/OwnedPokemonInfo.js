import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { object, number, string } from "prop-types";

export const OwnedPokemonInfo = ({ pokemon, index, ability }) => {
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
          <th colSpan={4} style={{ borderRight: "none" }}>
            {pokemon.nickname}
          </th>
          <th colSpan={2} style={{ borderLeft: "none", borderRight: "none" }}>
            lv. {pokemon.level}
          </th>
          <th colSpan={2} style={{ borderLeft: "none" }}>
            STAR
          </th>
        </tr>
        <tr>
          <th colSpan={2}>Ability:</th>
          <td colSpan={2}>{ability}</td>
          <th colSpan={2}>Held Item:</th>
          <td colSpan={2}>{pokemon.heldItem}</td>
        </tr>
        <tr>
          <th colSpan={2}>Friendship:</th>
          <td colSpan={2}>{pokemon.friendship}</td>
          <th colSpan={2}>Gender:</th>
          <td colSpan={2}>{pokemon.gender}</td>
        </tr>
        <tr>
          <th colSpan={2}>Nature:</th>
          <td colSpan={2}>{pokemon.nature}</td>
          <th colSpan={2}>Evo Lock:</th>
          <td colSpan={2}>UNLOCKED</td>
        </tr>
        <tr>
          <th colSpan={2}>
            <Button
              color="primary"
              variant="contained"
              component={Link}
              to={`/train/${index}`}
              style={{ marginRight: "1%" }}
            >
              Train
            </Button>
            <Button
              color="secondary"
              variant="contained"
              component={Link}
              to={`/breed/${index}`}
              style={{ marginLeft: "1%" }}
            >
              Breed
            </Button>
          </th>
          <th colSpan={2}>Stats</th>
          <th colSpan={2}>IVs</th>
          <th colSpan={2}>EVs</th>
        </tr>
        <tr>
          <th colSpan={2}>Health</th>
          <td colSpan={2}>{pokemon.stats.hp}</td>
          <td colSpan={2}>{pokemon.ivs.hp}</td>
          <td colSpan={2}>{pokemon.evs.hp}</td>
        </tr>
        <tr>
          <th colSpan={2}>Attack</th>
          <td colSpan={2}>{pokemon.stats.atk}</td>
          <td colSpan={2}>{pokemon.ivs.atk}</td>
          <td colSpan={2}>{pokemon.evs.atk}</td>
        </tr>
        <tr>
          <th colSpan={2}>Defense</th>
          <td colSpan={2}>{pokemon.stats.def}</td>
          <td colSpan={2}>{pokemon.ivs.def}</td>
          <td colSpan={2}>{pokemon.evs.def}</td>
        </tr>
        <tr>
          <th colSpan={2}>Special Attack</th>
          <td colSpan={2}>{pokemon.stats.spA}</td>
          <td colSpan={2}>{pokemon.ivs.spA}</td>
          <td colSpan={2}>{pokemon.evs.spA}</td>
        </tr>
        <tr>
          <th colSpan={2}>Special Defense</th>
          <td colSpan={2}>{pokemon.stats.spD}</td>
          <td colSpan={2}>{pokemon.ivs.spD}</td>
          <td colSpan={2}>{pokemon.evs.spD}</td>
        </tr>
        <tr>
          <th colSpan={2}>Speed</th>
          <td colSpan={2}>{pokemon.stats.spe}</td>
          <td colSpan={2}>{pokemon.ivs.spe}</td>
          <td colSpan={2}>{pokemon.evs.spe}</td>
        </tr>
        <tr>
          <th colSpan={8}>Moves:</th>
        </tr>
        <tr>
          <td colSpan={2}>
            {pokemon.moves.length > 0 ? (
              pokemon.moves[0]
            ) : (
              <i className="fas fa-minus" />
            )}
          </td>
          <td colSpan={2}>
            {pokemon.moves.length > 1 ? (
              pokemon.moves[1]
            ) : (
              <i className="fas fa-minus" />
            )}
          </td>
          <td colSpan={2}>
            {pokemon.moves.length > 2 ? (
              pokemon.moves[2]
            ) : (
              <i className="fas fa-minus" />
            )}
          </td>
          <td colSpan={2}>
            {pokemon.moves.length > 3 ? (
              pokemon.moves[3]
            ) : (
              <i className="fas fa-minus" />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

OwnedPokemonInfo.propTypes = {
  pokemon: object.isRequired,
  index: number.isRequired,
  ability: string.isRequired,
};
