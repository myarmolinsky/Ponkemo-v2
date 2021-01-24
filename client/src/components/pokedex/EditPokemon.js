import React, { Fragment, useState, useEffect, useContext } from "react";
import { any } from "prop-types";
import { PokemonContext, UserContext } from "../../context";
import Spinner from "../layout/Spinner";
import AccessDenied from "../layout/AccessDenied";
import NotFound from "../layout/NotFound";

export const EditPokemon = ({ match }) => {
  const {
    getPokemon,
    getLastId,
    updatePokemon,
    pokemon,
    nextPokemonId,
    previousPokemonId,
    lastId,
    loading,
  } = useContext(PokemonContext);

  const { user } = useContext(UserContext);

  let currentId = parseFloat(match.params.id);

  const [formData, setFormData] = useState({
    name: "",
    sprite: "",
    shinySprite: "",
    types: "",
    abilities: "",
    hiddenAbility: "",
    weight: 0,
    baseFriendship: 0,
    hp: 0,
    atk: 0,
    def: 0,
    spA: 0,
    spD: 0,
    spe: 0,
    spawnRate: 0,
    moves: "[]",
    evolutionDetails: "[]",
    id: currentId,
    eggGroups: "",
    egg: "",
    altEgg: "",
    currentStage: 0,
    maxStage: 0,
    genderRatio: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getPokemon(currentId); // get the Pokemon with the matching id

    if (pokemon)
      // if we're editing an existing Pokemon
      setFormData({
        name: loading || !pokemon.name ? "" : pokemon.name,
        sprite: loading || !pokemon.sprite ? "" : pokemon.sprite,
        shinySprite: loading || !pokemon.shinySprite ? "" : pokemon.shinySprite,
        types: loading || !pokemon.types ? "" : pokemon.types.join(", "),
        abilities:
          loading || !pokemon.abilities ? "" : pokemon.abilities.join(", "),
        hiddenAbility:
          loading || !pokemon.hiddenAbility ? "" : pokemon.hiddenAbility,
        weight: loading || !pokemon.weight ? 0 : pokemon.weight,
        baseFriendship:
          loading || !pokemon.baseFriendship ? 0 : pokemon.baseFriendship,
        hp:
          loading ||
          !pokemon.baseStats ||
          (pokemon.baseStats && !pokemon.baseStats.hp)
            ? 0
            : pokemon.baseStats.hp,
        atk:
          loading ||
          !pokemon.baseStats ||
          (pokemon.baseStats && !pokemon.baseStats.atk)
            ? 0
            : pokemon.baseStats.atk,
        def:
          loading ||
          !pokemon.baseStats ||
          (pokemon.baseStats && !pokemon.baseStats.def)
            ? 0
            : pokemon.baseStats.def,
        spA:
          loading ||
          !pokemon.baseStats ||
          (pokemon.baseStats && !pokemon.baseStats.spA)
            ? 0
            : pokemon.baseStats.spA,
        spD:
          loading ||
          !pokemon.baseStats ||
          (pokemon.baseStats && !pokemon.baseStats.spD)
            ? 0
            : pokemon.baseStats.spD,
        spe:
          loading ||
          !pokemon.baseStats ||
          (pokemon.baseStats && !pokemon.baseStats.spe)
            ? 0
            : pokemon.baseStats.spe,
        spawnRate: loading || !pokemon.spawnRate ? 0 : pokemon.spawnRate,
        moves:
          loading || !pokemon.moves
            ? "[]"
            : JSON.stringify(pokemon.moves)
                .split("],")
                .join("],\n")
                .split("{")
                .join("{\n")
                .split("},")
                .join("\n},\n")
                .split("}]")
                .join("\n}]"),
        evolutionDetails:
          loading || !pokemon.evolutionDetails
            ? "[]"
            : JSON.stringify(pokemon.evolutionDetails)
                .split('",')
                .join('",\n')
                .split("{")
                .join("{\n")
                .split("},")
                .join("\n},\n")
                .split("}]")
                .join("\n}]"),
        id: loading || !pokemon.id ? currentId : pokemon.id,
        eggGroups:
          loading ||
          !pokemon.breeding ||
          (pokemon.breeding && !pokemon.breeding.eggGroups)
            ? ""
            : pokemon.breeding.eggGroups.join(", "),
        egg:
          loading ||
          !pokemon.breeding ||
          (pokemon.breeding && !pokemon.breeding.egg)
            ? ""
            : pokemon.breeding.egg,
        altEgg:
          loading ||
          !pokemon.breeding ||
          (pokemon.breeding && !pokemon.breeding.altEgg)
            ? ""
            : pokemon.breeding.altEgg,
        currentStage:
          loading ||
          !pokemon.stages ||
          (pokemon.stages && !pokemon.stages.current)
            ? 0
            : pokemon.stages.current,
        maxStage:
          loading || !pokemon.stages || (pokemon.stages && !pokemon.stages.max)
            ? 0
            : pokemon.stages.max,
        genderRatio: loading || !pokemon.genderRatio ? 0 : pokemon.genderRatio,
      });

    if (lastId === -1 || currentId > lastId) {
      getLastId(); // get the last id so we know how many Pokemon we have
    }
  }, [currentId, loading, lastId]);

  const {
    name,
    sprite,
    shinySprite,
    types,
    abilities,
    hiddenAbility,
    weight,
    baseFriendship,
    hp,
    atk,
    def,
    spA,
    spD,
    spe,
    spawnRate,
    moves,
    id,
    eggGroups,
    egg,
    altEgg,
    currentStage,
    maxStage,
    genderRatio,
    evolutionDetails,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // if we are making a new Pokemon reload the page after creating it so that all the proper data loads (otherwise the buttons don't work properly)
    if (currentId > lastId) {
      updatePokemon(currentId, formData, false);
      window.location.reload();
    } else updatePokemon(currentId, formData); // if we are editing an existing Pokemon
    // if we edited the pokemon's id, load the page connected to its new id
    let splitUrl = window.location.href.split("/");
    if (id !== currentId) {
      splitUrl.pop();
      splitUrl.pop();
      window.open(splitUrl.join("/") + "/" + id + "/edit", "_self");
    }
  };

  // if there is a previous Pokemon, return an <a> tag to it, otherwise return a grayed out button that takes you nowhere
  const previousPokemonButton = () => {
    if (currentId > 1)
      return (
        <a className="btn btn-dark" href={`/pokedex/${previousPokemonId}/edit`}>
          Previous Pokemon
        </a>
      );
    else return <button className="btn btn-light">Previous Pokemon</button>;
  };

  // if there is a next Pokemon, return an <a> tag to it, otherwise return a grayed out button that takes you nowhere
  const nextPokemonButton = () => {
    if (currentId < lastId) {
      return (
        <a className="btn btn-dark" href={`/pokedex/${nextPokemonId}/edit`}>
          Next Pokemon
        </a>
      );
    } else return <button className="btn btn-light">Next Pokemon</button>;
  };

  // if you're not on the new Pokemon's page, return an <a> tag to it, otherwise return a grayed out button that takes you nowhere
  const newPokemonButton = () => {
    if (Math.floor(currentId) <= lastId) {
      return (
        <a className="btn btn-dark" href={`/pokedex/${lastId + 1}/edit`}>
          Add a New Pokemon
        </a>
      );
    } else return <button className="btn btn-light">Add a New Pokemon</button>;
  };

  // if you're on a new Pokemon's page and it doesn't exist yet, return a grayed out button that takes you nowhere, otherwise return an <a> tag to it's normal page
  const cancelButton = () => {
    if (currentId > lastId) {
      return (
        <a className="lead edit-link" href={`/pokedex/${currentId - 1}/`}>
          Cancel
        </a>
      );
    } else
      return (
        <a className="lead edit-link" href={`/pokedex/${currentId}/`}>
          Cancel
        </a>
      );
  };

  return (
    <Fragment>
      {user === null || loading || pokemon === null ? (
        <Spinner />
      ) : user.privileges !== "admin" ? (
        // if the user does not have "admin" privileges
        <AccessDenied />
      ) : currentId > lastId + 1 || currentId < 1 ? (
        // if the page the user is trying to go to a Pokemon that does not exist
        <NotFound />
      ) : (
        <Fragment>
          <div className="buttons">
            {/* Link does not reload the page so I have to use <a> tags so I use these functions to determine which <a> tag to return depending on the page we're on */}
            {previousPokemonButton()}
            {nextPokemonButton()}
            {newPokemonButton()}
            {cancelButton()}
          </div>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              {/* ID */}
              <span className="lead">ID: </span>
              <input
                type="text"
                placeholder={id}
                name="id"
                value={id}
                onChange={(e) => onChange(e)}
              />
              {/* Name */}
              <span className="lead">Name: </span>
              <input
                type="text"
                placeholder={name}
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
              {/* Sprite */}
              <span className="lead">Sprite URL: </span>
              <input
                type="text"
                placeholder={sprite}
                name="sprite"
                value={sprite}
                onChange={(e) => onChange(e)}
              />
              {/* Shiny Sprite */}
              <span className="lead">Shiny Sprite URL: </span>
              <input
                type="text"
                placeholder={shinySprite}
                name="shinySprite"
                value={shinySprite}
                onChange={(e) => onChange(e)}
              />
              {/* Types */}
              <span className="lead">Types: </span>
              <input
                type="text"
                placeholder={types}
                name="types"
                value={types}
                onChange={(e) => onChange(e)}
              />
              {/* Abilities */}
              <span className="lead">Abilities: </span>
              <input
                type="text"
                placeholder={abilities}
                name="abilities"
                value={abilities}
                onChange={(e) => onChange(e)}
              />
              {/* Hidden Ability */}
              <span className="lead">Hidden Ability: </span>
              <input
                type="text"
                placeholder={hiddenAbility}
                name="hiddenAbility"
                value={hiddenAbility}
                onChange={(e) => onChange(e)}
              />
              {/* Weight in kg */}
              <span className="lead">Weight (kg): </span>
              <input
                type="text"
                placeholder={weight}
                name="weight"
                value={weight}
                onChange={(e) => onChange(e)}
              />
              {/* Base Friendship */}
              <span className="lead">Base Friendship: </span>
              <input
                type="text"
                placeholder={baseFriendship}
                name="baseFriendship"
                value={baseFriendship}
                onChange={(e) => onChange(e)}
              />
              {/* Gender Ratio */}
              <span className="lead">Gender Ratio: </span>
              <input
                type="text"
                placeholder={genderRatio}
                name="genderRatio"
                value={genderRatio}
                onChange={(e) => onChange(e)}
              />
              {/* Spawn Rate */}
              <span className="lead">Spawn Rate: </span>
              <input
                type="text"
                placeholder={spawnRate}
                name="spawnRate"
                value={spawnRate}
                onChange={(e) => onChange(e)}
              />
              {/* Current Stage */}
              <span className="lead">Current Stage: </span>
              <input
                type="text"
                placeholder={currentStage}
                name="currentStage"
                value={currentStage}
                onChange={(e) => onChange(e)}
              />
              {/* Max Stage */}
              <span className="lead">Max Stage: </span>
              <input
                type="text"
                placeholder={maxStage}
                name="maxStage"
                value={maxStage}
                onChange={(e) => onChange(e)}
              />
              {/* Evolution Details */}
              <span className="lead">Evolution Details: </span>
              <textarea
                rows="5"
                type="text"
                placeholder={evolutionDetails}
                name="evolutionDetails"
                value={evolutionDetails}
                onChange={(e) => onChange(e)}
              />
              {/* Base Stats */}
              <span className="lead">Health Base Stat: </span>
              <input
                type="text"
                placeholder={hp}
                name="hp"
                value={hp}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Attack Base Stat: </span>
              <input
                type="text"
                placeholder={atk}
                name="atk"
                value={atk}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Defense Base Stat: </span>
              <input
                type="text"
                placeholder={def}
                name="def"
                value={def}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Special Attack Base Stat: </span>
              <input
                type="text"
                placeholder={spA}
                name="spA"
                value={spA}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Special Defense Base Stat: </span>
              <input
                type="text"
                placeholder={spD}
                name="spD"
                value={spD}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Speed Base Stat: </span>
              <input
                type="text"
                placeholder={spe}
                name="spe"
                value={spe}
                onChange={(e) => onChange(e)}
              />
              {/* Egg Groups */}
              <span className="lead">Egg Groups: </span>
              <input
                type="text"
                placeholder={eggGroups}
                name="eggGroups"
                value={eggGroups}
                onChange={(e) => onChange(e)}
              />
              {/* Pokemon that hatches from the egg if it is a male */}
              <span className="lead">Male Egg: </span>
              <input
                type="text"
                placeholder={egg}
                name="egg"
                value={egg}
                onChange={(e) => onChange(e)}
              />
              {/* Pokemon that hatches from the egg if it is a female */}
              <span className="lead">Female Egg: </span>
              <input
                type="text"
                placeholder={altEgg}
                name="altEgg"
                value={altEgg}
                onChange={(e) => onChange(e)}
              />
              {/* Moves */}
              <span className="lead">Moves: </span>
              <textarea
                rows="30"
                type="text"
                placeholder={moves}
                name="moves"
                value={moves}
                onChange={(e) => onChange(e)}
              />
              <input type="submit" className="btn btn-primary my-1" />
            </div>
          </form>
        </Fragment>
      )}
    </Fragment>
  );
};

EditPokemon.propTypes = {
  match: any.isRequired,
};
