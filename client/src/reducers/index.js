import { combineReducers } from "redux";
import auth from "./auth";
import pokemon from "./pokemon";

export default combineReducers({ auth, pokemon }); //'combineReducers()' takes in a object which will have any and all reducers we create
