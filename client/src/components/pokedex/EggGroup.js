import React, { Fragment, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { any } from "prop-types";
import { PokemonContext } from "../../context";
import Spinner from "../layout/Spinner";
import { SearchFilter, Dex } from "../common";

export const EggGroup = ({ match }) => {
  const { pokedex, loading } = useContext(PokemonContext);

  const [filteredPokedex, setFilteredPokedex] = useState([]);
  const [eggGroup, setEggGroup] = useState([]);

  useEffect(() => {
    setEggGroup(
      pokedex.filter((pokemon) =>
        pokemon.breeding.eggGroups.includes(match.params.eggGroup)
      )
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
          <Link to="/egggroups" className="btn btn-dark">
            To Egg Groups
          </Link>
          <br />
          <br />
          <h1 className="large text-primary">
            {match.params.eggGroup} Egg Group
          </h1>
          <Fragment>
            <SearchFilter
              pokedex={eggGroup}
              setFilteredPokedex={(filtered) => setFilteredPokedex(filtered)}
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

EggGroup.propTypes = {
  match: any.isRequired,
};
