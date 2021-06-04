const crypto = require("crypto");
const express = require("express");
const router = express.Router(); // bring in express router, allows us to make routes in separate files
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
// check lets us add a second parameter in .post() as middleware which checks given input with provided rules
// if any errors are found, they can be seen inside the validationResult array
const User = require("../../models/User");
const Pokemon = require("../../models/Pokemon");

// @route POST api/users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // for req.body to work, we have to initialize the middleware for the body-parser, which we did in server.js by calling 'app.use(express.json({extended: false}))'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ $or: [{ email }, { username }] });
      if (user) {
        // if the user already exists
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        username,
        email,
        password, // this password is not hashed/encrypted yet so we will need to do that
      });

      // Encrypt password using bcrypt
      // first thing we need to do before encrypting the password is to create a 'salt' to do the hashing with
      const salt = await bcrypt.genSalt(10);
      // we pass what is called the "rounds" into bcrypt.genSalt() (10 is what is recommended in the documentation)
      // the more rounds you have, the more secure the password is but the slower it can be
      user.password = await bcrypt.hash(password, salt); // bcrypt.hash takes in two parameters: the plain-text (in this case "password") and the salt
      await user.save();

      // Return jsonwebtoken because when a user registers, you want them to be logged in right away and for them to be logged in right away, they need that webtoken
      /*
      JWT:
      we want to return the token so the user can use it to authenticate and access protected routes
      jwt consists of a header, a payload, and a signature verification
      the payload is what we send in the token
      what we want to send as the payload in our case is the user id so we can identify the user it is via the token
      for us to do that, we must first sign a jwt by doing jwt.sign(<payloadObject>, <callback>)
      later we can verify the token
      */
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"), // our signed jwt has to have some kind of secret, which is located in our default.json
        {}, // this parameter is optional. it is a set of options
        (err, token) => {
          // this last parameter is a callback which takes in a possible error 'err' and the token itself
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      // if something goes wrong here, then it's a server error
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route POST api/users/forgot-password
// @desc Send an email to reset password if the provided email matches an email on record
// @access Public
router.post(
  "/forgot-password",
  [check("email", "Please include a valid email").isEmail()],
  async (req, res) => {
    // for req.body to work, we have to initialize the middleware for the body-parser, which we did in server.js by calling 'app.use(express.json({extended: false}))'
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        // if there is no user with the provided email
        return res.status(400).json({
          errors: [{ msg: "There is no user with the provided email" }],
        });
      }

      const token = crypto.randomBytes(20).toString("hex");
      await User.updateOne(
        { email },
        {
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000,
        }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: `${config.get("EMAIL_ADDRESS")}`,
          pass: `${config.get("EMAIL_PASSWORD")}`,
        },
      });

      const mailOptions = {
        from: `${config.get("EMAIL_ADDRESS")}`,
        to: `${email}`,
        subject: "Ponkemo | Link To Reset Password",
        text:
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste it into your browser, to complete the process within one hour of receiving it:\n\n" +
          `${config.get("URL")}/reset/${token} \n\n` +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n",
      };

      transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
          console.error("Error: ", err);
        } else {
          res.status(200).json("Recovery email sent!");
        }
      });
    } catch (err) {
      // if something goes wrong here, then it's a server error
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/users/:username/owned
// @desc Get owned Pokemon and their info
// @access Public
router.get("/:username/owned", async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    res.send(user.ownedPokemon);
  } catch (err) {
    // if something goes wrong here, then it's a server error
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/users/:username/owned/update/:index
// @desc Update the given data of the owned Pokemon at the given index
// @access Public
router.put("/:username/owned/update/:uid", async (req, res) => {
  const { username, uid } = req.params;

  try {
    const user = await User.findOne({ username });
    let ownedPokemon = user.ownedPokemon;
    for (let i = 0; i < ownedPokemon.length; i++) {
      if (ownedPokemon[i].uid == uid) {
        ownedPokemon[i] = { ...ownedPokemon[i], ...req.body };
        break;
      }
    }
    await User.updateOne({ username }, { ownedPokemon });
    res.status(200).send();
  } catch (err) {
    // if something goes wrong here, then it's a server error
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/users/:username/spawn
// @desc Spawn a Pokemon to catch
// @access Public
router.put("/:username/spawn", async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });
  let spawnCounter = user.spawnCounter;
  let spawning = true;
  let spawns = [];
  let spawnIndex = Math.floor(Math.random() * spawnCounter.length);
  // determine the spawnRate of 12 Pokemon to spawn
  while (spawns.length < 12) {
    while (spawning) {
      if (spawnCounter[spawnIndex] === spawnIndex) {
        spawning = false;
        spawnCounter[spawnIndex] = 0;
      } else {
        spawnCounter[spawnIndex] = spawnCounter[spawnIndex] + 1;
        spawnIndex = Math.floor(Math.random() * spawnCounter.length);
      }
    }
    spawns.push(spawnIndex);
  }

  let spawnedPokemon = [];
  while (spawnedPokemon.length < 12) {
    let pokemon = await Pokemon.aggregate([
      { $match: { spawnRate: spawns.pop() } },
      { $sample: { size: 1 } },
    ]);
    spawnedPokemon.push(pokemon[0]);
  }

  try {
    await User.updateOne({ username }, { spawnCounter });

    res.status(200).send(spawnedPokemon);
  } catch (err) {
    // if something goes wrong here, then it's a server error
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/users/:username/catch
// @desc Catch a Pokemon
// @access Public
router.put("/:username/catch", async (req, res) => {
  const { username } = req.params;
  const { pokemon } = req.body;

  // find the lowest unused uid
  const user = await User.findOne({ username });
  let ownedPokemon = user.ownedPokemon;
  for (i = 0; i < ownedPokemon.length; i++) {
    ownedPokemon[i] = ownedPokemon[i].uid;
  }
  ownedPokemon.sort((a, b) => a - b);
  let lowestUnusedUid = -1;
  for (i = 0; i < ownedPokemon.length; i++) {
    if (ownedPokemon[i] !== i) {
      lowestUnusedUid = i;
      break;
    }
  }
  if (lowestUnusedUid === -1) {
    lowestUnusedUid = ownedPokemon.length;
  }

  let level = Math.floor(Math.random() * 25) + 1;
  let nature = pickNature();
  let ivs = {
    hp: Math.floor(Math.random() * 32),
    atk: Math.floor(Math.random() * 32),
    def: Math.floor(Math.random() * 32),
    spA: Math.floor(Math.random() * 32),
    spD: Math.floor(Math.random() * 32),
    spe: Math.floor(Math.random() * 32),
  };
  let evs = {
    hp: 0,
    atk: 0,
    def: 0,
    spA: 0,
    spD: 0,
    spe: 0,
  };

  // Create caught pokemon
  let caughtPokemon = {
    id: pokemon.id,
    nickname: pokemon.name,
    level,
    shiny: Math.floor(Math.random() * 4096) === 0 ? true : false,
    ability: Math.floor(Math.random() * 151), // if 0, hidden ability. 1-75 = first ability. 76-150 = second ability
    ivs,
    evs,
    friendship: pokemon.baseFriendship,
    gender:
      pokemon.genderRatio === -1
        ? "Genderless"
        : (Math.floor(Math.random() * 1000) + 1) / 10 <= pokemon.genderRatio
        ? "Male"
        : "Female",
    heldItem: "None",
    stats: calculateStats(pokemon.baseStats, nature, ivs, evs, level),
    nature,
    evoLock: false,
    pointsInvested: {
      t1: 0,
      t2: 0,
      t3: 0,
      t4: 0,
      t5: 0,
    },
    favorite: false,
    moves: pickMoves(pokemon.moves, level),
    uid: lowestUnusedUid,
  };

  try {
    await User.updateOne(
      { username },
      { $push: { ownedPokemon: caughtPokemon } }
    );

    res.status(200).send(caughtPokemon);
  } catch (err) {
    // if something goes wrong here, then it's a server error
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

const pickNature = () => {
  let natures = [
    "Hardy",
    "Lonely",
    "Brave",
    "Adamant",
    "Naughty",
    "Bold",
    "Docile",
    "Relaxed",
    "Impish",
    "Lax",
    "Timid",
    "Hasty",
    "Serious",
    "Jolly",
    "Naive",
    "Modest",
    "Mild",
    "Quiet",
    "Bashful",
    "Rash",
    "Calm",
    "Gentle",
    "Sassy",
    "Careful",
    "Quirky",
  ];
  let index = Math.floor(Math.random() * 25);
  return natures[index];
};

const pickMoves = (moves, level) => {
  let learnedMoves = [];
  let learnableMoves = moves.filter((move) => {
    learnConditions = move.learnConditions;
    learnConditions = learnConditions.filter((condition) => !isNaN(condition));
    learnConditions = learnConditions.filter((condition) => condition <= level);
    return learnConditions.length >= 1;
  });

  let moveCount = learnableMoves.length > 4 ? 4 : learnableMoves.length;

  for (let i = 0; i < moveCount; i++) {
    let index = Math.floor(Math.random() * learnableMoves.length);
    let move = learnableMoves[index];
    learnedMoves.push(move.name);
    learnableMoves.splice(index, 1);
  }

  return learnedMoves;
};

const calculateStats = (base, nature, ivs, evs, level) => {
  let stats = {
    hp:
      base.hp === 1
        ? 1
        : ((2 * base.hp + ivs.hp + evs.hp / 4) * level) / 100 + level + 10,
    atk: ((2 * base.atk + ivs.atk + evs.atk / 4) * level) / 100 + 5,
    def: ((2 * base.def + ivs.def + evs.def / 4) * level) / 100 + 5,
    spA: ((2 * base.spA + ivs.spA + evs.spA / 4) * level) / 100 + 5,
    spD: ((2 * base.spD + ivs.spD + evs.spD / 4) * level) / 100 + 5,
    spe: ((2 * base.spe + ivs.spe + evs.spe / 4) * level) / 100 + 5,
  };

  switch (nature) {
    case "Lonely":
    case "Brave":
    case "Adamant":
    case "Naughty":
      stats.atk = stats.atk * 1.1;
    case "Bold":
    case "Relaxed":
    case "Impish":
    case "Lax":
      stats.def = stats.def * 1.1;
    case "Modest":
    case "Mild":
    case "Quiet":
    case "Rash":
      stats.spA = stats.spA * 1.1;
    case "Calm":
    case "Gentle":
    case "Sassy":
    case "Careful":
      stats.spD = stats.spD * 1.1;
    case "Timid":
    case "Hasty":
    case "Jolly":
    case "Naive":
      stats.spe = stats.spe * 1.1;
    case "Bold":
    case "Timid":
    case "Modest":
    case "Calm":
      stats.atk = stats.atk * 0.9;
      break;
    case "Lonely":
    case "Hasty":
    case "Mild":
    case "Gentle":
      stats.def = stats.def * 0.9;
      break;
    case "Adamant":
    case "Impisj":
    case "Jolly":
    case "Careful":
      stats.spA = stats.spA * 0.9;
      break;
    case "Naughty":
    case "Lax":
    case "Naive":
    case "Rash":
      stats.spD = stats.spD * 0.9;
      break;
    case "Brave":
    case "Relaxed":
    case "Quiet":
    case "Sassy":
      stats.spe = stats.spe * 0.9;
      break;
  }

  stats.hp = Math.floor(stats.hp);
  stats.atk = Math.floor(stats.atk);
  stats.def = Math.floor(stats.def);
  stats.spA = Math.floor(stats.spA);
  stats.spD = Math.floor(stats.spD);
  stats.spe = Math.floor(stats.spe);

  return stats;
};

module.exports = router;
