import {
  LOAD_POKEMON,
  LOAD_POKEMON_FORMES,
  LOAD_POKEMON_EGGS,
  LOAD_POKEMON_EVOLUTIONS,
  LOAD_ALL_POKEMON,
  POKEMON_NOT_FOUND,
  CLEAR_POKEMON,
  UPDATE_POKEMON,
  UPDATE_POKEMON_FAILED,
} from "./types";

export default function (state, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_POKEMON:
      return {
        ...state,
        pokemon: {},
        formes: [],
        eggs: [],
        evolutions: [],
        loading: false,
      };
    case LOAD_POKEMON:
      return {
        ...state,
        pokemon: payload,
        loading: false,
      };
    case LOAD_POKEMON_FORMES:
      return {
        ...state,
        formes: payload,
        loading: false,
      };
    case LOAD_POKEMON_EGGS:
      return {
        ...state,
        eggs: payload,
        loading: false,
      };
    case LOAD_POKEMON_EVOLUTIONS:
      return {
        ...state,
        evolutions: payload,
        loading: false,
      };
    case LOAD_ALL_POKEMON:
      return {
        ...state,
        pokedex: payload,
        lastId: payload[payload.length - 1].id,
        loading: false,
      };
    case POKEMON_NOT_FOUND:
      return {
        ...state,
        pokemon: {},
        evolutions: [],
        eggs: [],
        formes: [],
        loading: false,
      };
    case UPDATE_POKEMON:
      return {
        ...state,
        pokemon: payload,
        loading: false,
      };
    case UPDATE_POKEMON_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
