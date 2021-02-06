import React from "react";
import { Route, Switch } from "react-router-dom";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";
import { Dashboard } from "../dashboard/Dashboard";
import {
  Pokedex,
  Pokemon,
  EggGroup,
  EggGroups,
  Type,
  Types,
  EditPokemon,
} from "../pokedex";
import { PrivateRoute } from "../routing/PrivateRoute";
import { NotFound, Alert } from "../layout";

const Routes = () => {
  return (
    <div className="container">
      {/*every page within the theme except for the landing page has a class of 'container' to push everything to the middle
        for the landing page, we want the image to go all the way over so it doesn't have the class of 'container'*/}
      <Switch>
        {/*wrap everything in a switch so we don't have issues, especially when we create our 'private route' component*/}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="/pokedex" component={Pokedex} />
        <Route exact path="/pokedex/:id" component={Pokemon} />
        <PrivateRoute exact path="/pokedex/:id/edit" component={EditPokemon} />
        <Route exact path="/egggroups" component={EggGroups} />
        <Route exact path="/egggroups/:eggGroup" component={EggGroup} />
        <Route exact path="/types" component={Types} />
        <Route exact path="/types/:type" component={Type} />
        <Route component={NotFound} />
      </Switch>
      <Alert />
    </div>
  );
};

export default Routes;
