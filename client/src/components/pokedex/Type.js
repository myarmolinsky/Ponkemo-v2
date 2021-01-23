import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { any } from "prop-types";
import { PokemonContext } from "../../context";
import Spinner from "../layout/Spinner";
import { SearchFilter, Dex } from "../common";

export const Type = ({ match }) => {
  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);
  const [type, setType] = useState([]);

  useEffect(() => {
    setType(
      pokedex.filter((pokemon) => pokemon.types.includes(match.params.type))
    );
  }, [pokedex, match]);

  return (
    <Fragment>
      {pokedex === null || loading ? (
        <Fragment>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <Link to="/types" className="btn btn-dark">
            To Types
          </Link>
          <br />
          <br />
          <h1 className="large text-primary">{match.params.type} Types</h1>
          <Fragment>
            <SearchFilter
              pokedex={type}
              setFilteredPokedex={(filtered) => setFilteredPokedex(filtered)}
              showBothTypes={false}
            />
            <hr style={{ marginTop: "1em" }} />
            <br />
            <Dex dex={filteredPokedex} />
          </Fragment>
        </Fragment>
      )}
    </Fragment>
  );
};

Type.propTypes = {
  match: any.isRequired,
};
