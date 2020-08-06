import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Dashboard from "../dashboard/Dashboard";
import Pokedex from "../pokedex/Pokedex";
import Pokemon from "../pokedex/Pokemon";
import EditPokemon from "../pokemon-forms/EditPokemon";
import PrivateRoute from "../routing/PrivateRoute";
import NotFound from "../layout/NotFound";
import Alert from "../layout/Alert";
import EggGroups from "../pokedex/EggGroups";
import EggGroup from "../pokedex/EggGroup";
import Types from "../pokedex/Types";
import Type from "../pokedex/Type";

const Routes = () => {
  return (
    <section className="container">
      {/*every page within the theme except for the landing page has a class of 'container' to push everything to the middle
        for the landing page, we want the image to go all the way over so it doesn't have the class of 'container'*/}
      <Alert />
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
    </section>
  );
};

export default Routes;
