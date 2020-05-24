import axios from "axios";
import { LOAD_POKEMON, POKEMON_NOT_FOUND } from "./types";

// Load Pokemon
export const getPokemon = (pokemon) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/pokemon/${pokemon}`);

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
