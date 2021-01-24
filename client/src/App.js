import React, { Fragment } from "react"; //bring in react and Fragment
import "./App.css";
import { Navbar, Landing } from "./components/layout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //import react router
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Routes from "./components/routing/Routes";
import { PokemonState, UserState, MiscState } from "./context";
import setAuthToken from "./utils/setAuthToken";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#17a2b8",
    },
    secondary: {
      main: "#343a40",
    },
  },
});

if (localStorage.token) {
  //we need to call this here too (not just in our auth action) because otherwise it only gets called once but we need to check it often
  setAuthToken(localStorage.token);
}

export const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <MiscState>
        <UserState>
          <PokemonState>
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
          </PokemonState>
        </UserState>
      </MiscState>
    </MuiThemeProvider>
  );
};
