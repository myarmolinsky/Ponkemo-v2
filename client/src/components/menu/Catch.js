import React, { useContext, useEffect, useState, useMemo } from "react";
import { Grid } from "@material-ui/core";
import { UserContext } from "../../context";
import { Spinner } from "../layout";

export const Catch = () => {
  const {
    spawnedPokemon,
    spawnPokemon,
    despawnPokemon,
    catchPokemon,
  } = useContext(UserContext);

  const [shuffledSpawnedPokemonSets, setShuffledSpawnedPokemonSets] = useState(
    []
  );
  const [activeSelections, setActiveSelections] = useState([]);

  const firstSelectedPokemonId = useMemo(
    () => shuffledSpawnedPokemonSets[activeSelections[0]]?.id,
    [activeSelections]
  );
  const secondSelectedPokemonId = useMemo(
    () => shuffledSpawnedPokemonSets[activeSelections[1]]?.id,
    [activeSelections]
  );

  // Despawn all spawned Pokemon when the user enters the page
  useEffect(() => {
    despawnPokemon();
  }, []);

  // Spawn 9 Pokemon
  useEffect(() => {
    if (spawnedPokemon.length < 9) {
      spawnPokemon();
    }
    if (spawnedPokemon.length === 9) {
      setShuffledSpawnedPokemonSets(
        shuffle(spawnedPokemon.concat(spawnedPokemon))
      );
    }
  }, [spawnedPokemon]);

  // Check selected Pokemon
  useEffect(() => {
    if (activeSelections.length === 2) {
      const firstSelection = activeSelections[0];
      const secondSelection = activeSelections[1];
      if (firstSelectedPokemonId === secondSelectedPokemonId) {
        catchPokemon(shuffledSpawnedPokemonSets[firstSelection]);
        setShuffledSpawnedPokemonSets(
          removeCaughtPokemon(firstSelection, secondSelection)
        );
      }
      setTimeout(() => {
        setActiveSelections([]);
      }, 500);
    }
  }, [activeSelections]);

  const isActive = (index) => {
    return activeSelections.includes(index);
  };

  const removeCaughtPokemon = (firstSelection, secondSelection) => {
    let newShuffledSpawnedPokemonArray = shuffledSpawnedPokemonSets;
    if (firstSelection > secondSelection) {
      newShuffledSpawnedPokemonArray.splice(firstSelection, 1);
      newShuffledSpawnedPokemonArray.splice(secondSelection, 1);
    } else {
      newShuffledSpawnedPokemonArray.splice(secondSelection, 1);
      newShuffledSpawnedPokemonArray.splice(firstSelection, 1);
    }
    return newShuffledSpawnedPokemonArray;
  };

  return spawnedPokemon.length < 9 ? (
    <Spinner />
  ) : (
    <div>
      <h1 className="text-primary" style={{ textAlign: "center" }}>
        Match Pokemon to catch them!
      </h1>
      <Grid container spacing={3}>
        {shuffledSpawnedPokemonSets.map((pokemon, index) => (
          <Grid item key={index} xs={2}>
            <div
              className="pokedex-item"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                setActiveSelections(activeSelections.concat(index))
              }
            >
              {isActive(index) && (
                <div>
                  <img
                    style={{ height: "50%", width: "50%" }}
                    src={pokemon.sprite}
                    alt={pokemon.name}
                  />
                  {/* Pokemon's name */}
                  <p variant="caption">{pokemon.name}</p>
                </div>
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
