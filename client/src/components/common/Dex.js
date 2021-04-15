import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { array } from "prop-types";
import { Grid } from "@material-ui/core";
import Tippy from "@tippyjs/react";
import { OwnedPokemonInfo } from "../profile";
import { PokemonSprite } from "./PokemonSprite";
import { CustomPagination } from "./CustomPagination";

export const Dex = ({ dex, ownedPokemon }) => {
  const PAGE_LENGTH = 48; // how many Pokemon to show per page
  const PAGES = Math.ceil(dex.length / PAGE_LENGTH); // how many pages there are

  let history = useHistory();

  const [page, setPage] = useState(1);

  return (
    <CustomPagination pages={PAGES} currentPage={page} setPage={setPage}>
      <Grid container spacing={3}>
        {dex
          .slice((page - 1) * PAGE_LENGTH, page * PAGE_LENGTH)
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
                <PokemonSprite
                  sprite={pokemon.sprite}
                  caption={pokemon.name}
                  alt={pokemon.name}
                  onClick={() => history.push(`/pokedex/${pokemon.id}`)}
                />
              </Tippy>
            </Grid>
          ))}
      </Grid>
    </CustomPagination>
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
