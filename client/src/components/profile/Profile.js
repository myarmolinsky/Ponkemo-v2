import React, { useContext } from "react";
import { Divider } from "@material-ui/core";
import { useStyles } from "../styles";
import { UserContext } from "../../context";
import { Spinner } from "../layout";
import { Dex } from "../common";

export const Profile = () => {
  const { user, loading, ownedPokemon } = useContext(UserContext);
  const classes = useStyles();

  return loading || !user || !ownedPokemon ? (
    <Spinner />
  ) : (
    <>
      <span className="text-primary large">
        User: {user && `${user.username}`}
      </span>
      <Divider className={classes.divider} />
      <Dex dex={ownedPokemon.map((poke) => poke.pokemon)} />
    </>
  );
};
