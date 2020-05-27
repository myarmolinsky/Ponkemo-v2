import axios from "axios";
import { setAlert } from "./alert";
import {
  LOAD_POKEMON,
  LOAD_ALL_POKEMON,
  LOAD_POKEDEX_LENGTH,
  POKEMON_NOT_FOUND,
  CLEAR_POKEMON,
  UPDATE_POKEMON,
} from "./types";

// Load Pokedex
export const getAllPokemon = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/pokemon/`);

    return dispatch({
      type: LOAD_ALL_POKEMON,
      payload: res.data,
    });
  } catch (err) {
    return dispatch({
      type: POKEMON_NOT_FOUND,
      payload: { msg: "Pokemon not found", status: 404 },
    });
  }
};

export const getPokedexLength = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/pokemon/`);

    return dispatch({
      type: LOAD_POKEDEX_LENGTH,
      payload: res.data.length,
    });
  } catch (err) {
    return dispatch({
      type: POKEMON_NOT_FOUND,
      payload: { msg: "Pokemon not found", status: 404 },
    });
  }
};

// Load Pokemon
export const getPokemon = (id) => async (dispatch) => {
  dispatch({ type: CLEAR_POKEMON });

  try {
    const res = await axios.get(`/api/pokemon/${id}`);

    return dispatch({
      type: LOAD_POKEMON,
      payload: res.data,
    });
  } catch (err) {
    return dispatch({
      type: POKEMON_NOT_FOUND,
      payload: { msg: "Pokemon not found", status: 404 },
    });
  }
};

// Create or Update Pokemon
export const updatePokemon = (id, formData, edit = true) => async (
  dispatch
) => {
  try {
    const config = {
      //since we're sending data, we need to create a config object
      headers: {
        "Content-Type": "application/json",
      },
    };

    // translate the formData into an object that can be passed into the database
    const realData = {
      name: formData.name,
      sprite: formData.sprite,
      shinySprite: formData.shinySprite,
      types: formData.types.split(", "),
      abilities: formData.abilities.split(", "),
      hiddenAbility: formData.hiddenAbility,
      weight: formData.weight,
      baseFriendship: formData.baseFriendship,
      baseStats: {
        hp: formData.hp,
        atk: formData.atk,
        def: formData.def,
        spA: formData.spA,
        spD: formData.spD,
        spe: formData.spe,
      },
      spawnRate: formData.spawnRate,
      moves: JSON.parse(formData.moves),
      id: formData.id,
      breeding: {
        eggGroups: formData.eggGroups.split(", "),
        egg: formData.egg,
        altEgg: formData.altEgg,
      },
      stages: {
        current: formData.currentStage,
        max: formData.maxStage,
      },
      genderRatio: formData.genderRatio,
    };

    // make sure there are no duplicate moves (adding the duplicates' learn conditions to the original) and no duplicate learn conditions for each move
    let moves = [];
    let conditions = [];
    let uniqueMoves = [];
    for (let i = 0; i < realData.moves.length; i++) {
      if (!moves.includes(realData.moves[i].name)) {
        moves.push(realData.moves[i].name);
        conditions.push(realData.moves[i].learnConditions);
      } else {
        for (let j = 0; j < realData.moves[i].learnConditions.length; j++) {
          if (
            !conditions[moves.indexOf(realData.moves[i].name)].includes(
              realData.moves[i].learnConditions[j]
            )
          ) {
            conditions[moves.indexOf(realData.moves[i].name)].push(
              realData.moves[i].learnConditions[j]
            );
          }
        }
      }
    }
    for (let i = 0; i < moves.length; i++) {
      let moveObj = {
        learnConditions: conditions[i],
        name: moves[i],
      };
      uniqueMoves.push(moveObj);
    }

    realData.moves = uniqueMoves;

    const res = await axios.post(`/api/pokemon/${id}`, realData, config);

    dispatch(setAlert(edit ? "Pokemon Updated" : "Pokemon Created", "success"));

    return dispatch({
      type: UPDATE_POKEMON,
      payload: res.data,
    });
  } catch (err) {
    return dispatch({
      type: POKEMON_NOT_FOUND,
      payload: { msg: "Pokemon not found", status: 404 },
    });
  }
};
