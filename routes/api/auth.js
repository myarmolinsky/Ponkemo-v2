const express = require("express");
const router = express.Router(); //bring in express router, allows us to make routes in separate files
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// @route GET api/auth
// @desc Get user via a token
// @access Public
router.get("/", auth, async (req, res) => {
  // Postman Note: go to headers and add a Key called 'x-auth-token' with a Value that is a token for one of the users
  try {
    const user = await User.findById(req.user.id).select("-password"); // doing '.select("-password") leaves the password out of the data returned since we do not need it
    res.json(user);
  } catch (err) {
    // if something goes wrong here, it's a server error
    console.err(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post(
  "/",
  [
    check("username", "Username is required").exists(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (!user) {
        // if there is NOT a user with the given credentials
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // bcrypt's compare() method takes in a plain-text password and an encrypted password and compares them and tells you if they're a match or not
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        //if the passwords do not match
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), {}, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
