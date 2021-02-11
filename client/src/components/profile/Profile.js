import React, { useEffect, useState, useContext } from "react";
import { Divider } from "@material-ui/core";
import { useStyles } from "../styles";
import { UserContext } from "../../context";
import { Spinner } from "../layout";
import { Dex, SearchFilter } from "../common";

export const Profile = () => {
  const classes = useStyles();

  const { user, loading, ownedPokemon, loadUser } = useContext(UserContext);

  const [ownedPokemonDex, setOwnedPokemonDex] = useState([]);
  const [filteredOwnedPokemon, setFilteredOwnedPokemon] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (ownedPokemon) {
      setOwnedPokemonDex(ownedPokemon.map((poke) => poke.pokemon));
      setFilteredOwnedPokemon(ownedPokemon.map((poke) => poke.pokemon));
    }
  }, [ownedPokemon]);

  return loading || !user ? (
    <Spinner />
  ) : (
    <>
      <span className="text-primary large">
        User: {user && `${user.username}`}
      </span>
      <Divider className={classes.divider} />
      <SearchFilter
        pokedex={ownedPokemonDex}
        setFilteredDex={(filtered) => setFilteredOwnedPokemon(filtered)}
      />
      <Dex dex={filteredOwnedPokemon} />
    </>
  );
};
