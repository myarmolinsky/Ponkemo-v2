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
                  <span className="caption">[{item.name}]</span>
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
