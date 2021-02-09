const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  types: {
    type: Array,
    required: true,
  },
  abilities: {
    type: Array,
    required: true,
  },
  hiddenAbility: {
    type: String,
    default: "",
  },
  sprite: {
    type: String,
    required: true,
  },
  shinySprite: {
    type: String,
    required: true,
  },
  baseStats: {
    type: Object,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  baseFriendship: {
    type: Number,
    required: true,
  },
  spawnRate: {
    type: Number,
    default: -1,
  },
  breeding: {
    type: Object,
    required: true,
  },
  stages: {
    type: Object,
    required: true,
  },
  evolutionDetails: {
    type: Array,
    required: true,
  },
  moves: {
    type: Array,
    default: [],
  },
  genderRatio: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("pokemon", PokemonSchema);
