const express = require("express");
const router = express.Router();
const Pokemon = require("../../models/Pokemon");

// @route GET api/pokemon
// @desc Get all Pokemon
// @access Public
router.get("/", async (req, res) => {
  try {
    const pokedex = await Pokemon.find().limit(50).sort({ id: 1 }); // Limit results for now to speed up loading
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
    let id = parseFloat(req.params.id);
    const pokemon = await Pokemon.findOne({ id });

    // // evolutionIds is an array that contains the ids of the evolutions of the pokemon
    // let evolutionIds = [];
    // // loop through the evolutionDetails array to find push the id of each evolution onto the evolutionIds array
    // if (pokemon.evolutionDetails)
    //   for (let i = 0; i < pokemon.evolutionDetails.length; i++) {
    //     let evolutionName = pokemon.evolutionDetails[i].evolution;
    //     let evolution = await Pokemon.findOne({ name: evolutionName });
    //     if (evolution) evolutionIds.push(evolution.id);
    //     else {
    //       console.log("Cannot find evolution at index " + i);
    //       evolutionIds.push(-1);
    //     }
    //   }

    // // eggIds is an array that contains the ids of the egg and altEgg of the pokemon
    // let eggIds = [];
    // if (pokemon.breeding) {
    //   let egg = await Pokemon.findOne({ name: pokemon.breeding.egg });
    //   if (egg) eggIds.push(egg.id);
    //   else {
    //     console.log("Cannot find egg");
    //     eggIds.push(-1);
    //   }
    //   egg = await Pokemon.findOne({ name: pokemon.breeding.altEgg });
    //   if (egg) eggIds.push(egg.id);
    //   else {
    //     console.log("Cannot find altEgg");
    //     eggIds.push(-1);
    //   }
    // }

    // let payload = {
    //   pokemon,
    //   evolutionIds,
    //   eggIds,
    // };
    res.json(pokemon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/pokemon/formes/:id
// @desc Get a Pokemon's formes by the id provided
// @access Public
router.get("/formes/:id", async (req, res) => {
  try {
    let id = parseFloat(req.params.id);
    const formes = await Pokemon.find({
      id: { $lt: Math.floor(id) + 1, $gte: Math.floor(id) },
    });
    res.json(formes);
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
