import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
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
  const [selectingDisabled, setSelectingDisabled] = useState(false);

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
      setSelectingDisabled(true);
      let caught = false;
      const firstSelection = activeSelections[0];
      const secondSelection = activeSelections[1];

      if (firstSelectedPokemonId === secondSelectedPokemonId) {
        catchPokemon(shuffledSpawnedPokemonSets[firstSelection]);
        caught = true;
      }

      setTimeout(() => {
        setActiveSelections([]);
        if (caught) {
          setShuffledSpawnedPokemonSets(
            removeCaughtPokemon(firstSelection, secondSelection)
          );
        }
        setSelectingDisabled(false);
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
  ) : shuffledSpawnedPokemonSets.length > 0 ? (
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
                selectingDisabled
                  ? {}
                  : !activeSelections.includes(index)
                  ? setActiveSelections(activeSelections.concat(index))
                  : {}
              }
            >
              {isActive(index) && (
                <div>
                  <img
                    style={{ height: "75%", width: "75%" }}
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
  ) : (
    <div className="text-primary center" style={{ textAlign: "center" }}>
      <h1>You have caught all the Pokemon this round!</h1>
      <h1>Would you like to play again?</h1>
      <br />
      <Grid container justify="space-evenly">
        <Grid item xs={4}>
          <Button
            color="primary"
            size="large"
            variant="contained"
            fullWidth
            onClick={() => despawnPokemon()}
          >
            Yes
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            color="secondary"
            size="large"
            variant="contained"
            fullWidth
            component={Link}
            to="/"
          >
            No
          </Button>
        </Grid>
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
