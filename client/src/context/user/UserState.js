import React, { useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { any } from "prop-types";
import { MiscContext } from "../";
import { UserContext } from "./UserContext";
import userReducer from "./userReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOAD_OWNED_POKEMON,
  LOAD_OWNED_POKEMON_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SPAWN_POKEMON,
  SPAWN_POKEMON_FAIL,
  DESPAWN_POKEMON,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";

export const UserState = ({ children }) => {
  const { setAlert } = useContext(MiscContext);

  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true, //make sure the loading is done (we've already made a request to the backend and got a response)
    user: null,
    ownedPokemon: null,
    spawnedPokemon: [],
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    getAllOwnedPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  // Load User
  const loadUser = async () => {
    //we want to be able to take and use a token already stored in local storage if there is one
    //so we made a new folder in 'src' called 'utils' for storing utility files and we made a file inside 'utils' called 'setAuthToken.js'
    //the file is just gonna have a function which takes in a token
    //if the token is there then it is gonna add it to the headers, and if not then it will delete it from the headers

    if (localStorage.token) {
      //check localStorage for the token
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data, //payload will be the user so the user will be sent to the 'USER_LOADED' action type
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Register User
  const register = async (username, email, password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, email, password });

    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data, //in this case, the payload will be a token
      });

      loadUser();
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "danger"));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

  // Login User
  const login = async (username, password) => {
    //we are taking in username and password as parameters instead of as an object because there are only 2 parameters as opposed to for register where there would be 3
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });

    try {
      const res = await axios.post("/api/auth", body, config); //we are authenticating so we want to send a post request to '/api/auth'

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, //in this case, the payload will be a token
      });

      loadUser();
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "danger"));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  const spawnPokemon = async () => {
    despawnPokemon();

    try {
      const res = await axios.put(`/api/users/${state.user.username}/spawn`);

      dispatch({
        type: SPAWN_POKEMON,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SPAWN_POKEMON_FAIL,
      });
    }
  };

  const catchPokemon = async (pokemon) => {
    try {
      await axios.put(`/api/users/${state.user.username}/catch`, { pokemon });
    } catch (err) {
      dispatch({
        type: DESPAWN_POKEMON,
      });
    }
  };

  const despawnPokemon = async () => {
    dispatch({
      type: DESPAWN_POKEMON,
    });
  };

  const getAllOwnedPokemon = async () => {
    try {
      const res = await axios.get(`/api/users/${state.user.username}/owned`);
      dispatch({
        type: LOAD_OWNED_POKEMON,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOAD_OWNED_POKEMON_FAIL,
      });
    }
  };

  const updateOwnedPokemon = async (updatedPokeInfo, uid) => {
    try {
      await axios.put(`/api/users/${state.user.username}/owned/update/${uid}`, {
        ...updatedPokeInfo,
      });

      getAllOwnedPokemon();
    } catch (err) {
      dispatch({
        type: LOAD_OWNED_POKEMON_FAIL,
      });
    }
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await axios.post(`/api/users/forgot-password`, {
        email,
      });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "danger"));
      }
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        loadUser,
        register,
        login,
        getAllOwnedPokemon,
        logout,
        spawnPokemon,
        despawnPokemon,
        catchPokemon,
        updateOwnedPokemon,
        sendPasswordResetEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserState.propTypes = {
  children: any.isRequired,
};
