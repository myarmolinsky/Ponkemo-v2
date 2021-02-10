import React, { useContext } from "react";
import { UserContext } from "../../context";
import { Spinner } from "../layout";
import { Dex } from "../common";

export const Profile = () => {
  const { user, loading, ownedPokemon } = useContext(UserContext);

  return loading || !user || !ownedPokemon ? (
    <Spinner />
  ) : (
    <>
      {user && `${user.username}`}
      <Dex dex={ownedPokemon.map((poke) => poke.pokemon)} />
    </>
  );
};
