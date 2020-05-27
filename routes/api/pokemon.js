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
    // if id is greater than the amount of pokemon in the pokedex or less than 1
    if (req.params.id > pokedex.length || req.params.id < 1) pokemon = {};
    else pokemon = await Pokemon.findOne({ id: req.params.id });

    res.json(pokemon);
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
