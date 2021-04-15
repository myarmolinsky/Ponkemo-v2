import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom"; //we want to use 'Link' instead of 'a href'
import { UserContext } from "../../context";

export const Navbar = () => {
  const { logout, isAuthenticated, loading } = useContext(UserContext);

  const authLinks = (
    <ul>
      <li>
        <Link to="/menu">
          <i className="fas fa-bars" /> Menu
        </Link>
      </li>
      <li>
        <Link to="/pokedex">
          <i className="fas fa-layer-group" /> Pokedex
        </Link>
      </li>
      <li>
        <Link to="/pc">
          <i className="fas fa-desktop" /> PC
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <i className="fas fa-address-card" /> Profile
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/login">
          <i className="fas fa-sign-out-alt" /> Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/pokedex">
          <i className="fas fa-layer-group" /> Pokedex
        </Link>
      </li>
      <li>
        <Link to="/register">
          <i className="fas fa-user-plus" /> Register
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="fas fa-sign-in-alt" /> Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar">
      <h1>
        <Link to="/">Ponkemo</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
