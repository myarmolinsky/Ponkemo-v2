const express = require("express");
const router = express.Router();
const Pokemon = require("../../models/Pokemon");

// @route GET api/pokemon
// @desc Get all Pokemon
// @access Public
router.get("/", async (req, res) => {
  try {
    const pokedex = await Pokemon.find({});
    res.json(pokedex);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/pokemon/:id
// @desc Get a Pokemon by the id provided
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const pokedex = await Pokemon.find({});
    let pokemon;
    let id = parseFloat(req.params.id);
    // if id is greater than the amount of pokemon in the pokedex or less than 1
    if (id > pokedex.length || id < 1) pokemon = {};
    else pokemon = await Pokemon.findOne({ id: id });

    // the id of the next pokemon
    let nextPokemonId;
    let nextId = id + 0.01;
    let nextPokemon = await Pokemon.findOne({ id: nextId });
    if (nextPokemon) nextPokemonId = nextId;
    else nextPokemonId = Math.ceil(nextId);

    // the id of the previous pokemon
    let previousPokemonId;
    // if the id is not an integer, decrease it by 0.01
    if (Math.floor(id) !== id) previousPokemonId = id - 0.01;
    else {
      // otherwise decrease it by 0.99 (4 -> 3.01) and count upwards until we reach an id with no pokemon attached to it
      let previousId = id - 0.99;
      let previousPokemon = await Pokemon.findOne({ id: previousId });
      while (previousPokemon) {
        previousId += 0.01;
        previousPokemon = await Pokemon.findOne({ id: previousId });
      }
      previousPokemonId = previousId - 0.01; // decrease previousId by 1 because previousId is currently the id not attached to a pokemon
      if (previousPokemonId < id - 1)
        // calculation issue occurs when subtracting 0.01 from an integer so round up if the issue does occur
        previousPokemonId = Math.ceil(previousPokemonId);
    }

    // evolutionIds is an array that contains the ids of the evolutions of the pokemon
    let evolutionIds = [];
    // loop through the evolutionDetails array to find push the id of each evolution onto the evolutionIds array
    for (let i = 0; i < pokemon.evolutionDetails.length; i++) {
      let evolutionName = pokemon.evolutionDetails[i].evolution;
      let evolution = await Pokemon.findOne({ name: evolutionName });
      evolutionIds.push(evolution.id);
    }

    // eggIds is an array that contains the ids of the egg and altEgg of the pokemon
    let eggIds = [];
    let egg = await Pokemon.findOne({ name: pokemon.breeding.egg });
    let eggId = egg.id;
    eggIds.push(eggId);
    egg = await Pokemon.findOne({ name: pokemon.breeding.altEgg });
    eggId = egg.id;
    eggIds.push(eggId);

    // pokemon formes
    let formes = [];
    let formeId = Math.floor(id);
    let forme = await Pokemon.findOne({ id: formeId });
    while (forme) {
      formes.push(forme);
      formeId += 0.01;
      if (formeId === Math.ceil(formeId)) break;
      forme = await Pokemon.findOne({ id: formeId });
    }

    let payload = {
      pokemon,
      nextPokemonId,
      previousPokemonId,
      evolutionIds,
      eggIds,
      formes,
    };
    res.json(payload);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/pokemon
// @desc Update the Pokemon with a matching id with the provided info
// @access Private
router.post("/:id", async (req, res) => {
  try {
    // try to find the Pokemon with the matching id
    let pokemon = await Pokemon.findOneAndUpdate(
      { id: req.params.id },
      req.body
    );

    if (!pokemon) {
      // if there isn't one, make a new one with the given information
      const {
        name,
        sprite,
        shinySprite,
        types,
        abilities,
        hiddenAbility,
        weight,
        baseFriendship,
        baseStats,
        spawnRate,
        moves,
        id,
        breeding,
        stages,
        genderRatio,
        evolutionDetails,
      } = req.body;

      pokemon = new Pokemon({
        name,
        sprite,
        shinySprite,
        types,
        abilities,
        hiddenAbility,
        weight,
        baseFriendship,
        baseStats,
        spawnRate,
        moves,
        id,
        breeding,
        stages,
        genderRatio,
        evolutionDetails,
      });

      pokemon.save();
    }

    res.json(pokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
