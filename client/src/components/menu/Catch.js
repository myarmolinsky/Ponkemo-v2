import React, { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { UserContext } from "../../context";
import { Spinner } from "../layout";

export const Catch = () => {
  const { spawnedPokemon, spawnPokemon, despawnPokemon } = useContext(
    UserContext
  );

  useEffect(() => {
    if (spawnedPokemon.length < 9) {
      spawnPokemon();
    }
  }, [spawnedPokemon]);

  return spawnedPokemon.length < 9 ? (
    <Spinner />
  ) : (
    <div>
      <h1 className="text-primary" style={{ textAlign: "center" }}>
        Match Pokemon to catch them!
      </h1>
      <Grid container spacing={3}>
        {spawnedPokemon.concat(spawnedPokemon).map((pokemon, index) => (
          <Grid item key={index} xs={2}>
            <div
              className="pokedex-item"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{ height: "50%", width: "50%" }}
                src={pokemon.sprite}
                alt={pokemon.name}
              />
              {/* Pokemon's name */}
              <p variant="caption">{pokemon.name}</p>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
