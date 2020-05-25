import axios from "axios";
import {
  LOAD_POKEMON,
  LOAD_ALL_POKEMON,
  POKEMON_NOT_FOUND,
  CLEAR_POKEMON,
} from "./types";

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

// Load Pokedex
export const getAllPokemon = () => async (dispatch) => {
  dispatch({ type: CLEAR_POKEMON });

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
