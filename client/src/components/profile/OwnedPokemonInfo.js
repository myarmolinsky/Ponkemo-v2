import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { object, number } from "prop-types";
import { PokemonSprite } from "../common";

export const OwnedPokemonInfo = ({ pokemon, dexInfo, index }) => {
  const [displayInfo, setDisplayInfo] = useState({
    ability: "",
    nickname: "",
    name: "",
    level: "",
    favorite: false,
    sprite: "",
    heldItem: "",
    friendship: "",
    gender: "",
    nature: "",
    stats: {
      hp: 0,
      atk: 0,
      def: 0,
      spA: 0,
      spD: 0,
      spe: 0,
    },
    evs: {
      hp: 0,
      atk: 0,
      def: 0,
      spA: 0,
      spD: 0,
      spe: 0,
    },
    ivs: {
      hp: 0,
      atk: 0,
      def: 0,
      spA: 0,
      spD: 0,
      spe: 0,
    },
    moves: [],
  });

  const pokemonAbility = useMemo(() => {
    if (dexInfo?.abilities?.length > 0 && pokemon.ability >= 0) {
      if (pokemon.ability === 0) {
        return dexInfo.hiddenAbility !== ""
          ? dexInfo.hiddenAbility
          : dexInfo.abilities[0];
      } else if (pokemon.ability <= 75) {
        return dexInfo.abilities[0];
      } else {
        return dexInfo.abilities.length > 1
          ? dexInfo.abilities[1]
          : dexInfo.abilities[0];
      }
    }
    return "";
  }, [pokemon, dexInfo]);

  useEffect(() => {
    setDisplayInfo({
      ability: pokemonAbility,
      nickname: pokemon.nickname || "",
      name: dexInfo.name || "",
      level: pokemon.level || "",
      favorite: pokemon.favorite || false,
      sprite: pokemon.shiny ? dexInfo.shinySprite : dexInfo.sprite || "",
      heldItem: pokemon.heldItem || "",
      friendship: pokemon.friendship || "",
      gender: pokemon.gender || "",
      nature: pokemon.nature || "",
      stats: {
        hp: pokemon.stats?.hp || "",
        atk: pokemon.stats?.atk || "",
        def: pokemon.stats?.def || "",
        spA: pokemon.stats?.spA || "",
        spD: pokemon.stats?.spD || "",
        spe: pokemon.stats?.spe || "",
      },
      evs: {
        hp: pokemon.evs ? pokemon.evs.hp : "",
        atk: pokemon.evs ? pokemon.evs.atk : "",
        def: pokemon.evs ? pokemon.evs.def : "",
        spA: pokemon.evs ? pokemon.evs.spA : "",
        spD: pokemon.evs ? pokemon.evs.spD : "",
        spe: pokemon.evs ? pokemon.evs.spe : "",
      },
      ivs: {
        hp: pokemon.ivs ? pokemon.ivs.hp : "",
        atk: pokemon.ivs ? pokemon.ivs.atk : "",
        def: pokemon.ivs ? pokemon.ivs.def : "",
        spA: pokemon.ivs ? pokemon.ivs.spA : "",
        spD: pokemon.ivs ? pokemon.ivs.spD : "",
        spe: pokemon.ivs ? pokemon.ivs.spe : "",
      },
      moves: pokemon.moves || [],
    });
  }, [pokemon, dexInfo, pokemonAbility]);

  return (
    <table
      style={{
        position: "fixed",
        right: 0,
        top: "7vh",
        minHeight: "93vh",
        maxHeight: "93vh",
        width: "25vw",
        borderCollapse: "collapse",
        textAlign: "center",
        tableLayout: "fixed",
      }}
    >
      <tbody>
        <tr>
          <th colSpan={4} style={{ borderRight: "none" }}>
            {displayInfo.nickname}
          </th>
          <th colSpan={2} style={{ borderLeft: "none", borderRight: "none" }}>
            lv. {displayInfo.level}
          </th>
          <th colSpan={2} style={{ borderLeft: "none" }}>
            STAR
          </th>
        </tr>
        <tr>
          <td colSpan={8} align="center">
            <PokemonSprite
              sprite={displayInfo.sprite}
              alt={displayInfo.name}
              visible={index > -1 ? true : false}
            />
          </td>
        </tr>
        <tr>
          <th colSpan={2}>Ability:</th>
          <td colSpan={2}>{displayInfo.ability}</td>
          <th colSpan={2}>Held Item:</th>
          <td colSpan={2}>{displayInfo.heldItem}</td>
        </tr>
        <tr>
          <th colSpan={2}>Friendship:</th>
          <td colSpan={2}>{displayInfo.friendship}</td>
          <th colSpan={2}>Gender:</th>
          <td colSpan={2}>{displayInfo.gender}</td>
        </tr>
        <tr>
          <th colSpan={2}>Nature:</th>
          <td colSpan={2}>{displayInfo.nature}</td>
          <th colSpan={2}>Evo Lock:</th>
          <td colSpan={2}>UNLOCKED</td>
        </tr>
        <tr>
          <th colSpan={2}>
            {/* <Button
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
            </Button> */}
          </th>
          <th colSpan={2}>Stats</th>
          <th colSpan={2}>IVs</th>
          <th colSpan={2}>EVs</th>
        </tr>
        <tr>
          <th colSpan={2}>Health</th>
          <td colSpan={2}>{displayInfo.stats.hp}</td>
          <td colSpan={2}>{displayInfo.ivs.hp}</td>
          <td colSpan={2}>{displayInfo.evs.hp}</td>
        </tr>
        <tr>
          <th colSpan={2}>Attack</th>
          <td colSpan={2}>{displayInfo.stats.atk}</td>
          <td colSpan={2}>{displayInfo.ivs.atk}</td>
          <td colSpan={2}>{displayInfo.evs.atk}</td>
        </tr>
        <tr>
          <th colSpan={2}>Defense</th>
          <td colSpan={2}>{displayInfo.stats.def}</td>
          <td colSpan={2}>{displayInfo.ivs.def}</td>
          <td colSpan={2}>{displayInfo.evs.def}</td>
        </tr>
        <tr>
          <th colSpan={2}>Special Attack</th>
          <td colSpan={2}>{displayInfo.stats.spA}</td>
          <td colSpan={2}>{displayInfo.ivs.spA}</td>
          <td colSpan={2}>{displayInfo.evs.spA}</td>
        </tr>
        <tr>
          <th colSpan={2}>Special Defense</th>
          <td colSpan={2}>{displayInfo.stats.spD}</td>
          <td colSpan={2}>{displayInfo.ivs.spD}</td>
          <td colSpan={2}>{displayInfo.evs.spD}</td>
        </tr>
        <tr>
          <th colSpan={2}>Speed</th>
          <td colSpan={2}>{displayInfo.stats.spe}</td>
          <td colSpan={2}>{displayInfo.ivs.spe}</td>
          <td colSpan={2}>{displayInfo.evs.spe}</td>
        </tr>
        <tr>
          <th colSpan={8}>Moves:</th>
        </tr>
        <tr>
          <td colSpan={2}>
            {displayInfo.moves.length > 0 ? (
              displayInfo.moves[0]
            ) : (
              <i className="fas fa-minus" />
            )}
          </td>
          <td colSpan={2}>
            {displayInfo.moves.length > 1 ? (
              displayInfo.moves[1]
            ) : (
              <i className="fas fa-minus" />
            )}
          </td>
          <td colSpan={2}>
            {displayInfo.moves.length > 2 ? (
              displayInfo.moves[2]
            ) : (
              <i className="fas fa-minus" />
            )}
          </td>
          <td colSpan={2}>
            {displayInfo.moves.length > 3 ? (
              displayInfo.moves[3]
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
  dexInfo: object.isRequired,
  index: number.isRequired,
};
