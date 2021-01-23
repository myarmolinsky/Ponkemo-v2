import React, { Fragment, useState, useEffect } from "react";
import { array, func, bool } from "prop-types";
import { Button, Select, MenuItem, Typography, Grid } from "@material-ui/core";
import { useStyles } from "./styles";

export const SearchFilter = ({
  pokedex,
  setFilteredPokedex,
  showBothTypes,
}) => {
  const classes = useStyles();

  const [searchData, setSearchData] = useState({
    search: "",
    firstType: " ",
    secondType: " ",
    ability: "",
    eggGroup: "",
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
    eggGroup,
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
      pokedex.filter((pokemon) => checkSearchPokemon(pokemon))
    );
  }, [searchData, pokedex]);

  const toggleSearchOptions = (e) => {
    e.preventDefault();
    setExpandSearchOptions(!expandSearchOptions);
  };

  const checkSearchPokemon = (pokemon) => {
    if (
      !pokemon.name.toUpperCase().includes(search.toUpperCase()) ||
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

    if (firstType !== " ") if (!pokemon.types.includes(firstType)) return false;
    if (secondType !== " ")
      if (!pokemon.types.includes(secondType)) return false;

    if (ability !== "") {
      if (!pokemon.hiddenAbility.toUpperCase().includes(ability.toUpperCase()))
        if (!pokemon.abilities[0].toUpperCase().includes(ability.toUpperCase()))
          if (pokemon.abilities.length > 1) {
            if (
              !pokemon.abilities[1]
                .toUpperCase()
                .includes(ability.toUpperCase())
            )
              return false;
          } else {
            return false;
          }
    }

    if (eggGroup !== "") {
      if (!pokemon.breeding.eggGroups.includes(eggGroup)) {
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

  const clearSearch = () => {
    setSearchData({
      search: "",
      firstType: " ",
      secondType: " ",
      ability: "",
      eggGroup: "",
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
    <form className="search-form">
      <div className="search-bar">
        <i className="fas fa-search input-icon"></i>
        <input
          type="text"
          placeholder="Search for a Pokemon"
          name="search"
          value={search}
          onChange={(e) => onChange(e)}
        ></input>
      </div>
      <Button
        variant="contained"
        className={`${classes.root} ${classes.primary}`}
        onClick={(e) => toggleSearchOptions(e)}
      >
        Toggle Advanced Search Options
      </Button>
      {expandSearchOptions ? (
        <Fragment>
          <Typography variant="h6">Type:</Typography>
          <Grid container>
            <Grid item>
              <Select
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
              {showBothTypes ? (
                <Select
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
              ) : (
                ""
              )}
            </Grid>
          </Grid>
          <label
            style={{
              display: "table-cell",
              paddingLeft: "1em",
            }}
          >
            Ability:
          </label>
          <input
            type="text"
            placeholder="Search for an ability"
            name="ability"
            value={ability}
            onChange={(e) => onChange(e)}
            style={{ display: "table-cell", marginLeft: "-45%" }}
          ></input>
          <label style={{ display: "table-cell" }}>Egg Group:</label>
          <select
            name="eggGroup"
            onChange={(e) => onChange(e)}
            style={{
              display: "table-cell",
              width: "110%",
              marginLeft: "-10%",
            }}
          >
            <option defaultValue value=""></option>
            <option value="Amorphous">Amorphous</option>
            <option value="Bug">Bug</option>
            <option value="Ditto">Ditto</option>
            <option value="Dragon">Dragon</option>
            <option value="Fairy">Fairy</option>
            <option value="Field">Field</option>
            <option value="Flying">Flying</option>
            <option value="Grass">Grass</option>
            <option value="Human-Like">Human-Like</option>
            <option value="Legendary">Legendary</option>
            <option value="Mineral">Mineral</option>
            <option value="Monster">Monster</option>
            <option value="Unown">Unown</option>
            <option value="Water 1">Water 1</option>
            <option value="Water 2">Water 2</option>
            <option value="Water 3">Water 3</option>
          </select>
          <hr />
          <div
            className="form-group"
            style={{
              paddingLeft: "40px",
              display: "table",
            }}
          >
            <label style={{ display: "table-cell" }}>Base Health {">"}</label>
            <input
              type="number"
              placeholder="0"
              name="baseHealthGreater"
              value={baseHealthGreater}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
            <label style={{ display: "table-cell", paddingLeft: "1em" }}>
              Base Health {"<"}
            </label>
            <input
              type="number"
              placeholder="256"
              name="baseHealthLess"
              value={baseHealthLess}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
            <label style={{ display: "table-cell", paddingLeft: "1em" }}>
              Base Attack {">"}
            </label>
            <input
              type="number"
              placeholder="0"
              name="baseAttackGreater"
              value={baseAttackGreater}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
            <label style={{ display: "table-cell", paddingLeft: "1em" }}>
              Base Attack {"<"}
            </label>
            <input
              type="number"
              placeholder="256"
              name="baseAttackLess"
              value={baseAttackLess}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
          </div>
          <div
            className="form-group"
            style={{
              paddingLeft: "40px",
              display: "table",
            }}
          >
            <label style={{ display: "table-cell" }}>Base Defense {">"}</label>
            <input
              type="number"
              placeholder="0"
              name="baseDefenseGreater"
              value={baseDefenseGreater}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
            <label style={{ display: "table-cell", paddingLeft: "1em" }}>
              Base Defense {"<"}
            </label>
            <input
              type="number"
              placeholder="256"
              name="baseDefenseLess"
              value={baseDefenseLess}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
            <label style={{ display: "table-cell", paddingLeft: "1em" }}>
              Base Special Attack {">"}
            </label>
            <input
              type="number"
              placeholder="0"
              name="baseSpAttackGreater"
              value={baseSpAttackGreater}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
            <label style={{ display: "table-cell", paddingLeft: "1em" }}>
              Base Special Attack {"<"}
            </label>
            <input
              type="number"
              placeholder="256"
              name="baseSpAttackLess"
              value={baseSpAttackLess}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
          </div>
          <div
            className="form-group"
            style={{
              paddingLeft: "40px",
              display: "table",
            }}
          >
            <label style={{ display: "table-cell" }}>
              Base Special Defense {">"}
            </label>
            <input
              type="number"
              placeholder="0"
              name="baseSpDefenseGreater"
              value={baseSpDefenseGreater}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
            <label style={{ display: "table-cell", paddingLeft: "1em" }}>
              Base Special Defense {"<"}
            </label>
            <input
              type="number"
              placeholder="256"
              name="baseSpDefenseLess"
              value={baseSpDefenseLess}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
            <label style={{ display: "table-cell", paddingLeft: "1em" }}>
              Base Speed {">"}
            </label>
            <input
              type="number"
              placeholder="0"
              name="baseSpeedGreater"
              value={baseSpeedGreater}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
            <label style={{ display: "table-cell", paddingLeft: "1em" }}>
              Base Speed {"<"}
            </label>
            <input
              type="number"
              placeholder="256"
              name="baseSpeedLess"
              value={baseSpeedLess}
              onChange={(e) => onChange(e)}
              style={{ display: "table-cell" }}
            ></input>
          </div>
          <hr style={{ marginTop: "1em" }} />
          <div className="form-group" style={{ display: "flex" }}>
            <input
              className="btn btn-dark"
              type="reset"
              value="Clear Search"
              onClick={() => clearSearch()}
              style={{ marginLeft: "auto" }}
            />
          </div>
          <hr style={{ marginTop: "1em" }} />
        </Fragment>
      ) : (
        ""
      )}
    </form>
  );
};

SearchFilter.propTypes = {
  pokedex: array.isRequired,
  setFilteredPokedex: func.isRequired,
  showBothTypes: bool,
};

SearchFilter.defaultProps = {
  showBothTypes: true,
};
