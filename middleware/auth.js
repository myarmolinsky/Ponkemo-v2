const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  /*
  since this is a middleware function, it takes in 'req', 'res', and 'next' as parameters
  a middleware function is a function that has access to the 'req' and 'res' objects
  'next' is a callback that we have to run once we're done so that we can move onto the next piece of middleware
  */
  // Get token from header
  //when we send a request to a protected route, we need to send a token within a header
  const token = req.header("x-auth-token"); //get the token from the header using req.header() and we're looking 'x-auth-token' which is what we need to send it in

  // Check if no token
  if (!token) {
    //if there is no token
    return res.status(401).json({ msg: "No token, authorization denied" }); //401 is Not Authorized
  }

  // Verify token
  try {
    //if there is a token
    const decoded = jwt.verify(token, config.get("jwtSecret")); //decode the token with jwt.verify()
    //jwt.verify() takes in 2 things: the token which is sent in the header and the jwtSecret we made
    req.user = decoded.user; //assign a value to 'user' from the req object. we set it to the decoded value, which has 'user' in the payload because we sent it in the payload
    next(); //call next() like you would in any middleware
  } catch (err) {
    //runs if token is invalid
    res.status(401).json({ msg: "Token is not valid" });
  }
};
