import React, { useEffect, useState, useContext } from "react";
import { Divider } from "@material-ui/core";
import { useStyles } from "../styles";
import { UserContext } from "../../context";
import { Spinner } from "../layout";
import { Dex, SearchFilter, CustomPagination } from "../common";

export const Profile = () => {
  const classes = useStyles();

  const { user, loading, ownedPokemon, loadUser } = useContext(UserContext);

  const [ownedPokemonDex, setOwnedPokemonDex] = useState([]);
  const [filteredOwnedPokemon, setFilteredOwnedPokemon] = useState([]);
  const [page, setPage] = useState(1);

  const PAGE_LENGTH = 48; // how many Pokemon to show per page
  const PAGES = Math.ceil(filteredOwnedPokemon.length / PAGE_LENGTH); // how many pages there are

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (ownedPokemon) {
      setOwnedPokemonDex(ownedPokemon.map((pokemon) => pokemon.pokemon));
      setFilteredOwnedPokemon(ownedPokemon.map((pokemon) => pokemon.pokemon));
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
      <CustomPagination pages={PAGES} currentPage={page} setPage={setPage}>
        <Dex
          dex={filteredOwnedPokemon.slice(
            (page - 1) * PAGE_LENGTH,
            page * PAGE_LENGTH
          )}
        />
      </CustomPagination>
    </>
  );
};
