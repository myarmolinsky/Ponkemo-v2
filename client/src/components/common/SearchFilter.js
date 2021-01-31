import React, { Fragment, useState, useEffect } from "react";
import { array, func, bool } from "prop-types";
import {
  Button,
  Select,
  MenuItem,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";
import { useStyles } from "../styles";

export const SearchFilter = ({
  pokedex,
  setFilteredPokedex,
  showBothTypes,
  showBothEggGroups,
}) => {
  const classes = useStyles();

  const [searchData, setSearchData] = useState({
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
  });

  const [expandSearchOptions, setExpandSearchOptions] = useState(false);

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
  } = searchData;

  const onChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setFilteredPokedex(
      pokedex.filter((pokemon) => checkSearchPokemon(pokemon, searchData))
    );
  }, [searchData, pokedex]);

  const toggleSearchOptions = (e) => {
    e.preventDefault();
    setExpandSearchOptions(!expandSearchOptions);
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
            Toggle Advanced Search Options
          </Button>
        </Grid>
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
          <Grid container justify="space-evenly" alignItems="flex-end">
            <Grid item>
              <Typography variant="h6">Type:</Typography>
              <Select
                name="firstType"
                onChange={(e) => onChange(e)}
                value={firstType}
                variant="outlined"
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
              {showBothTypes && (
                <Select
                  name="secondType"
                  onChange={(e) => onChange(e)}
                  value={secondType}
                  variant="outlined"
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
              )}
            </Grid>
            <Grid item>
              <Typography variant="h6">Ability:</Typography>
              <TextField
                variant="outlined"
                onChange={(e) => onChange(e)}
                placeholder="Search for an ability"
                name="ability"
                value={ability}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6">Egg Group:</Typography>
              <Select
                name="firstEggGroup"
                onChange={(e) => onChange(e)}
                value={firstEggGroup}
                variant="outlined"
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
              {showBothEggGroups && (
                <Select
                  name="secondEggGroup"
                  onChange={(e) => onChange(e)}
                  value={secondEggGroup}
                  variant="outlined"
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
              )}
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container justify="space-evenly" alignItems="flex-end">
            <Grid item xs={1}>
              <Typography variant="caption">Base HP {">"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseHealthGreater"
                onChange={(e) => onChange(e)}
                value={baseHealthGreater}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base HP {"<"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseHealthLess"
                onChange={(e) => onChange(e)}
                value={baseHealthLess}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base Atk {">"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseAttackGreater"
                onChange={(e) => onChange(e)}
                value={baseAttackGreater}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base Atk {"<"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseAttackLess"
                onChange={(e) => onChange(e)}
                value={baseAttackLess}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base Def {">"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseDefenseGreater"
                onChange={(e) => onChange(e)}
                value={baseDefenseGreater}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base Def {"<"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseDefenseLess"
                onChange={(e) => onChange(e)}
                value={baseDefenseLess}
              />
            </Grid>
          </Grid>
          <Grid container justify="space-evenly" alignItems="flex-end">
            <Grid item xs={1}>
              <Typography variant="caption">Base Sp Atk {">"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseSpAttackGreater"
                onChange={(e) => onChange(e)}
                value={baseSpAttackGreater}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base Sp Atk {"<"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseSpAttackLess"
                onChange={(e) => onChange(e)}
                value={baseSpAttackLess}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base Sp Def {">"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseSpDefenseGreater"
                onChange={(e) => onChange(e)}
                value={baseSpDefenseGreater}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base Sp Def {"<"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="256"
                name="baseSpDefenseLess"
                onChange={(e) => onChange(e)}
                value={baseSpDefenseLess}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base Spe {">"}</Typography>
              <TextField
                type="number"
                variant="outlined"
                placeholder="0"
                name="baseSpeedGreater"
                onChange={(e) => onChange(e)}
                value={baseSpeedGreater}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">Base Spe {"<"}</Typography>
              <TextField
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
    </>
  );
};

SearchFilter.propTypes = {
  pokedex: array.isRequired,
  setFilteredPokedex: func.isRequired,
  showBothTypes: bool,
  showBothEggGroups: bool,
};

SearchFilter.defaultProps = {
  showBothTypes: true,
  showBothEggGroups: true,
};

const checkSearchPokemon = (pokemon, data) => {
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

  if (
    !pokemon.name.toUpperCase().includes(data.search.toUpperCase()) ||
    (search === " " &&
      (pokemon.name.includes("Basculin") ||
        pokemon.name.includes("Deoxys") ||
        pokemon.name.includes("Wormadam") ||
        pokemon.name.includes("Giratina") ||
        pokemon.name.includes("Shaymin") ||
        pokemon.name.includes("Tornadus") ||
        pokemon.name.includes("Thundurus") ||
        pokemon.name.includes("Landorus") ||
        pokemon.name.includes("Meloetta") ||
        pokemon.name.includes("Aegislash") ||
        pokemon.name.includes("Pumpkaboo") ||
        pokemon.name.includes("Gourgeist") ||
        pokemon.name.includes("Zygarde") ||
        pokemon.name.includes("Hoopa") ||
        pokemon.name.includes("Oricorio") ||
        pokemon.name.includes("Lycanroc") ||
        pokemon.name.includes("Wishiwashi") ||
        pokemon.name.includes("Minior") ||
        pokemon.name.includes("Toxtricity") ||
        pokemon.name.includes("Eiscue") ||
        pokemon.name.includes("Morpeko") ||
        pokemon.name.includes("Zacian") ||
        pokemon.name.includes("Zamazenta"))) ||
    (search === "-" &&
      (pokemon.name.includes("Arceus") || pokemon.name.includes("Basculin")))
  )
    return false;

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

  if (ability !== "") {
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
    hpLess,
    atkGreater,
    atkLess,
    defGreater,
    defLess,
    spaGreater,
    spaLess,
    spdGreater,
    spdLess,
    speGreater,
    speLess;

  if (baseHealthGreater === "") hpGreater = 0;
  else hpGreater = parseFloat(baseHealthGreater);
  if (baseHealthLess === "") hpLess = 256;
  else hpLess = parseFloat(baseHealthLess);
  if (pokemon.baseStats.hp <= hpGreater || pokemon.baseStats.hp >= hpLess)
    return false;
  if (baseAttackGreater === "") atkGreater = 0;
  else atkGreater = parseFloat(baseAttackGreater);
  if (baseAttackLess === "") atkLess = 256;
  else atkLess = parseFloat(baseAttackLess);
  if (pokemon.baseStats.atk <= atkGreater || pokemon.baseStats.atk >= atkLess)
    return false;
  if (baseDefenseGreater === "") defGreater = 0;
  else defGreater = parseFloat(baseDefenseGreater);
  if (baseDefenseLess === "") defLess = 256;
  else defLess = parseFloat(baseDefenseLess);
  if (pokemon.baseStats.def <= defGreater || pokemon.baseStats.def >= defLess)
    return false;
  if (baseSpAttackGreater === "") spaGreater = 0;
  else spaGreater = parseFloat(baseSpAttackGreater);
  if (baseSpAttackLess === "") spaLess = 256;
  else spaLess = parseFloat(baseSpAttackLess);
  if (pokemon.baseStats.spA <= spaGreater || pokemon.baseStats.spA >= spaLess)
    return false;
  if (baseSpDefenseGreater === "") spdGreater = 0;
  else spdGreater = parseFloat(baseSpDefenseGreater);
  if (baseSpDefenseLess === "") spdLess = 256;
  else spdLess = parseFloat(baseSpDefenseLess);
  if (pokemon.baseStats.spD <= spdGreater || pokemon.baseStats.spD >= spdLess)
    return false;
  if (baseSpeedGreater === "") speGreater = 0;
  else speGreater = parseFloat(baseSpeedGreater);
  if (baseSpeedLess === "") speLess = 256;
  else speLess = parseFloat(baseSpeedLess);
  if (pokemon.baseStats.spe <= speGreater || pokemon.baseStats.spe >= speLess)
    return false;
  return true;
};
