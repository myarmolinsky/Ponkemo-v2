import React, { Fragment } from "react";
import { Link } from "react-router-dom"; //we want to use 'Link' instead of 'a href'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          {/*the above line is so that an icon is displayed with the button*/}
          <span className="hide-sm">Dashboard</span>{" "}
          {/*the span surrounding 'Dashboard' is so that it shows up on mobile devices*/}
        </Link>
      </li>
      <li>
        <Link to="/pokedex">
          <i className="fas fa-circle"></i>{" "}
          {/*the above line is so that an icon is displayed with the button*/}
          <span className="hide-sm">Pokedex</span>{" "}
          {/*the span surrounding 'Dashboard' is so that it shows up on mobile devices*/}
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  //this nav tag came from the 'index.html' provided by the course
  return (
    //changed instances of 'class' to 'className'
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-grin-beam"></i> Ponkemo
        </Link>
      </h1>
      {!loading && ( //if not loading, then do this
        //'?' is a ternary operator (if what is at the left of the '?' is true, then do what is at the right)
        //':' is for else, so if whatever is before the '?' is false then skip everything between the '?' and the ':' and do what is at the right of the ':'
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
