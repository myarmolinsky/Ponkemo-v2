const express = require("express");
const router = express.Router();
const Pokemon = require("../../models/Pokemon");

// @route GET api/pokemon
// @desc Get all Pokemon
// @access Public
router.get("/", async (req, res) => {
  try {
    const pokedex = await Pokemon.find().sort({ id: 1 });
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
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    res.json(pokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/pokemon/formes/:id
// @desc Get a Pokemon's formes by the id provided
// @access Public
router.get("/:id/formes", async (req, res) => {
  try {
    const formes = await Pokemon.find({
      id: {
        $lt: Math.floor(req.params.id) + 1,
        $gte: Math.floor(req.params.id),
        $ne: req.params.id,
      },
    });
    res.json(formes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/pokemon/eggs/:id
// @desc Get a Pokemon's eggs by the id provided
// @access Public
router.get("/:id/eggs", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    let eggs = [];
    let egg;
    if (pokemon.name === pokemon.breeding.egg) {
      eggs.push(pokemon);
    } else {
      egg = await Pokemon.findOne({ name: pokemon.breeding.egg });
      eggs.push(egg);
    }
    if (pokemon.breeding.egg !== pokemon.breeding.altEgg) {
      if (pokemon.name === pokemon.breeding.altEgg) {
        egg.push(pokemon);
      } else {
        egg = await Pokemon.findOne({ name: pokemon.breeding.altEgg });
        eggs.push(egg);
      }
    }
    res.json(eggs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/pokemon/eggs/:id
// @desc Get a Pokemon's eggs by the id provided
// @access Public
router.get("/:id/evolutions", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    let evolutions = [];
    let evolution;
    for (let i = 0; i < pokemon.evolutionDetails.length; i++) {
      evolution = await Pokemon.findOne({
        name: pokemon.evolutionDetails[i].evolution,
      });
      evolutions.push(evolution);
    }
    res.json(evolutions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/pokemon/:id/previous
// @desc Get the id of the previous Pokemon by the id provided
// @access Public
router.get("/:id/previous", async (req, res) => {
  try {
    const formes = await Pokemon.find({
      id: {
        $lt: Math.floor(req.params.id),
        $gte: Math.floor(req.params.id) - 1,
      },
    });
    res.json(formes[formes.length - 1].id);
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
