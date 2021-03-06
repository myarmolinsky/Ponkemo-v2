import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOAD_OWNED_POKEMON,
  LOAD_OWNED_POKEMON_FAIL,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SPAWN_POKEMON,
  SPAWN_POKEMON_FAIL,
  DESPAWN_POKEMON,
  PASSWORD_RESET_TOKEN_VALID,
  PASSWORD_RESET_TOKEN_INVALID,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
} from "./types";

export default function (state, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token); //setItem() because we want to put the token that is returned into localStorage
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOAD_OWNED_POKEMON:
      return {
        ...state,
        ownedPokemon: payload,
      };
    case LOAD_OWNED_POKEMON_FAIL:
      return {
        ...state,
        ownedPokemon: null,
      };
    case SPAWN_POKEMON:
      return {
        ...state,
        spawnedPokemon: payload,
      };
    case SPAWN_POKEMON_FAIL:
    case DESPAWN_POKEMON:
      return { ...state, spawnedPokemon: [] };
    case PASSWORD_RESET_TOKEN_VALID:
      return { ...state, resetPasswordUsername: payload };
    case PASSWORD_RESET_TOKEN_INVALID:
      return { ...state, resetPasswordUsername: "" };
    case PASSWORD_RESET_SUCCESS:
      return { ...state, resetPasswordUsername: "", passwordUpdated: true };
    case PASSWORD_RESET_FAIL:
      return { ...state, passwordUpdated: false };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token"); //if it's a failed login, we want to remove the token completely
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        ownedPokemon: null,
        spawnedPokemon: [],
      };
    default:
      return state;
  }
}
