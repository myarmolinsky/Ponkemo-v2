import {
  LOAD_POKEMON,
  LOAD_ALL_POKEMON,
  POKEMON_NOT_FOUND,
  CLEAR_POKEMON,
  UPDATE_POKEMON,
  UPDATE_POKEMON_FAILED,
  GET_LAST_ID,
} from "../actions/types";

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
        pokemon: payload.pokemon,
        nextPokemonId: payload.nextPokemonId,
        previousPokemonId: payload.previousPokemonId,
        evolutionIds: payload.evolutionIds,
        eggIds: payload.eggIds,
        formes: payload.formes,
        loading: false,
      };
    case LOAD_ALL_POKEMON:
      return {
        ...state,
        pokedex: payload,
        loading: false,
      };
    case GET_LAST_ID:
      return {
        ...state,
        lastId: payload,
      };
    case POKEMON_NOT_FOUND:
      return {
        ...state,
        pokemon: null,
        nextPokemonId: -1,
        previousPokemonId: -1,
        evolutionIds: [],
        eggIds: [],
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
