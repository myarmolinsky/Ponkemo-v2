import { combineReducers } from "redux";
import auth from "./auth";

export default combineReducers({ auth }); //'combineReducers()' takes in a object which will have any and all reducers we create
