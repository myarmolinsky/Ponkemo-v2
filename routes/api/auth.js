const express = require("express"); //bring in express
const router = express.Router(); //bring in express router, allows us to make routes in separate files
const bcrypt = require("bcryptjs"); //bring in bcrypt via bcryptjs
const auth = require("../../middleware/auth"); //bring in our auth middleware
const User = require("../../models/User"); //bring in User model
const jwt = require("jsonwebtoken"); //bring in jwt via jsonwebtoken
const config = require("config"); //bring in config to use the 'jwtsecret' value we made in our default.json inside our config folder
const { check, validationResult } = require("express-validator"); //bring both of these in from express-validator

// @route GET api/auth
// @desc Get user via a token
// @access Public
router.get("/", auth, async (req, res) => {
  //in order to use our auth middleware, we put it in as the second parameter between the path and the callback
  //for this to give us the callback we want, in our Postman we need to go to headers and add a Key called 'x-auth-token' with a Value that is a token for one of the users
  try {
    // try catch because we will make a call to our database
    const user = await User.findById(req.user.id).select("-password"); //since this is a protected route and we used a token which has the id,
    //and in our middleware we set req.user to the user in the token, we can pass 'req.user' into User.findById()
    //we pass 'req.user.id' because we want the id of the user
    //doing '.select("-password") leaves the password out of the data returned since we do not need it
    res.json(user); //send the user
  } catch (err) {
    //if something goes wrong here, it's a server error
    console.err(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth
// @desc Authenticate user & get token
// @access Public
router.post(
  //this route's post request was based on the "users.js" route's post request so check there for any other comments about the code
  "/",
  [
    //a user logging in only puts in their email and password
    check("email", "Please include a valid email").isEmail(), //validate that the email they entered is in the form of an email
    check("password", "Password is required").exists() //make sure that the password exists
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //our request body for logging in only passes an email and password so that's all we pull from the req.body

    try {
      //check for the user
      let user = await User.findOne({ email });
      if (!user) {
        //if there is NOT a user with the given credentials
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] }); //let the user know that they provided invalid credentials
      }

      // User found, now make sure the password matches
      //bcrypt's compare() method takes in a plain-text password and an encrypted password and compares them and tells you if they're a match or not
      const isMatch = await bcrypt.compare(password, user.password); //first parameter is our plain-text password
      //second parameter is the encrypted password of the user provided by the database

      if (!isMatch) {
        //if the passwords do not match
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] }); //let the user know that they provided invalid credentials
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router; //export the router
