import React, { useReducer } from "react";
import axios from "axios";
import { any } from "prop-types";
import { setAlert } from "../../actions/alert";
import { PokemonContext } from "./PokemonContext";
import pokemonReducer from "./pokemonReducer";
import {
  LOAD_POKEMON,
  LOAD_ALL_POKEMON,
  POKEMON_NOT_FOUND,
  CLEAR_POKEMON,
  UPDATE_POKEMON,
  UPDATE_POKEMON_FAILED,
  GET_LAST_ID,
} from "./types";

export const PokemonState = ({ children }) => {
  const initialState = {
    loading: true, //make sure the loading is done (we've already made a request to the backend and got a response)
    pokedex: [],
    pokemon: null,
    nextPokemonId: -1,
    previousPokemonId: -1,
    evolutionIds: [],
    eggIds: [],
    formes: [],
    lastId: -1,
  };
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  // Load Pokedex
  const getAllPokemon = async () => {
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

  const getLastId = async () => {
    try {
      const res = await axios.get(`/api/pokemon/lastId`);

      return dispatch({
        type: GET_LAST_ID,
        payload: res.data,
      });
    } catch (err) {
      return dispatch({
        type: POKEMON_NOT_FOUND,
        payload: { msg: "Pokemon not found", status: 404 },
      });
    }
  };

  // Load Pokemon
  const getPokemon = async (id) => {
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
  const updatePokemon = async (id, formData, edit = true) => {
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
        evolutionDetails: JSON.parse(formData.evolutionDetails),
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

      dispatch(
        setAlert(edit ? "Pokemon Updated" : "Pokemon Created", "success")
      );

      return dispatch({
        type: UPDATE_POKEMON,
        payload: res.data,
      });
    } catch (err) {
      dispatch(
        setAlert(
          edit ? "Failed to Update Pokemon" : "Failed to Create Pokemon",
          "danger"
        )
      );

      return dispatch({
        type: UPDATE_POKEMON_FAILED,
        payload: { msg: "Pokemon not found", status: 404 },
      });
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        ...state,
        getAllPokemon,
        getLastId,
        getPokemon,
        updatePokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

PokemonState.propTypes = {
  children: any.isRequired,
};