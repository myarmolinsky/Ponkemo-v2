import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPokemon } from "../../actions/pokemon";
import Spinner from "../layout/Spinner";

const Pokemon = ({
  match,
  getPokemon,
  pokemon: { pokemon, previousPokemon, nextPokemon, loading },
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getPokemon(match.params.id);
  }, [getPokemon, match.params.id]);

  return (
    <Fragment>
      {pokemon === null || loading ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <div className="buttons">
            <Link
              to={
                previousPokemon !== null && pokemon.id > 1
                  ? () => {
                      return `/pokedex/${previousPokemon.id}`;
                    }
                  : () => {
                      return;
                    }
              }
              className={pokemon.id > 1 ? "btn btn-dark" : "btn btn-light"}
            >
              Previous Pokemon
            </Link>
            <Link
              to={
                nextPokemon !== null && pokemon.id < 1030
                  ? () => {
                      return `/pokedex/${nextPokemon.id}`;
                    }
                  : () => {
                      return;
                    }
              }
              className={pokemon.id < 1030 ? "btn btn-dark" : "btn btn-light"}
            >
              Next Pokemon
            </Link>
          </div>
          <h1 className="large text-primary">{pokemon.name}</h1>
          <img className="sprite" src={pokemon.sprite} alt="Bulbasaur" />
          <img
            className="sprite"
            src={pokemon.shinySprite}
            alt="Shiny Bulbasaur"
          />
          <p className="lead">
            Types: {pokemon.types[0]}
            {pokemon.types.length > 1 ? ", " + pokemon.types[1] : ""}
          </p>
          <p className="lead">
            Abilities: {pokemon.abilities[0]}
            {pokemon.abilities.length > 1 ? ", " + pokemon.abilities[1] : ""}
          </p>
          <p className="lead">Hidden Ability: {pokemon.hiddenAbility}</p>
          <p className="lead">Weight: {pokemon.weight} kg</p>
          <p className="lead">Base Friendship: {pokemon.baseFriendship}</p>
          <p className="lead">Base Stats:</p>
          <p>Health: {pokemon.baseStats.hp}</p>
          <p>Attack: {pokemon.baseStats.atk}</p>
          <p>Defense: {pokemon.baseStats.def}</p>
          <p>Special Attack: {pokemon.baseStats.spA}</p>
          <p>Special Defense: {pokemon.baseStats.spD}</p>
          <p>Speed: {pokemon.baseStats.spe}</p>
          <br />
          <p className="lead">
            Egg Groups: {pokemon.breeding.eggGroups[0]}
            {pokemon.breeding.eggGroups.length > 1
              ? ", " + pokemon.breeding.eggGroups[1]
              : ""}
          </p>
          <p>Male Egg: {pokemon.breeding.egg}</p>
          <p>Female Egg: {pokemon.breeding.altEgg}</p>
          <br />
          <p className="lead">Spawn Rate: {pokemon.spawnRate}</p>
          {pokemon.stages.current !== pokemon.stages.max ? (
            <Fragment>
              <p className="lead">Evolves into:</p>
              <p>
                {pokemon.evolutionDetails.map((item) => (
                  <li key={item.evolution}>
                    {item.evolution} {evolutionCondition(item.condition)}
                  </li>
                ))}
              </p>
            </Fragment>
          ) : (
            ""
          )}
          <br />
          {pokemon.moves.length < 1 ? (
            ""
          ) : (
            <Fragment>
              <p className="lead">Moves:</p>
              <p>
                {pokemon.moves.map((item) => (
                  <li key={item.name}>
                    {item.name} via {learnMoveCondition(item.learnConditions)}
                  </li>
                ))}
              </p>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

// ADD THE REST OF THE EVOLUTION CONDITIONS
const evolutionCondition = (condition) => {
  if (typeof condition === "number") {
    return "at level " + condition;
  } else {
    switch (condition) {
      case "Ice Stone":
        return "by using an Ice Stone";
      case "Fire Stone":
        return "by using a Fire Stone";
      case "Thunder Stone":
        return "by using a Thunder Stone";
      case "Leaf Stone":
        return "by using a Leaf Stone";
      case "Water Stone":
        return "by using a Water Stone";
      case "Sun Stone":
        return "by using a Sun Stone";
      case "Moon Stone":
        return "by using a Moon Stone";
      case "Dusk Stone":
        return "by using a Dusk Stone";
      case "Dawn Stone":
        return "by using a Dawn Stone";
      case "Oval Stone":
        return "once it has achieved High Friendship while holding an Oval Stone";
      case "Friendship":
        return "once it has achieved High Friendship";
      case "Ancient Power":
        return "by leveling up while it knows Ancient Power";
      case "Metal Coat":
        return "by trade while holding a Metal Coat";
      case "Vespiquen":
        return "by leveling up a female Combee to level 21";
      case "Razor Fang":
        return "by leveling up a Gligar while it holds a Razor Fang";
      case "Razor Claw":
        return "by leveling up a Sneasel while it holds a Razor Claw";
      case "Wormadam":
        return "by leveling up a female Burmy to level 20";
      case "Mothim":
        return "by leveling up a male Burmy to level 20";
      case "Gallade":
        return "by using a Dawn Stone on a male Kirlia";
      case "Salazzle":
        return "by leveling up a female Salandit to level 33";
      case "Froslass":
        return "by using a Dawn Stone on a female Snorunt";
      case "Double Hit":
        return "by leveling up while it knows Double Hit";
      case "Mimic":
        return "by leveling up while it knows Mimic";
      case "Taunt":
        return "by leveling up while it knows Taunt";
      case "Rollout":
        return "by leveling up while it knows Rollout";
      case "Dragon Pulse":
        return "by leveling up while it knows Dragon Pulse";
      case "Stomp":
        return "by leveling up while it knows Stomp";
      case "Meowstic Male":
        return "by leveling up a male Espurr to level 25";
      case "Meowstic Female":
        return "by leveling up a female Espurr to level 25";
      default:
        return;
    }
  }
};

const learnMoveCondition = (conditions) => {
  if (conditions.length === 1) {
    return typeof conditions[0] === "number"
      ? "level " + conditions[0]
      : conditions[0] === "Egg"
      ? "Breeding"
      : conditions[0] === "Tutor"
      ? "Move Tutor"
      : conditions[0];
  } else {
    let list =
      typeof conditions[0] === "number"
        ? "level " + conditions[0]
        : conditions[0];
    for (let i = 1; i < conditions.length; i++) {
      if (conditions.length > 2) list += ", ";
      else list += " ";
      if (i === conditions.length - 1) {
        list += "and ";
      }
      if (typeof conditions[i] === "number") {
        list += "level " + conditions[i];
      } else {
        switch (conditions[i]) {
          case "Egg":
            list += "Breeding";
            break;
          case "Tutor":
            list += "Move Tutor";
            break;
          default:
            list += conditions[i];
            break;
        }
      }
    }
    return list;
  }
};

Pokemon.propTypes = {
  getPokemon: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
  previousPokemon: PropTypes.object,
  nextPokemon: PropTypes.object,
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
  previousPokemon: state.previousPokemon,
  nextPokemon: state.nextPokemon,
});

export default connect(mapStateToProps, { getPokemon })(Pokemon);
