import React, { Fragment, useState, useEffect, useContext } from "react";
import { any } from "prop-types";
import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { PokemonContext, UserContext } from "../../context";
import { NotFound, Spinner, AccessDenied } from "../layout";

export const EditPokemon = ({ match }) => {
  const { getPokemon, updatePokemon, pokemon, lastId, loading } = useContext(
    PokemonContext
  );

  // TODO
  let previousPokemonId = 1;
  let nextPokemonId = 3;

  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    sprite: "",
    shinySprite: "",
    firstType: " ",
    secondType: " ",
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
    id: match.params.id,
    eggGroups: "",
    egg: "",
    altEgg: "",
    currentStage: 0,
    maxStage: 0,
    genderRatio: 0,
  });

  useEffect(() => {
    getPokemon(match.params.id); // get the Pokemon with the matching id
  }, []);

  useEffect(() => {
    if (pokemon)
      // if we're editing an existing Pokemon
      setFormData({
        name: pokemon.name,
        sprite: pokemon.sprite,
        shinySprite: pokemon.shinySprite,
        firstType: pokemon.types && pokemon.types[0],
        secondType:
          pokemon.types && pokemon.types.length > 1 && pokemon.types[1],
        abilities: pokemon.abilities && pokemon.abilities.join(", "),
        hiddenAbility: pokemon.hiddenAbility,
        weight: pokemon.weight,
        baseFriendship: pokemon.baseFriendship,
        hp: pokemon.baseStats && pokemon.baseStats.hp,
        atk: pokemon.baseStats && pokemon.baseStats.atk,
        def: pokemon.baseStats && pokemon.baseStats.def,
        spA: pokemon.baseStats && pokemon.baseStats.spA,
        spD: pokemon.baseStats && pokemon.baseStats.spD,
        spe: pokemon.baseStats && pokemon.baseStats.spe,
        spawnRate: pokemon.spawnRate,
        moves:
          pokemon.moves &&
          JSON.stringify(pokemon.moves)
            .split("],")
            .join("],\n")
            .split("{")
            .join("{\n")
            .split("},")
            .join("\n},\n")
            .split("}]")
            .join("\n}]"),
        evolutionDetails:
          pokemon.evolutionDetails &&
          JSON.stringify(pokemon.evolutionDetails)
            .split('",')
            .join('",\n')
            .split("{")
            .join("{\n")
            .split("},")
            .join("\n},\n")
            .split("}]")
            .join("\n}]"),
        id: match.params.id,
        eggGroups: pokemon.breeding && pokemon.breeding.eggGroups.join(", "),
        egg: pokemon.breeding && pokemon.breeding.egg,
        altEgg: pokemon.breeding && pokemon.breeding.altEgg,
        currentStage: pokemon.stages && pokemon.stages.current,
        maxStage: pokemon.stages && pokemon.stages.max,
        genderRatio: pokemon.genderRatio,
      });
  }, [pokemon]);

  const {
    name,
    sprite,
    shinySprite,
    firstType,
    secondType,
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

    console.log(formData);
    // TODO: removed for testing for now, readd
    // if (match.params.id > lastId) {
    //   updatePokemon(match.params.id, formData, false);
    //   window.location.reload();
    // } else updatePokemon(match.params.id, formData); // if we are editing an existing Pokemon
    // // if we edited the pokemon's id, load the page connected to its new id
    // let splitUrl = window.location.href.split("/");
    // if (id !== match.params.id) {
    //   splitUrl.pop();
    //   splitUrl.pop();
    //   window.open(splitUrl.join("/") + "/" + id + "/edit", "_self");
    // }
  };

  return !user || loading ? (
    <Spinner />
  ) : user.privileges !== "admin" ? (
    // if the user does not have "admin" privileges
    <AccessDenied />
  ) : isNaN(match.params.id) ||
    match.params.id > lastId + 1 ||
    match.params.id < 1 ||
    !pokemon ? (
    // if the page the user is trying to go to a Pokemon that does not exist
    <NotFound />
  ) : (
    <Fragment>
      {/* Link does not reload the page so I have to use <a> tags so I use these functions to determine which <a> tag to return depending on the page we're on */}
      <Grid container justify="space-evenly">
        <Grid item xs={3}>
          {/* If there is a previous pokemon, link to its page */}
          <Button
            color={`${match.params.id > 1 ? "secondary" : "default"}`}
            size="large"
            variant="contained"
            fullWidth
          >
            <a
              href={`/pokedex/${previousPokemonId}/edit`}
              style={{
                color: `${match.params.id > 1 ? "white" : "black"}`,
              }}
            >
              Previous Pokemon
            </a>
          </Button>
        </Grid>
        <Grid item xs={3}>
          {/* If there is a next pokemon, link to its page */}
          <Button
            color={`${match.params.id < lastId ? "secondary" : "default"}`}
            size="large"
            variant="contained"
            fullWidth
          >
            <a
              href={`/pokedex/${nextPokemonId}/edit`}
              style={{
                color: "white",
              }}
            >
              Next Pokemon
            </a>
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            color={`${match.params.id < lastId + 1 ? "secondary" : "default"}`}
            size="large"
            variant="contained"
            fullWidth
          >
            <a
              href={`/pokedex/${Math.floor(lastId) + 1}/edit`}
              style={{
                color: "white",
              }}
            >
              Add a New Pokemon
            </a>
          </Button>
        </Grid>
        <Grid item xs={1}>
          <a
            className="lead edit-link"
            href={`/pokedex/${
              match.params.id > lastId ? lastId : match.params.id
            }/`}
          >
            Cancel
          </a>
        </Grid>
      </Grid>
      <form onSubmit={(e) => onSubmit(e)}>
        {/* ID */}
        <TextField
          label="ID"
          name="id"
          type="number"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={id}
        />
        {/* Name */}
        <TextField
          label="Name"
          name="name"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={name}
        />
        {/* Weight in kg */}
        <TextField
          label="Weight (kg)"
          type="number"
          name="weight"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={weight}
        />
        {/* Base Friendship */}
        <TextField
          label="Base Friendship"
          type="number"
          name="baseFriendship"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={baseFriendship}
        />
        {/* Gender Ratio */}
        <TextField
          label="Gender Ratio"
          type="number"
          name="genderRatio"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={genderRatio}
        />
        {/* Spawn Rate */}
        <TextField
          label="Spawn Rate"
          type="number"
          name="spawnRate"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={spawnRate}
        />
        {/* Sprite */}
        <TextField
          label="Sprite URL"
          name="sprite"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={sprite}
          fullWidth
        />
        {/* Shiny Sprite */}
        <TextField
          label="Shiny Sprite URL"
          name="shinySprite"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={shinySprite}
          fullWidth
        />
        {/* Types */}
        <FormControl variant="outlined" margin="normal">
          <InputLabel id="first-type-label">First Type</InputLabel>
          <Select
            labelId="first-type-label"
            label="First Type"
            name="firstType"
            onChange={(e) => onChange(e)}
            value={firstType}
          >
            <MenuItem value=" ">None</MenuItem>
            <MenuItem value="Bug">Bug</MenuItem>
            <MenuItem value="Dark">Dark</MenuItem>
            <MenuItem value="Dragon">Dragon</MenuItem>
            <MenuItem value="Electric">Electric</MenuItem>
            <MenuItem value="Fairy">Fairy</MenuItem>
            <MenuItem value="Fighting">Fighting</MenuItem>
            <MenuItem value="Fire">Fire</MenuItem>
            <MenuItem value="Flying">Flying</MenuItem>
            <MenuItem value="Ghost">Ghost</MenuItem>
            <MenuItem value="Grass">Grass</MenuItem>
            <MenuItem value="Ground">Ground</MenuItem>
            <MenuItem value="Ice">Ice</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Poison">Poison</MenuItem>
            <MenuItem value="Psychic">Psychic</MenuItem>
            <MenuItem value="Rock">Rock</MenuItem>
            <MenuItem value="Steel">Steel</MenuItem>
            <MenuItem value="Water">Water</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" margin="normal">
          <InputLabel id="second-type-label">Second Type</InputLabel>
          <Select
            labelId="second-type-label"
            label="Second Type"
            name="secondType"
            onChange={(e) => onChange(e)}
            value={secondType}
          >
            <MenuItem value=" ">None</MenuItem>
            <MenuItem value="Bug">Bug</MenuItem>
            <MenuItem value="Dark">Dark</MenuItem>
            <MenuItem value="Dragon">Dragon</MenuItem>
            <MenuItem value="Electric">Electric</MenuItem>
            <MenuItem value="Fairy">Fairy</MenuItem>
            <MenuItem value="Fighting">Fighting</MenuItem>
            <MenuItem value="Fire">Fire</MenuItem>
            <MenuItem value="Flying">Flying</MenuItem>
            <MenuItem value="Ghost">Ghost</MenuItem>
            <MenuItem value="Grass">Grass</MenuItem>
            <MenuItem value="Ground">Ground</MenuItem>
            <MenuItem value="Ice">Ice</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="Poison">Poison</MenuItem>
            <MenuItem value="Psychic">Psychic</MenuItem>
            <MenuItem value="Rock">Rock</MenuItem>
            <MenuItem value="Steel">Steel</MenuItem>
            <MenuItem value="Water">Water</MenuItem>
          </Select>
        </FormControl>
        {/* Abilities */}
        <TextField
          label="Abilities"
          name="abilities"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={abilities}
        />
        {/* Hidden Ability */}
        <TextField
          label="Hidden Ability"
          name="hiddenAbility"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={hiddenAbility}
        />
        {/* Current Stage */}
        <TextField
          label="Current Stage"
          type="number"
          name="currentStage"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={currentStage}
        />
        {/* Max Stage */}
        <TextField
          label="Max Stage"
          type="number"
          name="maxStage"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={maxStage}
        />
        {/* Evolution Details */}
        <TextField
          label="Evolution Details"
          name="evolutionDetails"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={evolutionDetails}
          multiline
          rows={5}
          fullWidth
        />
        {/* Base Stats */}
        <TextField
          label="Base Health"
          type="number"
          name="hp"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={hp}
        />
        <TextField
          label="Base Attack"
          type="number"
          name="atk"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={atk}
        />
        <TextField
          label="Base Defense"
          type="number"
          name="def"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={def}
        />
        <TextField
          label="Base Special Attack"
          type="number"
          name="spA"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={spA}
        />
        <TextField
          label="Base Special Defense"
          type="number"
          name="spD"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={spD}
        />
        <TextField
          label="Base Speed"
          type="number"
          name="spe"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={spe}
        />
        {/* Egg Groups */}
        <TextField
          label="Egg Groups"
          name="eggGroups"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={eggGroups}
        />
        {/* Pokemon that hatches from the egg if it is a male */}
        <TextField
          label="Male Egg"
          name="egg"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={egg}
        />
        {/* Pokemon that hatches from the egg if it is a female */}
        <TextField
          label="Female Egg"
          name="altEgg"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={altEgg}
        />
        {/* Moves */}
        <TextField
          label="Moves"
          name="moves"
          onChange={(e) => onChange(e)}
          variant="outlined"
          margin="normal"
          value={moves}
          multiline
          rows={30}
          fullWidth
        />
        <Button color="primary" type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Fragment>
  );
};

EditPokemon.propTypes = {
  match: any.isRequired,
};
