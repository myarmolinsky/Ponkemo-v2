import {
  LOAD_POKEMON,
  LOAD_ALL_POKEMON,
  POKEMON_NOT_FOUND,
  CLEAR_POKEMON,
  UPDATE_POKEMON,
  UPDATE_POKEMON_FAILED,
  LOAD_POKEDEX_LENGTH,
} from "../actions/types";

const initialState = {
  loading: true, //make sure the loading is done (we've already made a request to the backend and got a response)
  pokedex: [],
  pokemon: null,
  pokedexLength: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_POKEMON:
      return {
        ...state,
        pokemon: null,
      };
    case LOAD_POKEMON:
      return {
        ...state,
        pokemon: payload,
        loading: false,
      };
    case LOAD_ALL_POKEMON:
      return {
        ...state,
        pokedex: payload,
        loading: false,
      };
    case LOAD_POKEDEX_LENGTH:
      return {
        ...state,
        pokedexLength: payload,
      };
    case POKEMON_NOT_FOUND:
      return {
        ...state,
        pokemon: null,
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
