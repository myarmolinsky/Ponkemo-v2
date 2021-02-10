import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom"; //we want to use 'Link' instead of 'a href'
import { UserContext } from "../../context";

export const Navbar = () => {
  const { logout, isAuthenticated, loading } = useContext(UserContext);

  const authLinks = (
    <ul>
      <li>
        <Link to="/menu">
          <i className="fas fa-user"></i>{" "}
          {/*the above line is so that an icon is displayed with the button*/}
          <span className="hide-sm">Menu</span>{" "}
          {/*the span surrounding 'Menu' is so that it shows up on mobile devices*/}
        </Link>
      </li>
      <li>
        <Link to="/pokedex">
          <i className="fas fa-circle"></i>{" "}
          {/*the above line is so that an icon is displayed with the button*/}
          <span className="hide-sm">Pokedex</span>{" "}
          {/*the span surrounding 'Menu' is so that it shows up on mobile devices*/}
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/login">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/pokedex">
          <i className="fas fa-circle"></i>{" "}
          {/*the above line is so that an icon is displayed with the button*/}
          <span className="hide-sm">Pokedex</span>{" "}
          {/*the span surrounding 'Menu' is so that it shows up on mobile devices*/}
        </Link>
      </li>
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
    <nav className="navbar">
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
