import { combineReducers } from "redux";
import auth from "./auth";
import pokemon from "./pokemon";
import alert from "./alert";

export default combineReducers({ auth, pokemon, alert }); //'combineReducers()' takes in a object which will have any and all reducers we create
