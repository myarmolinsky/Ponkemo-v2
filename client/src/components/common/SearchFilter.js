import React, { Fragment, useState, useEffect } from "react";
import { array, func, bool } from "prop-types";
import {
  Button,
  Select,
  MenuItem,
  Grid,
  TextField,
  Divider,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { useStyles } from "../styles";

export const SearchFilter = ({
  pokedex,
  setFilteredDex,
  ownedPokemon,
  setFilteredOwnedPokemon,
  showBothTypes,
  showBothEggGroups,
}) => {
  const classes = useStyles();

  const [dexSearchData, setSearchData] = useState({
    search: "",
    firstType: " ",
    secondType: " ",
    ability: "",
    firstEggGroup: " ",
    secondEggGroup: " ",
    baseHealthGreater: 0,
    baseHealthLess: 256,
    baseAttackGreater: 0,
    baseAttackLess: 256,
    baseDefenseGreater: 0,
    baseDefenseLess: 256,
    baseSpAttackGreater: 0,
    baseSpAttackLess: 256,
    baseSpDefenseGreater: 0,
    baseSpDefenseLess: 256,
    baseSpeedGreater: 0,
    baseSpeedLess: 256,
    healthGreater: 0,
    healthLess: 1000,
    attackGreater: 0,
    attackLess: 1000,
    defenseGreater: 0,
    defenseLess: 1000,
    spAttackGreater: 0,
    spAttackLess: 1000,
    spDefenseGreater: 0,
    spDefenseLess: 1000,
    speedGreater: 0,
    speedLess: 1000,
    levelGreater: 0,
    levelLess: 101,
    friendshipGreater: 0,
    friendshipLess: 256,
    gender: " ",
    nature: " ",
    healthIvGreater: -1,
    healthIvLess: 32,
    attackIvGreater: -1,
    attackIvLess: 32,
    defenseIvGreater: -1,
    defenseIvLess: 32,
    spAttackIvGreater: -1,
    spAttackIvLess: 32,
    spDefenseIvGreater: -1,
    spDefenseIvLess: 32,
    speedIvGreater: -1,
    speedIvLess: 32,
  });
  const [filteredIndexes, setFilteredIndexes] = useState([]);
  const [expandSearchOptions, setExpandSearchOptions] = useState(false);
  const [moreExpandSearchOptions, setMoreExpandSearchOptions] = useState(false);

  const {
    search,
    firstType,
    secondType,
    ability,
    firstEggGroup,
    secondEggGroup,
    baseHealthGreater,
    baseHealthLess,
    baseAttackGreater,
    baseAttackLess,
    baseDefenseGreater,
    baseDefenseLess,
    baseSpAttackGreater,
    baseSpAttackLess,
    baseSpDefenseGreater,
    baseSpDefenseLess,
    baseSpeedGreater,
    baseSpeedLess,
    healthGreater,
    healthLess,
    attackGreater,
    attackLess,
    defenseGreater,
    defenseLess,
    spAttackGreater,
    spAttackLess,
    spDefenseGreater,
    spDefenseLess,
    speedGreater,
    speedLess,
    levelGreater,
    levelLess,
    friendshipGreater,
    friendshipLess,
    gender,
    nature,
    healthIvGreater,
    healthIvLess,
    attackIvGreater,
    attackIvLess,
    defenseIvGreater,
    defenseIvLess,
    spAttackIvGreater,
    spAttackIvLess,
    spDefenseIvGreater,
    spDefenseIvLess,
    speedIvGreater,
    speedIvLess,
  } = dexSearchData;

  const onChange = (e) => {
    setSearchData({ ...dexSearchData, [e.target.name]: e.target.value });
  };

  const determinePokemonAbility = (abilityRoll, abilities) => {
    if (abilityRoll === 0) {
      if (abilities.length > 2) {
        return abilities[2];
      }
    } else {
      if (abilityRoll > 75 && abilities.length > 1) {
        return abilities[1];
      }
    }
    return abilities[0];
  };

  useEffect(() => {
    setFilteredDex(
      pokedex.filter((pokemon, index) => !filteredIndexes.includes(index))
    );
    ownedPokemon &&
      setFilteredOwnedPokemon(
        ownedPokemon.filter(
          (pokemon, index) => !filteredIndexes.includes(index)
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredIndexes, ownedPokemon]);

  useEffect(() => {
    let indexes = [];
    pokedex.forEach((pokemon, index) => {
      if (
        !checkSearchPokemonInfo(
          pokemon,
          dexSearchData,
          ownedPokemon ? true : false
        )
      ) {
        indexes.push(index);
      }
    });
    if (ownedPokemon) {
      ownedPokemon.forEach((pokemon, index) => {
        if (!indexes.includes(index)) {
          let abilities;
          let poke = pokedex.filter((poke) => poke.id === pokemon.id)[0];
          if (poke) {
            abilities = poke.abilities;
            if (poke.hiddenAbility !== "") {
              abilities.push(poke.hiddenAbility);
            }
            if (
              !checkSearchPokemon(
                pokemon,
                dexSearchData,
                determinePokemonAbility(pokemon.ability, abilities)
              )
            ) {
              indexes.push(index);
            }
          }
        }
      });
    }
    setFilteredIndexes(indexes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dexSearchData, pokedex, ownedPokemon]);

  const toggleSearchOptions = (e) => {
    e.preventDefault();
    if (expandSearchOptions) {
      setMoreExpandSearchOptions(false);
    }
    setExpandSearchOptions(!expandSearchOptions);
  };

  const toggleMoreSearchOptions = (e) => {
    e.preventDefault();
    setMoreExpandSearchOptions(!moreExpandSearchOptions);
  };

  const clearSearch = () => {
    setSearchData({
      search: "",
      firstType: " ",
      secondType: " ",
      ability: "",
      firstEggGroup: " ",
      secondEggGroup: " ",
      baseHealthGreater: 0,
      baseHealthLess: 256,
      baseAttackGreater: 0,
      baseAttackLess: 256,
      baseDefenseGreater: 0,
      baseDefenseLess: 256,
      baseSpAttackGreater: 0,
      baseSpAttackLess: 256,
      baseSpDefenseGreater: 0,
      baseSpDefenseLess: 256,
      baseSpeedGreater: 0,
      baseSpeedLess: 256,
      healthGreater: 0,
      healthLess: 1000,
      attackGreater: 0,
      attackLess: 1000,
      defenseGreater: 0,
      defenseLess: 1000,
      spAttackGreater: 0,
      spAttackLess: 1000,
      spDefenseGreater: 0,
      spDefenseLess: 1000,
      speedGreater: 0,
      speedLess: 1000,
      levelGreater: 0,
      levelLess: 100,
      friendshipGreater: 0,
      friendshipLess: 255,
      gender: " ",
      nature: " ",
    });
  };

  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        placeholder="Search for a Pokemon"
        name="search"
        onChange={(e) => onChange(e)}
        value={search}
      />
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => toggleSearchOptions(e)}
          >
            {expandSearchOptions ? "Hide" : "Show"} Advanced Search Options
          </Button>
        </Grid>
        {expandSearchOptions && ownedPokemon && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => toggleMoreSearchOptions(e)}
            >
              {moreExpandSearchOptions ? "Less" : "More"} Options
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button
            onClick={() => clearSearch()}
            variant="contained"
            color="secondary"
          >
            Clear Search
          </Button>
        </Grid>
      </Grid>
      {expandSearchOptions && (
        <Fragment>
          <Grid
            container
            justify="space-evenly"
            alignItems="flex-end"
            spacing={1}
          >
            <Grid item xs={showBothTypes ? 2 : 4}>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="first-type-label">Type</InputLabel>
                <Select
                  labelId="first-type-label"
                  label="Type"
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
            </Grid>
            {showBothTypes && (
              <Grid item xs={2}>
                <FormControl variant="outlined" margin="normal" fullWidth>
                  <InputLabel id="second-type-label">Type</InputLabel>
                  <Select
                    labelId="second-type-label"
                    label="Type"
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
            )}
            <Grid item xs={4}>
              <TextField
                label="Ability"
                variant="outlined"
                onChange={(e) => onChange(e)}
                placeholder="Search for an ability"
                name="ability"
                value={ability}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={showBothEggGroups ? 2 : 4}>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="first-egg-group-label">Egg Group</InputLabel>
                <Select
                  labelId="first-egg-group-label"
                  label="Egg Group"
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
            </Grid>
            {showBothEggGroups && (
              <Grid item xs={2}>
                <FormControl variant="outlined" margin="normal" fullWidth>
                  <InputLabel id="second-egg-group-label">Egg Group</InputLabel>
                  <Select
                    labelId="second-egg-group-label"
                    label="Egg Group"
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
            )}
          </Grid>
          <Grid
            container
            justify="space-evenly"
            alignItems="flex-end"
            spacing={1}
          >
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base HP >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseHealthGreater"
                onChange={(e) => onChange(e)}
                value={baseHealthGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base HP <"
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseHealthLess"
                onChange={(e) => onChange(e)}
                value={baseHealthLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Attack >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseAttackGreater"
                onChange={(e) => onChange(e)}
                value={baseAttackGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Attack <"
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseAttackLess"
                onChange={(e) => onChange(e)}
                value={baseAttackLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Defense >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseDefenseGreater"
                onChange={(e) => onChange(e)}
                value={baseDefenseGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Defense <"
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseDefenseLess"
                onChange={(e) => onChange(e)}
                value={baseDefenseLess}
              />
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-evenly"
            alignItems="flex-end"
            spacing={1}
          >
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Special Attack >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseSpAttackGreater"
                onChange={(e) => onChange(e)}
                value={baseSpAttackGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Special Attack <"
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseSpAttackLess"
                onChange={(e) => onChange(e)}
                value={baseSpAttackLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Special Defense >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseSpDefenseGreater"
                onChange={(e) => onChange(e)}
                value={baseSpDefenseGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Special Defense <"
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseSpDefenseLess"
                onChange={(e) => onChange(e)}
                value={baseSpDefenseLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Speed >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseSpeedGreater"
                onChange={(e) => onChange(e)}
                value={baseSpeedGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Base Speed <"
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseSpeedLess"
                onChange={(e) => onChange(e)}
                value={baseSpeedLess}
              />
            </Grid>
          </Grid>
        </Fragment>
      )}
      <Divider className={classes.divider} />
      {moreExpandSearchOptions && (
        <>
          <Grid
            container
            justify="space-evenly"
            alignItems="flex-end"
            spacing={1}
          >
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="HP >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="healthGreater"
                onChange={(e) => onChange(e)}
                value={healthGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="HP <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="healthLess"
                onChange={(e) => onChange(e)}
                value={healthLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Attack >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="attackGreater"
                onChange={(e) => onChange(e)}
                value={attackGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Attack <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="attackLess"
                onChange={(e) => onChange(e)}
                value={attackLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Defense >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="defenseGreater"
                onChange={(e) => onChange(e)}
                value={defenseGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Defense <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="defenseLess"
                onChange={(e) => onChange(e)}
                value={defenseLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Special Attack >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="spAttackGreater"
                onChange={(e) => onChange(e)}
                value={spAttackGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Special Attack <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="spAttackLess"
                onChange={(e) => onChange(e)}
                value={spAttackLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Special Defense >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="spDefenseGreater"
                onChange={(e) => onChange(e)}
                value={spDefenseGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Special Defense <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="spDefenseLess"
                onChange={(e) => onChange(e)}
                value={spDefenseLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Speed >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="speedGreater"
                onChange={(e) => onChange(e)}
                value={speedGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Speed <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="speedLess"
                onChange={(e) => onChange(e)}
                value={speedLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Level >"
                type="number"
                variant="outlined"
                placeholder="1"
                name="levelGreater"
                onChange={(e) => onChange(e)}
                value={levelGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Level <"
                type="number"
                variant="outlined"
                placeholder="100"
                name="levelLess"
                onChange={(e) => onChange(e)}
                value={levelLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Friendship >"
                type="number"
                variant="outlined"
                placeholder="1"
                name="friendshipGreater"
                onChange={(e) => onChange(e)}
                value={friendshipGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Friendship <"
                type="number"
                variant="outlined"
                placeholder="100"
                name="friendshipLess"
                onChange={(e) => onChange(e)}
                value={friendshipLess}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  label="Gender"
                  name="gender"
                  onChange={(e) => onChange(e)}
                  value={gender}
                >
                  <MenuItem value=" ">None</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Genderless">Genderless</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel id="nature-label">Nature</InputLabel>
                <Select
                  labelId="nature-label"
                  label="Nature"
                  name="nature"
                  onChange={(e) => onChange(e)}
                  value={nature}
                >
                  <MenuItem value=" ">None</MenuItem>
                  <MenuItem value="Hardy">Hardy</MenuItem>
                  <MenuItem value="Lonely">Lonely</MenuItem>
                  <MenuItem value="Brave">Brave</MenuItem>
                  <MenuItem value="Adamant">Adamant</MenuItem>
                  <MenuItem value="Naughty">Naughty</MenuItem>
                  <MenuItem value="Bold">Bold</MenuItem>
                  <MenuItem value="Dovile">Dovile</MenuItem>
                  <MenuItem value="Relaxed">Relaxed</MenuItem>
                  <MenuItem value="Impish">Impish</MenuItem>
                  <MenuItem value="Lax">Lax</MenuItem>
                  <MenuItem value="Timid">Timid</MenuItem>
                  <MenuItem value="Hasty">Hasty</MenuItem>
                  <MenuItem value="Serious">Serious</MenuItem>
                  <MenuItem value="Jolly">Jolly</MenuItem>
                  <MenuItem value="Naive">Naive</MenuItem>
                  <MenuItem value="Modest">Modest</MenuItem>
                  <MenuItem value="Mild">Mild</MenuItem>
                  <MenuItem value="Quiet">Quiet</MenuItem>
                  <MenuItem value="Bashful">Bashful</MenuItem>
                  <MenuItem value="Rash">Rash</MenuItem>
                  <MenuItem value="Calm">Calm</MenuItem>
                  <MenuItem value="Gentle">Gentle</MenuItem>
                  <MenuItem value="Sassy">Sassy</MenuItem>
                  <MenuItem value="Careful">Careful</MenuItem>
                  <MenuItem value="Quirky">Quirky</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="HP IV >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="healthIvGreater"
                onChange={(e) => onChange(e)}
                value={healthIvGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="HP IV <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="healthIvLess"
                onChange={(e) => onChange(e)}
                value={healthIvLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Attack IV >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="attackIvGreater"
                onChange={(e) => onChange(e)}
                value={attackIvGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Attack IV <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="attackIvLess"
                onChange={(e) => onChange(e)}
                value={attackIvLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Defense IV >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="defenseIvGreater"
                onChange={(e) => onChange(e)}
                value={defenseIvGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Defense IV <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="defenseIvLess"
                onChange={(e) => onChange(e)}
                value={defenseIvLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Special Attack IV >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="spAttackIvGreater"
                onChange={(e) => onChange(e)}
                value={spAttackIvGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Special Attack IV <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="spAttackIvLess"
                onChange={(e) => onChange(e)}
                value={spAttackIvLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Special Defense IV >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="spDefenseIvGreater"
                onChange={(e) => onChange(e)}
                value={spDefenseIvGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Special Defense IV <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="spDefenseIvLess"
                onChange={(e) => onChange(e)}
                value={spDefenseIvLess}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Speed IV >"
                type="number"
                variant="outlined"
                placeholder="0"
                name="speedIvGreater"
                onChange={(e) => onChange(e)}
                value={speedIvGreater}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                margin="normal"
                label="Speed IV <"
                type="number"
                variant="outlined"
                placeholder="1000"
                name="speedIvLess"
                onChange={(e) => onChange(e)}
                value={speedIvLess}
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
        </>
      )}
    </>
  );
};

SearchFilter.propTypes = {
  pokedex: array.isRequired,
  setFilteredDex: func.isRequired,
  ownedPokemon: array,
  setFilteredOwnedPokemon: func,
  showBothTypes: bool,
  showBothEggGroups: bool,
};

SearchFilter.defaultProps = {
  ownedPokemon: null,
  setFilteredOwnedPokemon: () => {},
  showBothTypes: true,
  showBothEggGroups: true,
};

const checkSearchPokemonInfo = (pokemon, data, passedOwnedPokemon = false) => {
  const {
    search,
    firstType,
    secondType,
    ability,
    firstEggGroup,
    secondEggGroup,
    baseHealthGreater,
    baseHealthLess,
    baseAttackGreater,
    baseAttackLess,
    baseDefenseGreater,
    baseDefenseLess,
    baseSpAttackGreater,
    baseSpAttackLess,
    baseSpDefenseGreater,
    baseSpDefenseLess,
    baseSpeedGreater,
    baseSpeedLess,
  } = data;

  if (!passedOwnedPokemon) {
    if (!pokemon.name.toUpperCase().includes(search.toUpperCase())) {
      return false;
    }
  }

  if (firstType !== " ") {
    if (!pokemon.types.includes(firstType)) {
      return false;
    }
  }
  if (secondType !== " ") {
    if (!pokemon.types.includes(secondType)) {
      return false;
    }
  }

  if (!passedOwnedPokemon) {
    if (!pokemon.hiddenAbility.toUpperCase().includes(ability.toUpperCase())) {
      if (!pokemon.abilities[0].toUpperCase().includes(ability.toUpperCase())) {
        if (pokemon.abilities.length > 1) {
          if (
            !pokemon.abilities[1].toUpperCase().includes(ability.toUpperCase())
          ) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }

  if (firstEggGroup !== " ") {
    if (!pokemon.breeding.eggGroups.includes(firstEggGroup)) {
      return false;
    }
  }
  if (secondEggGroup !== " ") {
    if (!pokemon.breeding.eggGroups.includes(secondEggGroup)) {
      return false;
    }
  }

  let hpGreater,
    atkGreater,
    defGreater,
    spaGreater,
    spdGreater,
    speGreater = 0;

  let hpLess,
    atkLess,
    defLess,
    spaLess,
    spdLess,
    speLess = 256;

  if (baseHealthGreater !== "") {
    hpGreater = baseHealthGreater;
  }
  if (baseHealthLess !== "") {
    hpLess = baseHealthLess;
  }
  if (pokemon.baseStats.hp <= hpGreater || pokemon.baseStats.hp >= hpLess) {
    return false;
  }
  if (baseAttackGreater !== "") {
    atkGreater = baseAttackGreater;
  }
  if (baseAttackLess !== "") {
    atkLess = baseAttackLess;
  }
  if (pokemon.baseStats.atk <= atkGreater || pokemon.baseStats.atk >= atkLess) {
    return false;
  }
  if (baseDefenseGreater !== "") {
    defGreater = baseDefenseGreater;
  }
  if (baseDefenseLess !== "") {
    defLess = baseDefenseLess;
  }
  if (pokemon.baseStats.def <= defGreater || pokemon.baseStats.def >= defLess) {
    return false;
  }
  if (baseSpAttackGreater !== "") {
    spaGreater = baseSpAttackGreater;
  }
  if (baseSpAttackLess !== "") {
    spaLess = baseSpAttackLess;
  }
  if (pokemon.baseStats.spA <= spaGreater || pokemon.baseStats.spA >= spaLess) {
    return false;
  }
  if (baseSpDefenseGreater !== "") {
    spdGreater = baseSpDefenseGreater;
  }
  if (baseSpDefenseLess !== "") {
    spdLess = baseSpDefenseLess;
  }
  if (pokemon.baseStats.spD <= spdGreater || pokemon.baseStats.spD >= spdLess) {
    return false;
  }
  if (baseSpeedGreater !== "") {
    speGreater = baseSpeedGreater;
  }
  if (baseSpeedLess !== "") {
    speLess = baseSpeedLess;
  }
  if (pokemon.baseStats.spe <= speGreater || pokemon.baseStats.spe >= speLess) {
    return false;
  }
  return true;
};

const checkSearchPokemon = (pokemon, data, determinedAbility) => {
  const {
    search,
    healthGreater,
    healthLess,
    attackGreater,
    attackLess,
    defenseGreater,
    defenseLess,
    spAttackGreater,
    spAttackLess,
    spDefenseGreater,
    spDefenseLess,
    speedGreater,
    speedLess,
    ability,
    levelGreater,
    levelLess,
    friendshipGreater,
    friendshipLess,
    gender,
    nature,
    healthIvGreater,
    healthIvLess,
    attackIvGreater,
    attackIvLess,
    defenseIvGreater,
    defenseIvLess,
    spAttackIvGreater,
    spAttackIvLess,
    spDefenseIvGreater,
    spDefenseIvLess,
    speedIvGreater,
    speedIvLess,
  } = data;

  if (!pokemon.nickname.toUpperCase().includes(search.toUpperCase())) {
    return false;
  }

  let hpGreater,
    atkGreater,
    defGreater,
    spaGreater,
    spdGreater,
    speGreater,
    lvlGreater,
    fsGreater = 0;

  let hpLess,
    atkLess,
    defLess,
    spaLess,
    spdLess,
    speLess,
    lvlLess,
    fsLess = 1000;

  if (healthGreater !== "") {
    hpGreater = healthGreater;
  }
  if (healthLess !== "") {
    hpLess = healthLess;
  }
  if (pokemon.stats.hp <= hpGreater || pokemon.stats.hp >= hpLess) {
    return false;
  }
  if (attackGreater !== "") {
    atkGreater = attackGreater;
  }
  if (attackLess !== "") {
    atkLess = attackLess;
  }
  if (pokemon.stats.atk <= atkGreater || pokemon.stats.atk >= atkLess) {
    return false;
  }
  if (defenseGreater !== "") {
    defGreater = defenseGreater;
  }
  if (defenseLess !== "") {
    defLess = defenseLess;
  }
  if (pokemon.stats.def <= defGreater || pokemon.stats.def >= defLess) {
    return false;
  }
  if (spAttackGreater !== "") {
    spaGreater = spAttackGreater;
  }
  if (spAttackLess !== "") {
    spaLess = spAttackLess;
  }
  if (pokemon.stats.spA <= spaGreater || pokemon.stats.spA >= spaLess) {
    return false;
  }
  if (spDefenseGreater !== "") {
    spdGreater = spDefenseGreater;
  }
  if (spDefenseLess !== "") {
    spdLess = spDefenseLess;
  }
  if (pokemon.stats.spD <= spdGreater || pokemon.stats.spD >= spdLess) {
    return false;
  }
  if (speedGreater !== "") {
    speGreater = speedGreater;
  }
  if (speedLess !== "") {
    speLess = speedLess;
  }
  if (pokemon.stats.spe <= speGreater || pokemon.stats.spe >= speLess) {
    return false;
  }
  if (!determinedAbility.toUpperCase().includes(ability.toUpperCase())) {
    return false;
  }
  if (levelGreater !== "") {
    lvlGreater = levelGreater;
  }
  if (levelLess !== "") {
    lvlLess = levelLess;
  }
  if (pokemon.level <= lvlGreater || pokemon.level >= lvlLess) {
    return false;
  }
  if (friendshipGreater !== "") {
    fsGreater = friendshipGreater;
  }
  if (friendshipLess !== "") {
    fsLess = friendshipLess;
  }
  if (pokemon.friendship <= fsGreater || pokemon.friendship >= fsLess) {
    return false;
  }
  if (gender !== " ") {
    if (!pokemon.gender.includes(gender)) {
      return false;
    }
  }
  if (nature !== " ") {
    if (!pokemon.nature.includes(nature)) {
      return false;
    }
  }
  let hpIvGreater,
    atkIvGreater,
    defIvGreater,
    spaIvGreater,
    spdIvGreater,
    speIvGreater = -1;

  let hpIvLess,
    atkIvLess,
    defIvLess,
    spaIvLess,
    spdIvLess,
    speIvLess = 32;

  if (healthIvGreater !== "") {
    hpIvGreater = healthIvGreater;
  }
  if (healthIvLess !== "") {
    hpLess = healthIvLess;
  }
  if (pokemon.ivs.hp <= hpIvGreater || pokemon.ivs.hp >= hpIvLess) {
    return false;
  }
  if (attackIvGreater !== "") {
    atkIvGreater = attackIvGreater;
  }
  if (attackIvLess !== "") {
    atkIvLess = attackIvLess;
  }
  if (pokemon.ivs.atk <= atkIvGreater || pokemon.ivs.atk >= atkIvLess) {
    return false;
  }
  if (defenseIvGreater !== "") {
    defIvGreater = defenseIvGreater;
  }
  if (defenseIvLess !== "") {
    defIvLess = defenseIvLess;
  }
  if (pokemon.ivs.def <= defIvGreater || pokemon.ivs.def >= defIvLess) {
    return false;
  }
  if (spAttackIvGreater !== "") {
    spaIvGreater = spAttackIvGreater;
  }
  if (spAttackIvLess !== "") {
    spaIvLess = spAttackIvLess;
  }
  if (pokemon.ivs.spA <= spaIvGreater || pokemon.ivs.spA >= spaIvLess) {
    return false;
  }
  if (spDefenseIvGreater !== "") {
    spdIvGreater = spDefenseIvGreater;
  }
  if (spDefenseIvLess !== "") {
    spdIvLess = spDefenseIvLess;
  }
  if (pokemon.ivs.spD <= spdIvGreater || pokemon.ivs.spD >= spdIvLess) {
    return false;
  }
  if (speedIvGreater !== "") {
    speIvGreater = speedIvGreater;
  }
  if (speedIvLess !== "") {
    speIvLess = speedIvLess;
  }
  if (pokemon.ivs.spe <= speIvGreater || pokemon.ivs.spe >= speIvLess) {
    return false;
  }
  return true;
};
