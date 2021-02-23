const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 16,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  privileges: {
    type: String,
    default: "standard",
  },
  ownedPokemon: {
    type: Array,
    default: [],
  },
  items: {
    type: Array,
    default: [],
  },
  spawnCounter: {
    type: Array,
    default: [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ],
  },
  pokemonTierPoints: {
    type: Object,
    default: {
      t1: 0,
      t2: 0,
      t3: 0,
      t4: 0,
      t5: 0,
    },
  },
  itemTierPoints: {
    type: Object,
    default: {
      t1: 0,
      t2: 0,
      t3: 0,
    },
  },
});

module.exports = User = mongoose.model("user", UserSchema); //export this as User which is a mongoose model
//mongoose.model() takes in 2 things: the model name (in this case "user") and the schema (which we just made, in this case "UserSchema")
