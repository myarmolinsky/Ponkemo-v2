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
          {pokedex.map((item) => (
            <Link key={item.name} to={`/pokedex/${item.id}`}>
              <div className="pokedex-item">
                <img src={item.sprite} className="sprite" alt={item.name} />
                <span
                  className={
                    item.name.length < 15 ? "caption" : "small-caption"
                  }
                >
                  [{item.name}]
                </span>
              </div>
            </Link>
          ))}
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
