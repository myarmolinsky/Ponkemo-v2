import { createStore, applyMiddleware } from "redux"; //bring in 'applyMiddleware' because we will be using 'thunk' which is middleware
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; //middleware
import rootReducer from "./reducers"; //we will have multiple reducers (one for auth, one for profile, one for alerts) but we will combine them in a rootReducer
//our rootReducer will be inside a folder called 'reducers' (inside the 'src' folder) and it will be called 'index.js' so we can just say 'from "./reducers" to import it

const initialState = {};

const middleware = [thunk];

const store = createStore(
  //create the store
  rootReducer, //first pass the reducer
  initialState, //then pass the initialState
  composeWithDevTools(applyMiddleware(...middleware))
  //then we can call 'composeWithDevTools()' and pass it 'applyMiddleware()' into which we pass a spread operator followed by our middleware const
  //the spread operator allows us to pass multiple parameters via an array
);

export default store;
