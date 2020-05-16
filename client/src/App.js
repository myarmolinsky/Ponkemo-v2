import React, { Fragment, useEffect } from "react"; //bring in react and Fragment
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //import react router
import Routes from "./components/routing/Routes";
// Redux
import { Provider } from "react-redux"; //the Provider connects Redux and React
import store from "./store"; //bring in the store
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  //we need to call this here too (not just in our auth action) because otherwise it only gets called once but we need to check it often
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    //useEffect takes in a function
    store.dispatch(loadUser()); //dispatch 'loadUser()' directly on the store
  }, []); //we only want this to run once, but useEffect runs as an infinite loop unless we add a second parameter to it. the second parameter is just empty [] brackets

  return (
    //changed this from 'function App() {}' to an arrow function: 'const App =() => {}'
    <Provider store={store}>
      {/*we pass our store into the Provider*/}
      {/*for the Provider to work, we have to wrap everything inside it*/}
      <Router>
        {/*for the router to work, we have to wrap everything inside it*/}
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            {/*instead of '<Landing />', we use this. we set 'exact path' equal to the index which is just '/' and the component we want to load is 'Landing'*/}
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
