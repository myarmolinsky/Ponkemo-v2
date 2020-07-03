import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllPokemon } from "../../actions/pokemon";
import Spinner from "../layout/Spinner";

const Pokedex = ({ getAllPokemon, pokemon: { pokedex, loading } }) => {
  useEffect(() => {
    getAllPokemon();
  }, [getAllPokemon]);

  return (
    <Fragment>
      {pokedex === null || loading ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          {pokedex.map((
            item // for each item in the pokedex
          ) =>
            Math.floor(item.id) === item.id ? (
              <Link key={item.name} to={`/pokedex/${item.id}`}>
                {/* Create a link leading to the pokemon's page */}
                <div className="pokedex-item">
                  <img
                    src={item.sprite}
                    className="sprite pokedex-sprite"
                    alt={item.name}
                  />
                  {/* Pokemon's sprite */}
                  <span className="caption">
                    [
                    {item.name
                      .split(" ")[0]
                      .substring(item.name.split(" ")[0].length - 1) === "." || // this covers for pokemon like Mr. Mime
                    item.name
                      .split(" ")[0]
                      .substring(item.name.split(" ")[0].length - 1) === ":" // this covers for pokemon like Type: Null
                      ? item.name.split(" ")[0] + " " + item.name.split(" ")[1]
                      : item.name.split(" ")[0] === "Arceus-Normal" // cover for Arceus
                      ? "Arceus"
                      : item.name
                          .split(" ")[0]
                          .substring(0, item.name.split(" ")[0].length - 1) ===
                        "Indeedee"
                      ? "Indeedee" // cover for Indeedee
                      : item.name.split(" ")[0]}
                    ]
                  </span>
                  {/* Pokemon's name */}
                </div>
              </Link>
            ) : (
              ""
            )
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Pokedex.propTypes = {
  getAllPokemon: PropTypes.func.isRequired,
  pokemon: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  pokemon: state.pokemon,
});

export default connect(mapStateToProps, { getAllPokemon })(Pokedex);
