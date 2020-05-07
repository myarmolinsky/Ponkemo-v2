const express = require("express");
const router = express.Router();
const Pokemon = require("../../models/Pokemon");

// @route GET api/pokemon
// @desc Get all Pokemon
// @access Public
router.get("/", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne(req.pokemon);
    res.json(pokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/pokemon
// @desc Get a Pokemon by the name provided
// @access Public
router.get("/:name", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ name: req.params.name });
    res.json(pokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/pokemon
// @desc Update the Pokemon with a matching name with the provided info
// @access Public
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
