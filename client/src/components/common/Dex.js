import React, { useState } from "react";
import { Link } from "react-router-dom";
import { array } from "prop-types";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Tippy from "@tippyjs/react";
import { OwnedPokemonInfo } from "../profile";

export const Dex = ({ dex, ownedPokemon }) => {
  const pageLength = 48;
  const pages = Math.ceil(dex.length / pageLength);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Pagination
        count={pages}
        page={page}
        showFirstButton
        showLastButton
        onChange={handleChange}
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Grid container spacing={3}>
        {dex
          .slice((page - 1) * pageLength, page * pageLength)
          .map((pokemon, index) => (
            <Grid item key={index} xs={2}>
              <Tippy
                content={
                  ownedPokemon ? (
                    <OwnedPokemonInfo
                      pokemon={ownedPokemon[index]}
                      index={index}
                      ability={getAbility(ownedPokemon[index].ability, {
                        hiddenAbility: pokemon.hiddenAbility,
                        abilities: pokemon.abilities,
                      })}
                    />
                  ) : (
                    ""
                  )
                }
                interactive
                duration={0}
                placement="left-start"
              >
                <Link to={`/pokedex/${pokemon.id}`}>
                  {/* Create a link leading to the pokemon's page */}
                  {/* Pokemon's sprite */}
                  <div
                    className="pokedex-item"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <img
                      className="sprite"
                      src={
                        ownedPokemon
                          ? ownedPokemon[index].shiny
                            ? pokemon.shinySprite
                            : pokemon.sprite
                          : pokemon.sprite
                      }
                      alt={pokemon.name}
                    />
                    {/* Pokemon's name */}
                    <p variant="caption">{pokemon.name}</p>
                  </div>
                </Link>
              </Tippy>
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={pages}
        page={page}
        showFirstButton
        showLastButton
        onChange={handleChange}
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    </div>
  );
};

Dex.propTypes = {
  dex: array.isRequired,
  ownedPokemon: array,
};

Dex.defaultProps = {
  ownedPokemon: null,
};

const getAbility = (abilityRoll, abilities) => {
  if (abilityRoll === 0 && abilities.hiddenAbility !== "") {
    return abilities.hiddenAbility;
  }
  if (abilityRoll <= 75 || abilities.abilities.length < 2) {
    return abilities.abilities[0];
  }
  return abilities.abilities[1];
};
