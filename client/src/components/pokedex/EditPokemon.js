import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
  const {
    getPokemon,
    getPreviousPokemonId,
    getFormes,
    updatePokemon,
    pokemon,
    lastId,
    loading,
    formes,
    previousPokemonId,
  } = useContext(PokemonContext);

  const { user } = useContext(UserContext);

  const [previousId, setPreviousId] = useState();
  const [nextId, setNextId] = useState();
  const [formData, setFormData] = useState({
    name: "",
    sprite: "",
    shinySprite: "",
    firstType: " ",
    secondType: " ",
    firstAbility: "",
    secondAbility: "",
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
    firstEggGroup: " ",
    secondEggGroup: " ",
    egg: "",
    altEgg: "",
    currentStage: 0,
    maxStage: 0,
    genderRatio: 0,
  });

  useEffect(() => {
    getPokemon(match.params.id); // get the Pokemon with the matching id
    getFormes(match.params.id);
    if (match.params.id > 1) {
      getPreviousPokemonId(match.params.id);
    }
  }, [match.params.id]);

  useEffect(() => {
    if (pokemon) {
      // if we're editing an existing Pokemon
      setFormData({ ...getFormValues(pokemon), id: match.params.id });
    }
  }, [pokemon, match.params.id]);

  useEffect(() => {
    if (formes.length > 0 && formes[formes.length - 1].id > match.params.id) {
      setNextId(parseFloat(match.params.id) + 0.01);
    } else if (match.params.id < lastId) {
      setNextId(parseInt(match.params.id) + 1);
    } else {
      setNextId(match.params.id);
    }
  }, [formes, match.params.id, lastId]);

  useEffect(() => {
    if (parseFloat(match.params.id) !== Math.floor(match.params.id)) {
      setPreviousId(parseFloat(match.params.id) - 0.01);
    } else if (match.params.id > 1) {
      setPreviousId(previousPokemonId);
    } else {
      setPreviousId(1);
    }
  }, [previousPokemonId, match.params.id]);

  const {
    name,
    sprite,
    shinySprite,
    firstType,
    secondType,
    firstAbility,
    secondAbility,
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
    firstEggGroup,
    secondEggGroup,
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

    updatePokemon(match.params.id, convertFormDataToReqForUpdate(formData));
    // if we edited the pokemon's id, load the page connected to its new id
    if (id !== match.params.id) {
      let splitUrl = window.location.href.split("/");
      splitUrl[splitUrl.length - 2] = id;
      window.open(splitUrl.join("/"), "_self");
    }
  };

  return !user || loading || lastId === -1 ? (
    <Spinner />
  ) : user.privileges !== "admin" ? (
    // if the user does not have "admin" privileges
    <AccessDenied />
  ) : isNaN(match.params.id) ||
    match.params.id > Math.floor(lastId) + 1 ||
    match.params.id < 1 ? (
    // if the page the user is trying to go to a Pokemon that does not exist
    <NotFound />
  ) : (
    <Fragment>
      <Grid container justify="space-evenly">
        <Grid item xs={3}>
          {/* If there is a previous pokemon, link to its page */}
          <Button
            color={`${match.params.id > 1 ? "secondary" : "default"}`}
            size="large"
            variant="contained"
            fullWidth
          >
            <Link
              to={`/pokedex/${previousId}/edit`}
              style={{
                color: `${match.params.id > 1 ? "white" : "black"}`,
              }}
            >
              Previous Pokemon
            </Link>
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
            <Link
              to={`/pokedex/${nextId}/edit`}
              style={{
                color: `${match.params.id < lastId ? "white" : "black"}`,
              }}
            >
              Next Pokemon
            </Link>
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            color={`${
              match.params.id < Math.floor(lastId) + 1 ? "secondary" : "default"
            }`}
            size="large"
            variant="contained"
            fullWidth
          >
            <Link
              to={`/pokedex/${Math.floor(lastId) + 1}/edit`}
              style={{
                color: `${
                  match.params.id < Math.floor(lastId) + 1 ? "white" : "black"
                }`,
              }}
            >
              Add a New Pokemon
            </Link>
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Link
            className="lead edit-link"
            to={`/pokedex/${
              match.params.id > lastId ? lastId : match.params.id
            }`}
          >
            Cancel
          </Link>
        </Grid>
      </Grid>
      <br />
      <h1 className="large text-primary" style={{ textAlign: "center" }}>
        Editing Pokemon ID {match.params.id}
      </h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <Grid container justify="space-evenly" alignItems="flex-end">
          <Grid item>
            {/* ID */}
            <TextField
              label="ID"
              name="id"
              type="number"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={id}
              inputProps={{ step: 0.01 }}
            />
          </Grid>
          <Grid item>
            {/* Name */}
            <TextField
              label="Name"
              name="name"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={name}
            />
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
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
        <Grid container justify="space-evenly" alignItems="flex-end">
          <Grid item>
            {/* Abilities */}
            <TextField
              label="First Ability"
              name="firstAbility"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={firstAbility}
            />
            <TextField
              label="Second Ability"
              name="secondAbility"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={secondAbility}
            />
          </Grid>
          <Grid item>
            {/* Hidden Ability */}
            <TextField
              label="Hidden Ability"
              name="hiddenAbility"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={hiddenAbility}
            />
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
        {/* Base Stats */}
        <Grid
          container
          justify="space-evenly"
          alignItems="flex-end"
          spacing={1}
        >
          <Grid item xs={2}>
            <TextField
              label="Base Health"
              type="number"
              name="hp"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={hp}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Base Attack"
              type="number"
              name="atk"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={atk}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Base Defense"
              type="number"
              name="def"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={def}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Base Special Attack"
              type="number"
              name="spA"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={spA}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Base Special Defense"
              type="number"
              name="spD"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={spD}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Base Speed"
              type="number"
              name="spe"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={spe}
            />
          </Grid>
        </Grid>
        <Grid container justify="space-evenly" alignItems="flex-end">
          <Grid item>
            {/* Egg Groups */}
            <FormControl variant="outlined" margin="normal">
              <InputLabel id="first-egg-group-label">
                First Egg Group
              </InputLabel>
              <Select
                labelId="first-egg-group-label"
                label="First Egg Group"
                name="firstEggGroup"
                onChange={(e) => onChange(e)}
                value={firstEggGroup}
              >
                <MenuItem value=" ">None</MenuItem>
                <MenuItem value="Amorphous">Amorphous</MenuItem>
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="Ditto">Ditto</MenuItem>
                <MenuItem value="Dragon">Dragon</MenuItem>
                <MenuItem value="Fairy">Fairy</MenuItem>
                <MenuItem value="Field">Field</MenuItem>
                <MenuItem value="Flying">Flying</MenuItem>
                <MenuItem value="Grass">Grass</MenuItem>
                <MenuItem value="Human-Like">Human-Like</MenuItem>
                <MenuItem value="Legendary">Legendary</MenuItem>
                <MenuItem value="Mineral">Mineral</MenuItem>
                <MenuItem value="Monster">Monster</MenuItem>
                <MenuItem value="Unown">Unown</MenuItem>
                <MenuItem value="Water 1">Water 1</MenuItem>
                <MenuItem value="Water 2">Water 2</MenuItem>
                <MenuItem value="Water 3">Water 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" margin="normal">
              <InputLabel id="second-egg-group-label">
                Second Egg Group
              </InputLabel>
              <Select
                labelId="second-egg-group-label"
                label="Second Egg Group"
                name="secondEggGroup"
                onChange={(e) => onChange(e)}
                value={secondEggGroup}
              >
                <MenuItem value=" ">None</MenuItem>
                <MenuItem value="Amorphous">Amorphous</MenuItem>
                <MenuItem value="Bug">Bug</MenuItem>
                <MenuItem value="Ditto">Ditto</MenuItem>
                <MenuItem value="Dragon">Dragon</MenuItem>
                <MenuItem value="Fairy">Fairy</MenuItem>
                <MenuItem value="Field">Field</MenuItem>
                <MenuItem value="Flying">Flying</MenuItem>
                <MenuItem value="Grass">Grass</MenuItem>
                <MenuItem value="Human-Like">Human-Like</MenuItem>
                <MenuItem value="Legendary">Legendary</MenuItem>
                <MenuItem value="Mineral">Mineral</MenuItem>
                <MenuItem value="Monster">Monster</MenuItem>
                <MenuItem value="Unown">Unown</MenuItem>
                <MenuItem value="Water 1">Water 1</MenuItem>
                <MenuItem value="Water 2">Water 2</MenuItem>
                <MenuItem value="Water 3">Water 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            {/* Pokemon that hatches from the egg if it is a male */}
            <TextField
              label="Male Egg"
              name="egg"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={egg}
            />
          </Grid>
          <Grid item>
            {/* Pokemon that hatches from the egg if it is a female */}
            <TextField
              label="Female Egg"
              name="altEgg"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={altEgg}
            />
          </Grid>
        </Grid>
        <Grid container justify="space-evenly" alignItems="flex-end">
          <Grid item>
            {/* Weight in kg */}
            <TextField
              label="Weight (kg)"
              type="number"
              name="weight"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={weight}
              inputProps={{ step: 0.01 }}
            />
          </Grid>
          <Grid item>
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
          </Grid>
          <Grid item>
            {/* Gender Ratio */}
            <TextField
              label="Gender Ratio"
              type="number"
              name="genderRatio"
              onChange={(e) => onChange(e)}
              variant="outlined"
              margin="normal"
              value={genderRatio}
              inputProps={{ step: 0.01 }}
            />
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
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
        <Grid container justify="center">
          <Button color="primary" type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </form>
    </Fragment>
  );
};

EditPokemon.propTypes = {
  match: any.isRequired,
};

const getFormValues = (pokemon) => {
  return {
    name: pokemon.name ? pokemon.name : "",
    sprite: pokemon.sprite ? pokemon.sprite : "",
    shinySprite: pokemon.shinySprite ? pokemon.shinySprite : "",
    firstType:
      pokemon.types && pokemon.types.length > 0 && pokemon.types[0] !== ""
        ? pokemon.types[0]
        : " ",
    secondType:
      pokemon.types && pokemon.types.length > 1 && pokemon.types[1] !== ""
        ? pokemon.types[1]
        : " ",
    firstAbility:
      pokemon.abilities &&
      pokemon.abilities.length > 0 &&
      pokemon.abilities[0] !== ""
        ? pokemon.abilities[0]
        : "",
    secondAbility:
      pokemon.abilities &&
      pokemon.abilities.length > 1 &&
      pokemon.abilities[1] !== ""
        ? pokemon.abilities[1]
        : "",
    hiddenAbility: pokemon.hiddenAbility ? pokemon.hiddenAbility : "",
    weight: pokemon.weight ? pokemon.weight : 0,
    baseFriendship: pokemon.baseFriendship ? pokemon.baseFriendship : 0,
    hp: pokemon.baseStats ? pokemon.baseStats.hp : 0,
    atk: pokemon.baseStats ? pokemon.baseStats.atk : 0,
    def: pokemon.baseStats ? pokemon.baseStats.def : 0,
    spA: pokemon.baseStats ? pokemon.baseStats.spA : 0,
    spD: pokemon.baseStats ? pokemon.baseStats.spD : 0,
    spe: pokemon.baseStats ? pokemon.baseStats.spe : 0,
    spawnRate: pokemon.spawnRate ? pokemon.spawnRate : 0,
    moves: pokemon.moves
      ? JSON.stringify(pokemon.moves)
          .split("],")
          .join("],\n")
          .split("{")
          .join("{\n")
          .split("},")
          .join("\n},\n")
          .split("}]")
          .join("\n}]")
      : "[]",
    evolutionDetails: pokemon.evolutionDetails
      ? JSON.stringify(pokemon.evolutionDetails)
          .split('",')
          .join('",\n')
          .split("{")
          .join("{\n")
          .split("},")
          .join("\n},\n")
          .split("}]")
          .join("\n}]")
      : "[]",
    firstEggGroup:
      pokemon.breeding &&
      pokemon.breeding.eggGroups.length > 0 &&
      pokemon.breeding.eggGroups[0] !== ""
        ? pokemon.breeding.eggGroups[0]
        : " ",
    secondEggGroup:
      pokemon.breeding &&
      pokemon.breeding.eggGroups.length > 1 &&
      pokemon.breeding.eggGroups[1] !== ""
        ? pokemon.breeding.eggGroups[1]
        : " ",
    egg: pokemon.breeding ? pokemon.breeding.egg : "",
    altEgg: pokemon.breeding ? pokemon.breeding.altEgg : "",
    currentStage: pokemon.stages ? pokemon.stages.current : 0,
    maxStage: pokemon.stages ? pokemon.stages.max : 0,
    genderRatio: pokemon.genderRatio ? pokemon.genderRatio : 0,
  };
};

const convertFormDataToReqForUpdate = (data) => {
  // translate the data into an object that can be passed into the database
  let types = [];
  if (data.firstType !== " ") {
    types.push(data.firstType);
  }
  if (data.secondType !== " ") {
    types.push(data.secondType);
  }

  let abilities = [];
  if (data.firstAbility !== "") {
    abilities.push(data.firstAbility);
  }
  if (data.secondAbility !== "") {
    abilities.push(data.secondAbility);
  }

  let eggGroups = [];
  if (data.firstEggGroup !== " ") {
    eggGroups.push(data.firstEggGroup);
  }
  if (data.secondEggGroup !== " ") {
    eggGroups.push(data.secondEggGroup);
  }

  let realData = {
    name: data.name,
    sprite: data.sprite,
    shinySprite: data.shinySprite,
    types,
    abilities,
    hiddenAbility: data.hiddenAbility,
    weight: data.weight,
    baseFriendship: data.baseFriendship,
    baseStats: {
      hp: parseInt(data.hp),
      atk: parseInt(data.atk),
      def: parseInt(data.def),
      spA: parseInt(data.spA),
      spD: parseInt(data.spD),
      spe: parseInt(data.spe),
    },
    spawnRate: data.spawnRate,
    moves: JSON.parse(data.moves),
    id: data.id,
    breeding: {
      eggGroups,
      egg: data.egg,
      altEgg: data.altEgg,
    },
    stages: {
      current: parseInt(data.currentStage),
      max: parseInt(data.maxStage),
    },
    genderRatio: data.genderRatio,
    evolutionDetails: JSON.parse(data.evolutionDetails),
  };

  // make sure there are no duplicate moves (adding the duplicates' learn conditions to the original) and no duplicate learn conditions for each move
  let moves = [];
  let conditions = [];
  let uniqueMoves = [];
  for (let i = 0; i < realData.moves.length; i++) {
    if (!moves.includes(realData.moves[i].name)) {
      moves.push(realData.moves[i].name);
      conditions.push(realData.moves[i].learnConditions);
    } else {
      for (let j = 0; j < realData.moves[i].learnConditions.length; j++) {
        if (
          !conditions[moves.indexOf(realData.moves[i].name)].includes(
            realData.moves[i].learnConditions[j]
          )
        ) {
          conditions[moves.indexOf(realData.moves[i].name)].push(
            realData.moves[i].learnConditions[j]
          );
        }
      }
    }
  }
  for (let i = 0; i < moves.length; i++) {
    let moveObj = {
      learnConditions: conditions[i],
      name: moves[i],
    };
    uniqueMoves.push(moveObj);
  }

  realData.moves = uniqueMoves;

  return realData;
};
