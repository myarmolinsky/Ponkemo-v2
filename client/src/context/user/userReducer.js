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
      };
    default:
      return state;
  }
}
