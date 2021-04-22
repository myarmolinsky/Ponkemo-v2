import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { object, number } from "prop-types";

export const OwnedPokemonInfo = ({ pokemon, info, index }) => {
  const ability = "";
  const nickname = "";
  const level = "";
  const heldItem = "";
  const friendship = "";
  const gender = "";
  const nature = "";
  const stats = {
    hp: 0,
    atk: 0,
    def: 0,
    spA: 0,
    spD: 0,
    spe: 0,
  };
  const evs = {
    hp: 0,
    atk: 0,
    def: 0,
    spA: 0,
    spD: 0,
    spe: 0,
  };
  const ivs = {
    hp: 0,
    atk: 0,
    def: 0,
    spA: 0,
    spD: 0,
    spe: 0,
  };
  const moves = [];

  return (
    <table
      style={{
        position: "fixed",
        right: 0,
        top: "7vh",
        height: "93vh",
        borderCollapse: "collapse",
        textAlign: "center",
      }}
    >
      <tbody>
        <tr>
          <th colSpan={4} style={{ borderRight: "none" }}>
            {nickname}
          </th>
          <th colSpan={2} style={{ borderLeft: "none", borderRight: "none" }}>
            lv. {level}
          </th>
          <th colSpan={2} style={{ borderLeft: "none" }}>
            STAR
          </th>
        </tr>
        <tr>
          <th colSpan={2}>Ability:</th>
          <td colSpan={2}>{ability}</td>
          <th colSpan={2}>Held Item:</th>
          <td colSpan={2}>{heldItem}</td>
        </tr>
        <tr>
          <th colSpan={2}>Friendship:</th>
          <td colSpan={2}>{friendship}</td>
          <th colSpan={2}>Gender:</th>
          <td colSpan={2}>{gender}</td>
        </tr>
        <tr>
          <th colSpan={2}>Nature:</th>
          <td colSpan={2}>{nature}</td>
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
          <td colSpan={2}>{stats.hp}</td>
          <td colSpan={2}>{ivs.hp}</td>
          <td colSpan={2}>{evs.hp}</td>
        </tr>
        <tr>
          <th colSpan={2}>Attack</th>
          <td colSpan={2}>{stats.atk}</td>
          <td colSpan={2}>{ivs.atk}</td>
          <td colSpan={2}>{evs.atk}</td>
        </tr>
        <tr>
          <th colSpan={2}>Defense</th>
          <td colSpan={2}>{stats.def}</td>
          <td colSpan={2}>{ivs.def}</td>
          <td colSpan={2}>{evs.def}</td>
        </tr>
        <tr>
          <th colSpan={2}>Special Attack</th>
          <td colSpan={2}>{stats.spA}</td>
          <td colSpan={2}>{ivs.spA}</td>
          <td colSpan={2}>{evs.spA}</td>
        </tr>
        <tr>
          <th colSpan={2}>Special Defense</th>
          <td colSpan={2}>{stats.spD}</td>
          <td colSpan={2}>{ivs.spD}</td>
          <td colSpan={2}>{evs.spD}</td>
        </tr>
        <tr>
          <th colSpan={2}>Speed</th>
          <td colSpan={2}>{stats.spe}</td>
          <td colSpan={2}>{ivs.spe}</td>
          <td colSpan={2}>{evs.spe}</td>
        </tr>
        <tr>
          <th colSpan={8}>Moves:</th>
        </tr>
        <tr>
          <td colSpan={2}>
            {moves.length > 0 ? moves[0] : <i className="fas fa-minus" />}
          </td>
          <td colSpan={2}>
            {moves.length > 1 ? moves[1] : <i className="fas fa-minus" />}
          </td>
          <td colSpan={2}>
            {moves.length > 2 ? moves[2] : <i className="fas fa-minus" />}
          </td>
          <td colSpan={2}>
            {moves.length > 3 ? moves[3] : <i className="fas fa-minus" />}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

OwnedPokemonInfo.propTypes = {
  pokemon: object.isRequired,
  dexInfo: object.isRequired,
  index: number.isRequired,
};
