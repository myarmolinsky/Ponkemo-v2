import React, { Fragment, useState } from "react"; //we bring in the 'useState' hook because we are using a functional component
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { register } from "../../actions/auth";
import PropTypes from "prop-types"; //any time we use a prop, we have to import PropTypes

// import axios from "axios";

//since it's a form, we need to have some component state because each input needs to have its own state
//they also needs to have an 'onchange' handler so when we type in it, it updates the state
const Register = ({ register, isAuthenticated }) => {
  //props gets passed as a parameter because we are using connect
  //we destructured props
  const [formData, setFormData] = useState(
    //pull this from useState()
    {
      //default values go inside here
      username: "",
      email: "",
      password: "",
      password2: "",
    }
  );

  const { username, email, password, password2 } = formData; //destructure and pull those values from the state 'formData'
  //the first thing inside the [] brackets is our state, which is 'formData', so it will be an object with all the field values
  //the second thing is the function we want to use to update our state, which is 'setFormData'

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value }); //'onChange' calls 'setFormData()
  //in 'setFormData()' we want to change the state but we only want to change the 'name' field so we make a copy of 'formData' with the spread operator ('...')
  //after copying the state, we put in the field we want to change and what we want to change it to
  //we want to change the field associated with the name of the part of the form we are filling out so we use '[e.target.name]' to get the name of it
  //and we set the field to the new value in the part of the form we are changing by using 'e.target.value'

  const onSubmit = async (e) => {
    e.preventDefault(); //do this because this is a submit
    if (password !== password2) {
      console.log("password mismatch");
    } else {
      register({ username, email, password });
    }
  };

  // Redirect to dashboard if already logged in/registered
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username} // set the 'Username' part of the form to the 'name' value we get from the state 'formData'
            onChange={(e) => onChange(e)} //we need an onChange handler to be able to type inside the component
            //the goal is to call 'setFormData()' and to update the 'name' field in the state
            //we could call 'setFormData()' directly but we are calling a seperate onChange function instead
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
//every time we import connect, we have to export it by doing 'export default connect()()' and putting what we're exporting in the second parantheses (in this case 'Register')
//whenever you want to bring in an action, you have to pass it into connect()
//the first parameter of connect() is any state that you want to map (so if you want to get state from profile you put that)
//we are making it null because we aren't trying to map a state
//the second parameter is an object with any actions you want to use
