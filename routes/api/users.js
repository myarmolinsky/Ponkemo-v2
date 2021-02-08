const express = require("express");
const router = express.Router(); // bring in express router, allows us to make routes in separate files
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
// check lets us add a second parameter in .post() as middleware which checks given input with provided rules
// if any errors are found, they can be seen inside the validationResult array
const User = require("../../models/User");

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

module.exports = router;
