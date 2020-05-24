import {
  LOAD_POKEMON,
  LOAD_ALL_POKEMON,
  POKEMON_NOT_FOUND,
} from "../actions/types";

const initialState = {
  loading: true, //make sure the loading is done (we've already made a request to the backend and got a response)
  pokedex: [],
  pokemon: null,
  nextPokemon: null,
  previousPokemon: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_POKEMON:
      return {
        ...state,
        pokemon: payload.pokemon,
        nextPokemon: payload.nextPokemon,
        previousPokemon: payload.previousPokemon,
        loading: false,
      };
    case LOAD_ALL_POKEMON:
      return {
        ...state,
        pokedex: payload,
        loading: false,
      };
    case POKEMON_NOT_FOUND:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
