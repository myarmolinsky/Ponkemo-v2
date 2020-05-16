import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //if the token exists, set 'x-auth-token' in headers to the token
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    //if the token does not exist, 'x-auth-token' from headers
    delete axios.defaults.headers.common["x-auth-token"];
  }
  //we are doing this because when we have a token, we will just send it with every request instead of picking which requests to send it with
};

export default setAuthToken;
