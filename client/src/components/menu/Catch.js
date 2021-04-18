import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Grid } from "@material-ui/core";
import { UserContext } from "../../context";
import { Spinner } from "../layout";
import { Dex, PokemonSprite } from "../common";

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
  const [timer, setTimer] = useState(-1);
  const [timesUp, setTimesUp] = useState(false);

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
      setTimer(15);
      setTimesUp(false);
    }
  }, [spawnedPokemon]);

  // count down the timer as long as there are still spawned Pokemon
  useEffect(() => {
    if (shuffledSpawnedPokemonSets.length > 0) {
      if (timer === 0) {
        setTimesUp(true);
      }
      if (timer > 0) {
        setTimeout(() => setTimer(timer - 1), 1000);
      }
    }
  }, [timer, shuffledSpawnedPokemonSets]);

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
          if (shuffledSpawnedPokemonSets.length === 0) {
            setTimer(-1);
          }
        }
        setSelectingDisabled(false);
      }, 500);
    }
  }, [activeSelections]);

  const isActive = (index) => {
    return activeSelections.includes(index);
  };

  const handleSelect = (pokemon, index) => {
    !selectingDisabled &&
      !activeSelections.includes(index) &&
      setActiveSelections(activeSelections.concat(index));
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
  ) : shuffledSpawnedPokemonSets.length > 0 && !timesUp ? (
    <div>
      <h1 className="text-primary" style={{ textAlign: "center" }}>
        Match Pokemon to catch them before time runs out:{" "}
        <span className="text-dark">{timer}</span>
      </h1>
      <Dex
        dex={shuffledSpawnedPokemonSets}
        isVisible={isActive}
        onClick={handleSelect}
      />
    </div>
  ) : (
    <div className="text-primary center" style={{ textAlign: "center" }}>
      <h1>
        {timesUp
          ? "Out of time :("
          : "You have caught all the Pokemon this round!"}
      </h1>
      <h1>Would you like to play again?</h1>
      <br />
      <Grid container justify="space-evenly">
        <Grid item xs={4}>
          <Button
            color="primary"
            size="large"
            variant="contained"
            fullWidth
            onClick={() => {
              setActiveSelections([]);
              despawnPokemon();
            }}
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
            to="/menu"
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
