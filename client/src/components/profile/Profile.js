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
      <div className="text-primary large">
        User: <span className="text-dark">{user && `${user.username}`}</span>
      </div>
      <Divider className={classes.divider} />
      <div
        className="text-primary"
        style={{
          fontSize: "150%",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Owned Pokemon
      </div>
      <SearchFilter
        pokedex={ownedPokemonDex}
        setFilteredDex={(filtered) => setFilteredOwnedPokemon(filtered)}
      />
      <Dex dex={filteredOwnedPokemon} />
    </>
  );
};
