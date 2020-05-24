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
    const pokemons = {
      pokemon: null,
      previousPokemon: null,
      nextPokemon: null,
    };
    const pokemon = await Pokemon.findOne({ id: req.params.id });
    pokemons.pokemon = await Pokemon.findOne({ id: req.params.id });
    if (!pokemons) {
      return res.status(400).json({ msg: "Pokemon not found" });
    }
    let id = pokemons.pokemon.id;
    pokemons.previousPokemon = await Pokemon.findOne(
      id > 1 ? { id: id - 1 } : {}
    );
    if (typeof pokemons.previousPokemon === undefined) {
      pokemons.previousPokemon = null;
    }
    pokemons.nextPokemon = await Pokemon.findOne(
      id < 1030 ? { id: id + 1 } : {}
    );
    if (typeof pokemons.nextPokemon === undefined) {
      pokemons.nextPokemon = null;
    }

    res.json(pokemons);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Pokemon not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route put api/pokemon
// @desc Give all Pokemon ids
// @access Private
router.put("/ids", async (req, res) => {
  // DON'T TOUCH
  try {
    let id = 1;
    for (let i = 0; i < 1030; i++) {
      await Pokemon.findOneAndUpdate({ id: 0 }, { id: id });
      id++;
    }
    res.json("Success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/pokemon
// @desc Update the Pokemon with a matching name with the provided info
// @access Private
router.put("/", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOneAndUpdate(
      { name: req.body.name },
      req.body
    );
    res.json(pokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
