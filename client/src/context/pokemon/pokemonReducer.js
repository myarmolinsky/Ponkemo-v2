import {
  LOAD_POKEMON,
  LOAD_POKEMON_FORMES,
  LOAD_POKEMON_EGGS,
  LOAD_POKEMON_EVOLUTIONS,
  LOAD_PREVIOUS_POKEMON_ID,
  LOAD_ALL_POKEMON,
  POKEMON_NOT_FOUND,
  CLEAR_POKEMON,
} from "./types";

export default function (state, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_ALL_POKEMON:
      return {
        ...state,
        pokedex: payload,
        lastId: payload[payload.length - 1].id,
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
      };
    case LOAD_POKEMON_EGGS:
      return {
        ...state,
        eggs: payload,
      };
    case LOAD_POKEMON_EVOLUTIONS:
      return {
        ...state,
        evolutions: payload,
      };
    case LOAD_PREVIOUS_POKEMON_ID:
      return {
        ...state,
        previousPokemonId: payload,
      };
    case POKEMON_NOT_FOUND:
      return {
        ...state,
        pokemon: {},
        evolutions: [],
        eggs: [],
        formes: [],
        previousPokemonId: -1,
        loading: false,
      };
    case CLEAR_POKEMON:
      return {
        ...state,
        pokemon: {},
        formes: [],
        eggs: [],
        evolutions: [],
        previousPokemonId: -1,
        loading: true,
      };
    default:
      return state;
  }
}
