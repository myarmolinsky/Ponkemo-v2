const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  types: {
    type: Array,
  },
  abilities: {
    type: Array,
  },
  hiddenAbility: {
    type: String,
  },
  sprite: {
    type: String,
  },
  shinySprite: {
    type: String,
  },
  baseStats: {
    type: Object,
  },
  weight: {
    type: Number,
  },
  baseFriendship: {
    type: Number,
  },
  spawnRate: {
    type: Number,
  },
  breeding: {
    type: Object,
  },
  stages: {
    type: Object,
  },
  evolutionDetails: {
    type: Array,
  },
  moves: {
    type: Array,
  },
});

//Export the model using the schema above
module.exports = mongoose.model("pokemon", pokemonSchema);
