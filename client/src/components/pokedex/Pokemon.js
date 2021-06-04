import React, { Fragment, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { any } from "prop-types";
import { Button, Grid } from "@material-ui/core";
import { PokemonContext, UserContext } from "../../context";
import { Spinner, NotFound } from "../layout";
import { PokemonSprite } from "../common";

export const Pokemon = ({ match }) => {
  const {
    getPokemon,
    getFormes,
    getEggs,
    getEvolutions,
    pokemon,
    evolutions,
    eggs,
    formes,
    lastId,
    loading,
  } = useContext(PokemonContext);

  const { user } = useContext(UserContext);

  let history = useHistory();

  useEffect(() => {
    getPokemon(match.params.id);
    getFormes(match.params.id);
    getEggs(match.params.id);
    getEvolutions(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.id]);

  let evolutionCount = -1;
  let formeRow = -1;
  let evolutionRow = -1;

  const displayFormes = (formes) => {
    return formes.map((pokemon) => (
      <td key={pokemon.id} className="table-body" colSpan={2} align="center">
        <PokemonSprite
          sprite={pokemon.sprite}
          caption={pokemon.name}
          alt={pokemon.name}
          onClick={() => history.push(`/pokedex/${pokemon.id}`)}
        />
      </td>
    ));
  };

  const displayEvolutions = (evolutions, condition) => {
    return evolutions.map((pokemon) => (
      <td key={pokemon.id} className="table-body" colSpan={2} align="center">
        <PokemonSprite
          sprite={pokemon.sprite}
          caption={pokemon.name + " " + evolutionCondition(condition)}
          alt={pokemon.name}
          onClick={() => history.push(`/pokedex/${pokemon.id}`)}
        />
      </td>
    ));
  };

  return (
    <Fragment>
      {loading || lastId === -1 || eggs.length === 0 ? (
        <Spinner />
      ) : isNaN(match.params.id) ||
        match.params.id > lastId ||
        match.params.id < 1 ||
        !pokemon ? (
        // if the page the user is trying to go to a Pokemon that does not exist
        <NotFound />
      ) : (
        <Fragment>
          <Grid container justify="space-evenly">
            <Grid item xs={5}>
              {/* If there is a previous pokemon, link to its page */}
              <Button
                color="secondary"
                size="large"
                variant="contained"
                fullWidth
                component={Link}
                to={`/pokedex/${Math.ceil(match.params.id) - 1}`}
                disabled={match.params.id <= 1}
              >
                Previous Pokemon
              </Button>
            </Grid>
            <Grid item xs={5}>
              {/* If there is a next pokemon, link to its page */}
              <Button
                color="secondary"
                size="large"
                variant="contained"
                fullWidth
                component={Link}
                to={`/pokedex/${Math.floor(match.params.id) + 1}`}
                disabled={match.params.id >= lastId}
              >
                Next Pokemon
              </Button>
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              margin: "5%",
            }}
          >
            <table className="table">
              <tbody>
                <tr>
                  <th className="table-head" colSpan={6}>
                    <h1 className="large">
                      {/* Name*/}
                      {pokemon.name}{" "}
                      {/* Edit link for users with "admin" privileges */}
                      {user !== null && user.privileges === "admin" && (
                        <Link
                          className="lead edit-link"
                          to={`/pokedex/${match.params.id}/edit`}
                        >
                          Edit
                        </Link>
                      )}
                    </h1>
                  </th>
                </tr>
                <tr>
                  <td className="table-body" colSpan={3} align="center">
                    <PokemonSprite sprite={pokemon.sprite} alt={pokemon.name} />
                  </td>
                  <td className="table-body" colSpan={3} align="center">
                    <PokemonSprite
                      sprite={pokemon.shinySprite}
                      alt={"Shiny" + pokemon.name}
                    />
                  </td>
                </tr>
                {formes.length > 0 && (
                  <>
                    <tr>
                      <th className="table-head" colSpan={6}>
                        Formes
                      </th>
                    </tr>
                    {[...Array(Math.ceil(formes.length / 3))].map(() => {
                      formeRow++;
                      let subArr = formes.slice(formeRow * 3, formeRow * 3 + 3);
                      return (
                        <tr key={formeRow}>
                          {subArr.length < 3 && (
                            <td
                              className="table-body"
                              colSpan={subArr.length === 2 ? 1 : 2}
                            />
                          )}
                          {displayFormes(subArr)}
                          {subArr.length < 3 && (
                            <td
                              className="table-body"
                              colSpan={subArr.length === 2 ? 1 : 2}
                            />
                          )}
                        </tr>
                      );
                    })}
                  </>
                )}
                <tr>
                  <th className="table-head" colSpan={6}>
                    Types
                  </th>
                </tr>
                <tr>
                  <td
                    className="table-body"
                    colSpan={pokemon.types.length > 1 ? 3 : 6}
                  >
                    <Link to={`/types/${pokemon.types[0]}`}>
                      {pokemon.types[0]}
                    </Link>
                  </td>
                  {pokemon.types.length > 1 && (
                    <td className="table-body" colSpan={3}>
                      <Link to={`/types/${pokemon.types[1]}`}>
                        {pokemon.types[1]}
                      </Link>
                    </td>
                  )}
                </tr>
                <tr>
                  <th className="table-head" colSpan={6}>
                    Abilities
                  </th>
                </tr>
                <tr>
                  <td
                    className="table-body"
                    colSpan={pokemon.abilities.length > 1 ? 3 : 6}
                  >
                    {pokemon.abilities[0]}
                  </td>
                  {pokemon.abilities.length > 1 && (
                    <td className="table-body" colSpan={3}>
                      {pokemon.abilities[1]}
                    </td>
                  )}
                </tr>
                {pokemon.hiddenAbility !== "" && (
                  <>
                    <tr>
                      <th className="table-head" colSpan={6}>
                        Hidden Ability
                      </th>
                    </tr>
                    <tr>
                      <td className="table-body" colSpan={6}>
                        {pokemon.hiddenAbility}
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <th className="table-head" colSpan={6}>
                    Base Stats
                  </th>
                </tr>
                <tr>
                  <th className="table-head">HP</th>
                  <th className="table-head">Atk</th>
                  <th className="table-head">Def</th>
                  <th className="table-head">SpA</th>
                  <th className="table-head">SpD</th>
                  <th className="table-head">Spe</th>
                </tr>
                <tr>
                  <td className="table-body">{pokemon.baseStats.hp}</td>
                  <td className="table-body">{pokemon.baseStats.atk}</td>
                  <td className="table-body">{pokemon.baseStats.def}</td>
                  <td className="table-body">{pokemon.baseStats.spA}</td>
                  <td className="table-body">{pokemon.baseStats.spD}</td>
                  <td className="table-body">{pokemon.baseStats.spe}</td>
                </tr>
                <tr>
                  <th className="table-head" colSpan={6}>
                    Gender Ratio
                  </th>
                </tr>
                <tr>
                  {pokemon.genderRatio === -1 ? (
                    <td className="table-body" colSpan={6}>
                      Genderless
                    </td>
                  ) : (
                    <>
                      <td className="table-body" colSpan={3}>
                        {pokemon.genderRatio}% Male
                      </td>
                      <td className="table-body" colSpan={3}>
                        {100 - pokemon.genderRatio}% Female
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                  <th className="table-head" colSpan={6}>
                    Egg Groups
                  </th>
                </tr>
                <tr>
                  <td
                    className="table-body"
                    colSpan={pokemon.breeding.eggGroups.length > 1 ? 3 : 6}
                  >
                    <Link to={`/egggroups/${pokemon.breeding.eggGroups[0]}`}>
                      {pokemon.breeding.eggGroups[0]}
                    </Link>
                  </td>
                  {pokemon.breeding.eggGroups.length > 1 && (
                    <td className="table-body" colSpan={3}>
                      <Link to={`/egggroups/${pokemon.breeding.eggGroups[1]}`}>
                        {pokemon.breeding.eggGroups[1]}
                      </Link>
                    </td>
                  )}
                </tr>
                <tr>
                  <th className="table-head" colSpan={6}>
                    Egg Pokemon
                  </th>
                </tr>
                <tr>
                  <td
                    className="table-body"
                    colSpan={
                      pokemon.breeding.egg !== pokemon.breeding.altEgg ? 3 : 6
                    }
                  >
                    <Link to={`/pokedex/${eggs[0].id}`}>
                      {pokemon.breeding.egg}
                    </Link>
                  </td>
                  {pokemon.breeding.egg !== pokemon.breeding.altEgg && (
                    <td className="table-body" colSpan={3}>
                      <Link to={`/pokedex/${eggs[1].id}`}>
                        {pokemon.breeding.altEgg}
                      </Link>
                    </td>
                  )}
                </tr>
                <tr>
                  <th className="table-head" colSpan={2}>
                    Weight
                  </th>
                  <th className="table-head" colSpan={2}>
                    Base Friendship
                  </th>
                  <th className="table-head" colSpan={2}>
                    Spawn Rate
                  </th>
                </tr>
                <tr>
                  <td className="table-body" colSpan={2}>
                    {pokemon.weight} kg
                  </td>
                  <td className="table-body" colSpan={2}>
                    {pokemon.baseFriendship}
                  </td>
                  <td className="table-body" colSpan={2}>
                    {pokemon.spawnRate}
                  </td>
                </tr>
                {evolutions.length > 0 && (
                  <>
                    <tr>
                      <th className="table-head" colSpan={6}>
                        Evolutions
                      </th>
                    </tr>
                    {[...Array(Math.ceil(evolutions.length / 3))].map(() => {
                      evolutionRow++;
                      evolutionCount++;
                      let subArr = evolutions.slice(
                        evolutionRow * 3,
                        evolutionRow * 3 + 3
                      );
                      return (
                        <tr key={evolutionRow}>
                          {subArr.length < 3 && (
                            <td
                              className="table-body"
                              colSpan={subArr.length === 2 ? 1 : 2}
                            />
                          )}
                          {displayEvolutions(
                            subArr,
                            pokemon.evolutionDetails[evolutionCount].condition
                          )}
                          {subArr.length < 3 && (
                            <td
                              className="table-body"
                              colSpan={subArr.length === 2 ? 1 : 2}
                            />
                          )}
                        </tr>
                      );
                    })}
                  </>
                )}
                {/* Show moves only if the Pokemon has moves (ex. Megas do not have moves) */}
                {pokemon.moves.length > 1 && (
                  <>
                    <tr>
                      <th className="table-head" colSpan={6}>
                        Moveset
                      </th>
                    </tr>
                    <tr>
                      <th className="table-head">Move</th>
                      <th className="table-head">Level(s)</th>
                      <th className="table-head">Evolution</th>
                      <th className="table-head">TM</th>
                      <th className="table-head">Egg</th>
                      <th className="table-head">Tutor</th>
                    </tr>
                    {pokemon.moves.map((item) => (
                      <tr key={item.name}>
                        <td className="table-body">{item.name}</td>
                        <td className="table-body">
                          {levelsLearned(item.learnConditions)}
                        </td>
                        <td className="table-body">
                          <i
                            className={`fas fa-${
                              item.learnConditions.includes("Evolve")
                                ? "check"
                                : "times"
                            }`}
                            style={{
                              color: `${
                                item.learnConditions.includes("Evolve")
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          />
                        </td>
                        <td className="table-body">
                          <i
                            className={`fas fa-${
                              item.learnConditions.includes("TM")
                                ? "check"
                                : "times"
                            }`}
                            style={{
                              color: `${
                                item.learnConditions.includes("TM")
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          />
                        </td>
                        <td className="table-body">
                          <i
                            className={`fas fa-${
                              item.learnConditions.includes("Egg")
                                ? "check"
                                : "times"
                            }`}
                            style={{
                              color: `${
                                item.learnConditions.includes("Egg")
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          />
                        </td>
                        <td className="table-body">
                          <i
                            className={`fas fa-${
                              item.learnConditions.includes("Tutor")
                                ? "check"
                                : "times"
                            }`}
                            style={{
                              color: `${
                                item.learnConditions.includes("Tutor")
                                  ? "green"
                                  : "red"
                              }`,
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
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
      case "Shiny Stone":
        return "by using a Shiny Stone";
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
      case "Galarica Cuff":
        return "by using a Galarica Cuff";
      default:
        return;
    }
  }
};

// Return the conditions for learning a move
const levelsLearned = (conditions) => {
  // if there is only one condition, just show it
  if (conditions.length === 1) {
    return typeof conditions[0] === "number" ? (
      conditions[0]
    ) : (
      <i className="fas fa-minus" />
    );
  } else {
    // if there is more than one condition, show only the numeric ones
    let list = [];
    for (let i = 0; i < conditions.length; i++) {
      if (typeof conditions[i] === "number") {
        list.push(conditions[i]);
      }
    }
    list.sort((a, b) => a - b);
    if (list.length === 0) {
      return <i className="fas fa-minus" />;
    }
    return list.join(", ");
  }
};

Pokemon.propTypes = {
  match: any.isRequired,
};
