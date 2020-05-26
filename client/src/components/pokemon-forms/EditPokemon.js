import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getPokemon,
  getAllPokemon,
  updatePokemon,
} from "../../actions/pokemon";
import Spinner from "../layout/Spinner";
import AccessDenied from "../layout/AccessDenied";

const Pokemon = ({
  match,
  getPokemon,
  getAllPokemon,
  updatePokemon,
  pokemon: { pokemon, pokedex, loading },
  auth: { user },
}) => {
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
    moves: [],
    id: 0,
    eggGroups: [],
    egg: "",
    altEgg: "",
    currentStage: 0,
    maxStage: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getPokemon(match.params.id);

    setFormData({
      name: loading || !pokemon.name ? "" : pokemon.name,
      sprite: loading || !pokemon.sprite ? "" : pokemon.sprite,
      shinySprite: loading || !pokemon.shinySprite ? "" : pokemon.shinySprite,
      types: loading || !pokemon.types ? "" : pokemon.types.join(", "),
      abilities:
        loading || !pokemon.abilities ? "" : pokemon.abilities.join(","),
      hiddenAbility:
        loading || !pokemon.hiddenAbility ? "" : pokemon.hiddenAbility,
      weight: loading || !pokemon.weight ? 0 : pokemon.weight,
      baseFriendship:
        loading || !pokemon.baseFriendship ? 0 : pokemon.baseFriendship,
      hp: loading || !pokemon.baseStats.hp ? 0 : pokemon.baseStats.hp,
      atk: loading || !pokemon.baseStats.atk ? 0 : pokemon.baseStats.atk,
      def: loading || !pokemon.baseStats.def ? 0 : pokemon.baseStats.def,
      spA: loading || !pokemon.baseStats.spA ? 0 : pokemon.baseStats.spA,
      spD: loading || !pokemon.baseStats.spD ? 0 : pokemon.baseStats.spD,
      spe: loading || !pokemon.baseStats.spe ? 0 : pokemon.baseStats.spe,
      spawnRate: loading || !pokemon.spawnRate ? 0 : pokemon.spawnRate,
      moves:
        loading || !pokemon.moves
          ? ""
          : JSON.stringify(pokemon.moves)
              .split("],")
              .join("],\n")
              .split("{")
              .join("{\n")
              .split('"},')
              .join('"\n},\n'),
      id: loading || !pokemon.id ? 0 : pokemon.id,
      eggGroups:
        loading || !pokemon.breeding.eggGroups
          ? ""
          : pokemon.breeding.eggGroups.join(", "),
      egg: loading || !pokemon.breeding.egg ? "" : pokemon.breeding.egg,
      altEgg:
        loading || !pokemon.breeding.altEgg ? "" : pokemon.breeding.altEgg,
      currentStage:
        loading || !pokemon.stages.current ? 0 : pokemon.stages.current,
      maxStage: loading || !pokemon.stages.max ? 0 : pokemon.stages.max,
    });
  }, [getPokemon, getAllPokemon, match.params.id, loading]);

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
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updatePokemon(match.params.id, formData);
  };

  return (
    <Fragment>
      {user === null || loading ? (
        <Spinner />
      ) : user.privileges !== "admin" ? (
        <AccessDenied />
      ) : pokemon === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="buttons">
            {previousPokemonButton(pokemon.id)}
            {nextPokemonButton(pokemon.id, pokedex.length)}
            {/* {newPokemonButton(pokedex.length)} */}
            <Link className="lead edit-link" to={`/pokedex/${pokemon.id}/`}>
              Cancel
            </Link>
          </div>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <span className="lead">ID: </span>
              <input
                type="text"
                placeholder={id}
                name="id"
                value={id}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Name: </span>
              <input
                type="text"
                placeholder={name}
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Sprite URL: </span>
              <input
                type="text"
                placeholder={sprite}
                name="sprite"
                value={sprite}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Shiny Sprite URL: </span>
              <input
                type="text"
                placeholder={shinySprite}
                name="shinySprite"
                value={shinySprite}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Types: </span>
              <input
                type="text"
                placeholder={types}
                name="types"
                value={types}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Abilities: </span>
              <input
                type="text"
                placeholder={abilities}
                name="abilities"
                value={abilities}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Hidden Ability: </span>
              <input
                type="text"
                placeholder={hiddenAbility}
                name="hiddenAbility"
                value={hiddenAbility}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Weight (kg): </span>
              <input
                type="text"
                placeholder={weight}
                name="weight"
                value={weight}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Base Friendship: </span>
              <input
                type="text"
                placeholder={baseFriendship}
                name="baseFriendship"
                value={baseFriendship}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Spawn Rate: </span>
              <input
                type="text"
                placeholder={spawnRate}
                name="spawnRate"
                value={spawnRate}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Current Stage: </span>
              <input
                type="text"
                placeholder={currentStage}
                name="currentStage"
                value={currentStage}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Max Stage: </span>
              <input
                type="text"
                placeholder={maxStage}
                name="maxStage"
                value={maxStage}
                onChange={(e) => onChange(e)}
              />
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
              <span className="lead">Egg Groups: </span>
              <input
                type="text"
                placeholder={eggGroups}
                name="eggGroups"
                value={eggGroups}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Male Egg: </span>
              <input
                type="text"
                placeholder={egg}
                name="egg"
                value={egg}
                onChange={(e) => onChange(e)}
              />
              <span className="lead">Female Egg: </span>
              <input
                type="text"
                placeholder={altEgg}
                name="altEgg"
                value={altEgg}
                onChange={(e) => onChange(e)}
              />
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

const previousPokemonButton = (id) => {
  if (id > 1)
    return (
      <a className="btn btn-dark" href={`/pokedex/${id - 1}/edit`}>
        Previous Pokemon
      </a>
    );
  else return <button className="btn btn-light">Previous Pokemon</button>;
};

const nextPokemonButton = (id, maxID) => {
  if (id < maxID)
    return (
      <a className="btn btn-dark" href={`/pokedex/${id + 1}/edit`}>
        Next Pokemon
      </a>
    );
  else return <button className="btn btn-light">Next Pokemon</button>;
};

Pokemon.propTypes = {
  getPokemon: PropTypes.func.isRequired,
  getAllPokemon: PropTypes.func.isRequired,
  updatePokemon: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPokemon,
  getAllPokemon,
  updatePokemon,
})(Pokemon);
