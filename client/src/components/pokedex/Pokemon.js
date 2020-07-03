import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPokemon, getLastId } from "../../actions/pokemon";
import Spinner from "../layout/Spinner";
import NotFound from "../layout/NotFound";

const Pokemon = ({
  match,
  getPokemon,
  getLastId,
  pokemon: { pokemon, evolutionIds, eggIds, formes, lastId, loading },
  auth: { user },
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getPokemon(match.params.id);
    getLastId();
  }, [getPokemon, getLastId, match.params.id]);

  // evolutionIndex is the index we are up to in the evolutionIds array
  let evolutionIndex = 0;
  console.log(pokemon);

  return (
    <Fragment>
      {pokemon === null || loading ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (match.params.id > lastId &&
          Math.floor(match.params.id) !== lastId) ||
        match.params.id < 1 ? (
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
                      return `/pokedex/${Math.ceil(pokemon.id) - 1}`;
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
                pokemon.id < lastId
                  ? () => {
                      return `/pokedex/${Math.floor(pokemon.id) + 1}`;
                    }
                  : () => {
                      return;
                    }
              }
              className={pokemon.id < lastId ? "btn btn-dark" : "btn btn-light"}
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
          {/* Formes */}
          <div className="lead">
            {formes.length > 1 ? (
              <Fragment>
                Formes: <br />
                {formes.map((
                  item // for each item in formes
                ) =>
                  item.name !== pokemon.name ? (
                    <Link key={item.name} to={`/pokedex/${item.id}`}>
                      {/* Create a link leading to the pokemon's page */}
                      <div className="pokedex-item">
                        <img
                          src={item.sprite}
                          className="sprite pokedex-sprite"
                          alt={item.name}
                        />
                        {/* Pokemon's sprite */}
                        <span className="caption">[{item.name}]</span>
                        {/* Pokemon's name */}
                      </div>
                    </Link>
                  ) : (
                    ""
                  )
                )}
              </Fragment>
            ) : (
              " "
            )}
          </div>
          {/* Types */}
          <p className="lead">
            Types: {pokemon.types[0]}
            {pokemon.types.length > 1 ? ", " + pokemon.types[1] : ""}
          </p>
          {/* Abilities */}
          <p className="lead">
            {pokemon.abilities.length > 1 ? "Abilities:" : "Ability:"}{" "}
            {pokemon.abilities[0]}
            {pokemon.abilities.length > 1 ? ", " + pokemon.abilities[1] : ""}
          </p>
          {/* Hidden Ability */}
          {pokemon.hiddenAbility !== "" ? (
            <Fragment>
              <p className="lead">Hidden Ability: {pokemon.hiddenAbility}</p>
            </Fragment>
          ) : (
            ""
          )}
          {/* Weight in kg */}
          <p className="lead">Weight: {pokemon.weight} kg</p>
          {/* Base Friendship */}
          <p className="lead">Base Friendship: {pokemon.baseFriendship}</p>
          {/* Gender Ratio */}
          <p className="lead">
            Gender Ratio:{" "}
            {pokemon.genderRatio !== -1
              ? pokemon.genderRatio +
                "% Male and " +
                (100 - pokemon.genderRatio) +
                "% Female "
              : "Genderless"}
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
            Egg Groups:{" "}
            <Link to={`/egggroups/${pokemon.breeding.eggGroups[0]}`}>
              {pokemon.breeding.eggGroups[0]}
            </Link>
            {pokemon.breeding.eggGroups.length > 1 ? ", " : ""}
            {/* must run another ternary separately because when you append jsx to a string, it comes out as [Object object] instead of what it's meant to be */}
            {pokemon.breeding.eggGroups.length > 1 ? (
              <Link to={`/egggroups/${pokemon.breeding.eggGroups[1]}`}>
                {pokemon.breeding.eggGroups[1]}
              </Link>
            ) : (
              ""
            )}
          </p>
          {pokemon.breeding.egg !== pokemon.breeding.altEgg ? (
            <Fragment>
              {/* Pokemon that hatches from the egg if it is a male */}
              <p className="lead">
                Male Egg:{" "}
                <Link to={`/pokedex/${eggIds[0]}`}>{pokemon.breeding.egg}</Link>
              </p>
              {/* Pokemon that hatches from the egg if it is a female */}
              <p className="lead">
                Female Egg:{" "}
                <Link to={`/pokedex/${eggIds[1]}`}>
                  {pokemon.breeding.altEgg}
                </Link>
              </p>
            </Fragment>
          ) : (
            <Fragment>
              {/* if male and female eggs are the same */}
              <p className="lead">
                Egg:{" "}
                <Link to={`/pokedex/${eggIds[0]}`}>{pokemon.breeding.egg}</Link>
              </p>
            </Fragment>
          )}
          {/* Spawn Rate */}
          <p className="lead">Spawn Rate: {pokemon.spawnRate}</p>
          {/* Show what the pokemon evolves into only if the Pokemon evolves into something */}
          {pokemon.stages.current !== pokemon.stages.max ? (
            <Fragment>
              <p className="lead">Evolves into:</p>
              {/* Show each evolution and how to obtain it */}
              <p>
                {pokemon.evolutionDetails.map((item) => {
                  // the name of the evolution is a link to the evolution
                  let listItem = (
                    <li key={item.evolution}>
                      <Link to={`/pokedex/${evolutionIds[evolutionIndex]}`}>
                        {item.evolution}
                      </Link>{" "}
                      {evolutionCondition(item.condition)}
                    </li>
                  );
                  // increase evolutionIndex by one
                  evolutionIndex++;
                  // return the list item
                  return listItem;
                })}
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
              <table className="moves-table">
                <thead>
                  <tr>
                    <th className="move-cell move-head">Move</th>
                    <th className="move-cell move-head">Level(s)</th>
                    <th className="move-cell move-head">Evolution</th>
                    <th className="move-cell move-head">TM</th>
                    <th className="move-cell move-head">Egg</th>
                    <th className="move-cell move-head">Tutor</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemon.moves.map((item) => (
                    <tr key={item.name}>
                      <td className="move-cell move-body move-name">
                        {item.name}
                      </td>
                      <td className="move-cell move-body none-move-name">
                        {learnMoveCondition(item.learnConditions)}
                      </td>
                      <td className="move-cell move-body none-move-name">
                        {item.learnConditions.includes("Evolve") ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className="fas fa-times"></i>
                        )}
                      </td>
                      <td className="move-cell move-body none-move-name">
                        {item.learnConditions.includes("TM") ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className="fas fa-times"></i>
                        )}
                      </td>
                      <td className="move-cell move-body none-move-name">
                        {item.learnConditions.includes("Egg") ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className="fas fa-times"></i>
                        )}
                      </td>
                      <td className="move-cell move-body none-move-name">
                        {item.learnConditions.includes("Tutor") ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <i className="fas fa-times"></i>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      case "atk>def":
        return "by leveling up Tyrogue to level 20 while its Attack is higher than its Defense";
      case "atk=def":
        return "by leveling up Tyrogue to level 20 while its Attack is equal to its Defense";
      case "atk<def":
        return "by leveling up Tyrogue to level 20 while its Attack is less than its Defense";
      case "Deep Sea Tooth":
        return "by trade while holding a Deep Sea Tooth";
      case "Deep Sea Scale":
        return "by trade while holding a Deep Sea Scale";
      case "Reaper Cloth":
        return "by trade while holding a Reaper Cloth";
      case "Electirizer":
        return "by trade while holding a Electirizer";
      case "Prism Scale":
        return "by trade while holding a Prism Scale";
      case "Magmarizer":
        return "by trade while holding a Magmarizer";
      case "Trade":
        return "by trade";
      case "King's Rock":
        return "by trade while holding a King's Rock";
      case "Upgrade":
        return "by trade while holding a Upgrade";
      case "Dubious Disc":
        return "by trade while holding a Dubious Disc";
      case "Protector":
        return "by trade while holding a Protector";
      case "Dragon Scale":
        return "by trade while holding a Dragon Scale";
      case "Sachet":
        return "by trade while holding a Sachet";
      case "Sweet Apple":
        return "by using a Sweet Apple";
      case "Tart Apple":
        return "by using a Tart Apple";
      case "Whipped Dream":
        return "by trade while holding a Whipped Dream";
      case "Toxtricity Amped Form":
        return "by leveling up Toxel to level 30 while its nature is Hardy, Brave, Adamant, Naughty, Docile, Impish, Lax, Hasty, Jolly, Naive, Rash, Sassy, or Quirky";
      case "Toxtricity Low Key Form":
        return "by leveling up Toxel to level 30 while its nature is Lonely, Bold, Relaxed, Timid, SErious, Modest, Mild, Quiet, Bashful, Calm, Gentle, or Careful";
      default:
        return;
    }
  }
};

// Return the conditions for learning a move
const learnMoveCondition = (conditions) => {
  // if there is only one condition, just show it
  if (conditions.length === 1) {
    return typeof conditions[0] === "number" ? (
      conditions[0]
    ) : (
      <i className="fas fa-minus"></i>
    );
  } else {
    // if there is more than one condition, show the first one
    let list = [];
    for (let i = 0; i < conditions.length; i++) {
      if (typeof conditions[i] === "number") list.push(conditions[i]);
    }
    list.sort();
    if (list.length === 0) return <i className="fas fa-minus"></i>;
    return list.join(", ");
  }
};

Pokemon.propTypes = {
  getPokemon: PropTypes.func.isRequired,
  getLastId: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPokemon, getLastId })(Pokemon);
