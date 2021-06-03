import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { object, number } from "prop-types";
import { UserContext } from "../../context";
import { PokemonSprite } from "../common";

export const OwnedPokemonInfo = ({ pokemon, dexInfo, uid }) => {
  const { updateOwnedPokemon } = useContext(UserContext);

  const [displayInfo, setDisplayInfo] = useState({
    ability: "",
    nickname: "",
    name: "",
    level: "",
    favorite: false,
    evoLock: false,
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
  const [editingNickname, setEditingNickname] = useState(false);
  const [nickname, setNickname] = useState("");

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
      favorite:
        typeof pokemon.favorite === "boolean" ? pokemon.favorite : false,
      evoLock: typeof pokemon.evoLock === "boolean" ? pokemon.evoLock : false,
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

  useEffect(() => {
    setNickname(displayInfo.nickname);
  }, [displayInfo]);

  useEffect(() => {
    setEditingNickname(false);
  }, [uid]);

  const onChangeNickname = (e) => setNickname(e.target.value);

  return (
    <table className="owned-pokemon-info-table">
      <tbody>
        <tr>
          <th colSpan={3} style={{ borderRight: "none" }}>
            {editingNickname ? (
              <TextField
                name="nickname"
                onChange={(e) => onChangeNickname(e)}
                margin="none"
                value={nickname}
                fullWidth
                size="small"
                style={{ backgroundColor: "white" }}
              />
            ) : (
              displayInfo.nickname
            )}
          </th>
          <th colSpan={1} style={{ borderRight: "none", borderLeft: "none" }}>
            {uid > -1 && (
              <i
                className={`fas fa-${editingNickname ? "save" : "edit"}`}
                style={{
                  cursor: "pointer",
                }}
                onClick={
                  editingNickname
                    ? () => {
                        updateOwnedPokemon(
                          {
                            nickname:
                              nickname === "" || nickname.length > 12
                                ? displayInfo.nickname
                                : nickname,
                          },
                          uid
                        );
                        setEditingNickname(false);
                      }
                    : () => setEditingNickname(true)
                }
              />
            )}
          </th>
          <th colSpan={2} style={{ borderLeft: "none", borderRight: "none" }}>
            lv. {displayInfo.level}
          </th>
          <th colSpan={2} style={{ borderLeft: "none" }}>
            <i
              className={`fa${displayInfo.favorite ? "s" : "r"} fa-star`}
              style={{
                color: displayInfo.favorite ? "yellow" : "black",
                cursor: "pointer",
              }}
              onClick={
                uid > -1
                  ? () =>
                      updateOwnedPokemon(
                        { favorite: !displayInfo.favorite },
                        uid
                      )
                  : () => {}
              }
            />
          </th>
        </tr>
        <tr>
          <td colSpan={8} align="center">
            <PokemonSprite
              sprite={displayInfo.sprite}
              alt={displayInfo.name}
              visible={uid > -1 ? true : false}
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
          <td colSpan={2}>
            {uid > -1 && (
              <i
                className={`fas ${
                  displayInfo.evoLock ? "fa-lock" : "fa-lock-open"
                }`}
                style={{
                  cursor: "pointer",
                }}
                onClick={() =>
                  updateOwnedPokemon({ evoLock: !displayInfo.evoLock }, uid)
                }
              />
            )}
          </td>
        </tr>
        <tr>
          <th colSpan={5}>
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
          <th colSpan={1}>Stats</th>
          <th colSpan={1}>IVs</th>
          <th colSpan={1}>EVs</th>
        </tr>
        <tr>
          <th colSpan={5}>Health</th>
          <td colSpan={1}>{displayInfo.stats.hp}</td>
          <td colSpan={1}>{displayInfo.ivs.hp}</td>
          <td colSpan={1}>{displayInfo.evs.hp}</td>
        </tr>
        <tr>
          <th colSpan={5}>Attack</th>
          <td colSpan={1}>{displayInfo.stats.atk}</td>
          <td colSpan={1}>{displayInfo.ivs.atk}</td>
          <td colSpan={1}>{displayInfo.evs.atk}</td>
        </tr>
        <tr>
          <th colSpan={5}>Defense</th>
          <td colSpan={1}>{displayInfo.stats.def}</td>
          <td colSpan={1}>{displayInfo.ivs.def}</td>
          <td colSpan={1}>{displayInfo.evs.def}</td>
        </tr>
        <tr>
          <th colSpan={5}>Special Attack</th>
          <td colSpan={1}>{displayInfo.stats.spA}</td>
          <td colSpan={1}>{displayInfo.ivs.spA}</td>
          <td colSpan={1}>{displayInfo.evs.spA}</td>
        </tr>
        <tr>
          <th colSpan={5}>Special Defense</th>
          <td colSpan={1}>{displayInfo.stats.spD}</td>
          <td colSpan={1}>{displayInfo.ivs.spD}</td>
          <td colSpan={1}>{displayInfo.evs.spD}</td>
        </tr>
        <tr>
          <th colSpan={5}>Speed</th>
          <td colSpan={1}>{displayInfo.stats.spe}</td>
          <td colSpan={1}>{displayInfo.ivs.spe}</td>
          <td colSpan={1}>{displayInfo.evs.spe}</td>
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
  uid: number.isRequired,
};
