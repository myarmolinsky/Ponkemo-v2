import React, { useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { any } from "prop-types";
import { MiscContext } from "../";
import { PokemonContext } from "./PokemonContext";
import pokemonReducer from "./pokemonReducer";
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

export const PokemonState = ({ children }) => {
  useEffect(() => {
    getAllPokemon();
  }, []);

  const { setAlert } = useContext(MiscContext);

  const initialState = {
    loading: true, //make sure the loading is done (we've already made a request to the backend and got a response)
    pokedex: [],
    lastId: -1,
    previousPokemonId: 1,
    pokemon: {},
    evolutions: [],
    eggs: [],
    formes: [],
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

  const getFormes = async (id) => {
    try {
      const res = await axios.get(`/api/pokemon/${id}/formes`);
      return dispatch({
        type: LOAD_POKEMON_FORMES,
        payload: res.data,
      });
    } catch (err) {
      return dispatch({
        type: POKEMON_NOT_FOUND,
        payload: { msg: "Pokemon not found", status: 404 },
      });
    }
  };

  const getEggs = async (id) => {
    try {
      const res = await axios.get(`/api/pokemon/${id}/eggs`);
      return dispatch({
        type: LOAD_POKEMON_EGGS,
        payload: res.data,
      });
    } catch (err) {
      return dispatch({
        type: POKEMON_NOT_FOUND,
        payload: { msg: "Pokemon not found", status: 404 },
      });
    }
  };

  const getEvolutions = async (id) => {
    try {
      const res = await axios.get(`/api/pokemon/${id}/evolutions`);
      return dispatch({
        type: LOAD_POKEMON_EVOLUTIONS,
        payload: res.data,
      });
    } catch (err) {
      return dispatch({
        type: POKEMON_NOT_FOUND,
        payload: { msg: "Pokemon not found", status: 404 },
      });
    }
  };

  const getPreviousPokemonId = async (id) => {
    try {
      const res = await axios.get(`/api/pokemon/${id}/previous`);
      return dispatch({
        type: LOAD_PREVIOUS_POKEMON_ID,
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
  const updatePokemon = async (id, data) => {
    try {
      const config = {
        //since we're sending data, we need to create a config object
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(`/api/pokemon/${id}`, data, config);

      setAlert("Pokemon Updated/Created", "success");
    } catch (err) {
      setAlert("Failed to Update/Create Pokemon", "danger");
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        ...state,
        getAllPokemon,
        getPokemon,
        getPreviousPokemonId,
        getFormes,
        getEggs,
        getEvolutions,
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
