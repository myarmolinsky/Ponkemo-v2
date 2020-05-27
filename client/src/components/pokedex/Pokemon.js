import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPokemon, getAllPokemon } from "../../actions/pokemon";
import Spinner from "../layout/Spinner";
import NotFound from "../layout/NotFound";

const Pokemon = ({
  match,
  getPokemon,
  getAllPokemon,
  pokemon: { pokemon, pokedex, loading },
  auth: { user },
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getPokemon(match.params.id);
    getAllPokemon();
  }, [getPokemon, getAllPokemon, match.params.id]);

  return (
    <Fragment>
      {pokemon === null || loading ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : match.params.id > pokedex.length || match.params.id < 1 ? (
        // if the page the user is trying to go to a Pokemon that does not exist
        <NotFound />
      ) : (
        <Fragment>
          <div className="buttons">
            {/* If there is a previous pokemon, have a link to its page */}
            <Link
              to={
                pokemon.id > 1
                  ? () => {
                      return `/pokedex/${pokemon.id - 1}`;
                    }
                  : () => {
                      return;
                    }
              }
              className={pokemon.id > 1 ? "btn btn-dark" : "btn btn-light"}
            >
              Previous Pokemon
            </Link>
            {/* If there is a next pokemon, have a link to its page */}
            <Link
              to={
                pokemon.id < pokedex.length
                  ? () => {
                      return `/pokedex/${pokemon.id + 1}`;
                    }
                  : () => {
                      return;
                    }
              }
              className={
                pokemon.id < pokedex.length ? "btn btn-dark" : "btn btn-light"
              }
            >
              Next Pokemon
            </Link>
          </div>
          <h1 className="large text-primary">
            {/* Name*/}
            {pokemon.name} {/* Edit link for users with "admin" privileges */}
            {user !== null && user.privileges === "admin" ? (
              <Link
                className="lead edit-link"
                to={`/pokedex/${pokemon.id}/edit`}
              >
                Edit
              </Link>
            ) : (
              ""
            )}
          </h1>
          {/* Sprite */}
          <img className="sprite" src={pokemon.sprite} alt={pokemon.name} />
          {/* Shiny Sprite */}
          <img
            className="sprite"
            src={pokemon.shinySprite}
            alt={`Shiny ${pokemon.name}`}
          />
          {/* Types */}
          <p className="lead">
            Types: {pokemon.types[0]}
            {pokemon.types.length > 1 ? ", " + pokemon.types[1] : ""}
          </p>
          {/* Abilities */}
          <p className="lead">
            Abilities: {pokemon.abilities[0]}
            {pokemon.abilities.length > 1 ? ", " + pokemon.abilities[1] : ""}
          </p>
          {/* Hidden Ability */}
          <p className="lead">Hidden Ability: {pokemon.hiddenAbility}</p>
          {/* Weight in kg */}
          <p className="lead">Weight: {pokemon.weight} kg</p>
          {/* Base Friendship */}
          <p className="lead">Base Friendship: {pokemon.baseFriendship}</p>
          {/* Gender Ratio */}
          <p className="lead">
            Gender Ratio: {pokemon.genderRatio}% Male and{" "}
            {100 - pokemon.genderRatio}% Female
          </p>
          {/* Base Stats */}
          <p className="lead">Base Stats:</p>
          <p>Health: {pokemon.baseStats.hp}</p>
          <p>Attack: {pokemon.baseStats.atk}</p>
          <p>Defense: {pokemon.baseStats.def}</p>
          <p>Special Attack: {pokemon.baseStats.spA}</p>
          <p>Special Defense: {pokemon.baseStats.spD}</p>
          <p>Speed: {pokemon.baseStats.spe}</p>
          <br />
          {/* Egg Groups */}
          <p className="lead">
            Egg Groups: {pokemon.breeding.eggGroups[0]}
            {pokemon.breeding.eggGroups.length > 1
              ? ", " + pokemon.breeding.eggGroups[1]
              : ""}
          </p>
          {/* Pokemon that hatches from the egg if it is a male */}
          <p>Male Egg: {pokemon.breeding.egg}</p>
          {/* Pokemon that hatches from the egg if it is a female */}
          <p>Female Egg: {pokemon.breeding.altEgg}</p>
          <br />
          {/* Spawn Rate */}
          <p className="lead">Spawn Rate: {pokemon.spawnRate}</p>
          {/* Show what the pokemon evolves into only if the Pokemon evolves into something */}
          {pokemon.stages.current !== pokemon.stages.max ? (
            <Fragment>
              <p className="lead">Evolves into:</p>
              {/* Show each evolution and how to obtain it */}
              <p>
                {pokemon.evolutionDetails.map((item) => (
                  <li key={item.evolution}>
                    {item.evolution} {evolutionCondition(item.condition)}
                  </li>
                ))}
              </p>
              <br />
            </Fragment>
          ) : (
            ""
          )}
          {/* Show moves only if the Pokemon has moves (ex. Megas do not have moves) */}
          {pokemon.moves.length < 1 ? (
            ""
          ) : (
            <Fragment>
              <p className="lead">Moves:</p>
              {/* Show the move and the ways the Pokemon can learn it */}
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

// Return the condition for evolving a Pokemon
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

// Return the conditions for learning a move
const learnMoveCondition = (conditions) => {
  // if there is only one condition, just show it
  if (conditions.length === 1) {
    return typeof conditions[0] === "number"
      ? "level " + conditions[0]
      : conditions[0] === "Egg"
      ? "Breeding"
      : conditions[0] === "Tutor"
      ? "Move Tutor"
      : conditions[0];
  } else {
    // if there is more than one condition, show the first one
    let list =
      typeof conditions[0] === "number"
        ? "level " + conditions[0]
        : conditions[0];
    // then go through the list of conditions, showing each one separated by proper grammar (commas and "and")
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
  getAllPokemon: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPokemon, getAllPokemon })(Pokemon);
