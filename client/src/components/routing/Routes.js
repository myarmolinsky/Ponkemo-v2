import React from "react";
import { Route, Switch } from "react-router-dom";
import { Register, Login, ForgotPassword } from "../auth";
import { Menu } from "../menu/Menu";
import {
  Pokedex,
  Pokemon,
  EggGroup,
  EggGroups,
  Type,
  Types,
  EditPokemon,
} from "../pokedex";
import { Catch, Forage, Shop, Recycle, Battle, Contest } from "../menu";
import { Profile, PC, Train, Breed } from "../profile";
import { PrivateRoute } from "../routing/PrivateRoute";
import { NotFound } from "../layout";

const Routes = () => {
  return (
    <div className="container">
      {/*every page within the theme except for the landing page has a class of 'container' to push everything to the middle
        for the landing page, we want the image to go all the way over so it doesn't have the class of 'container'*/}
      <Switch>
        {/*wrap everything in a switch so we don't have issues, especially when we create our 'private route' component*/}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute exact path="/menu" component={Menu} />
        <PrivateRoute exact path="/pc" component={PC} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route exact path="/pokedex" component={Pokedex} />
        <Route exact path="/pokedex/:id" component={Pokemon} />
        <PrivateRoute exact path="/pokedex/:id/edit" component={EditPokemon} />
        <Route exact path="/egggroups" component={EggGroups} />
        <Route exact path="/egggroups/:eggGroup" component={EggGroup} />
        <Route exact path="/types" component={Types} />
        <Route exact path="/types/:type" component={Type} />
        <PrivateRoute exact path="/catch" component={Catch} />
        <PrivateRoute exact path="/forage" component={Forage} />
        <PrivateRoute exact path="/train" component={Train} />
        <PrivateRoute exact path="/breed" component={Breed} />
        <PrivateRoute exact path="/shop" component={Shop} />
        <PrivateRoute exact path="/recycle" component={Recycle} />
        <PrivateRoute exact path="/battle" component={Battle} />
        <PrivateRoute exact path="/contest" component={Contest} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
