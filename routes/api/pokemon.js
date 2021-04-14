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

// @route PUT api/pokemon
// @desc Update the Pokemon with a matching id with the provided info
// @access Private
router.put("/:id", async (req, res) => {
  try {
    // try to find the Pokemon with the matching id
    let pokemon = await Pokemon.findOne({ id: req.params.id });

    if (pokemon) {
      await Pokemon.updateOne({ id: req.params.id }, req.body);
    } else {
      // if there isn't one, make a new one with the given information
      pokemon = new Pokemon(req.body);
      pokemon.save();
    }

    res.json(pokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/tool/create-spawnrates", async (req, res) => {
  try {
    const pokedex = await Pokemon.find().sort({ id: 1 });
    let minBaseStatTotal = 600;
    pokedex.forEach((pokemon) => {
      if (
        pokemon.baseStats.hp +
          pokemon.baseStats.atk +
          pokemon.baseStats.def +
          pokemon.baseStats.spA +
          pokemon.baseStats.spD +
          pokemon.baseStats.spe <
        minBaseStatTotal
      ) {
        minBaseStatTotal =
          pokemon.baseStats.hp +
          pokemon.baseStats.atk +
          pokemon.baseStats.def +
          pokemon.baseStats.spA +
          pokemon.baseStats.spD +
          pokemon.baseStats.spe;
      }
    });
    pokedex.forEach(async (pokemon) => {
      let spawnRate;
      let baseStatTotal =
        pokemon.baseStats.hp +
        pokemon.baseStats.atk +
        pokemon.baseStats.def +
        pokemon.baseStats.spA +
        pokemon.baseStats.spD +
        pokemon.baseStats.spe;
      if (
        Math.floor(pokemon.id) !== pokemon.id ||
        pokemon.name.substring(0, 5) === "Mega "
      ) {
        // megas and formes don't spawn
        spawnRate = -1;
      } else if (
        pokemon.breeding.eggGroups[0] === "Ditto" ||
        pokemon.breeding.eggGroups[0] === "Legendary" ||
        baseStatTotal >= 600
      ) {
        // Ditto, Legendaries, and pseudo-legendaries have the rarest spawnrates
        spawnRate = 24;
      } else {
        // all others
        spawnRate = Math.floor(
          (baseStatTotal - minBaseStatTotal) /
            Math.floor((600 - minBaseStatTotal) / 25)
        );
      }
      await Pokemon.updateOne({ id: pokemon.id }, { $set: { spawnRate } });
    });

    res.json("Success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
