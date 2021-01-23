import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { array } from "prop-types";
import { Button, Divider, Typography, Avatar, Grid } from "@material-ui/core";
import { useStyles } from "../styles";

export const Dex = ({ dex }) => {
  const classes = useStyles();

  const [showFormes, setShowFormes] = useState(false);
  const [shinySprites, setShinySprites] = useState(false);

  const toggleShowFormes = (e) => {
    e.preventDefault();
    setShowFormes(!showFormes);
  };

  const toggleShinySprites = (e) => {
    e.preventDefault();
    setShinySprites(!shinySprites);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.primary}`}
        onClick={(e) => toggleShowFormes(e)}
      >
        Toggle Formes
      </Button>
      <Button
        variant="contained"
        className={`${classes.button} ${classes.primary}`}
        onClick={(e) => toggleShinySprites(e)}
      >
        Toggle Shiny Sprites
      </Button>
      <Divider className={classes.divider} />
      <Grid container>
        {dex.map(
          (
            pokemon // for each pokemon in the pokedex
          ) =>
            (showFormes ||
              (!showFormes && Math.floor(pokemon.id) === pokemon.id)) && (
              <Grid item key={pokemon.name} xs={2}>
                <Link to={`/pokedex/${pokemon.id}`}>
                  {/* Create a link leading to the pokemon's page */}
                  {/* Pokemon's sprite */}
                  <div className="pokedex-item">
                    {!shinySprites ? (
                      <Avatar
                        className={classes.sprite}
                        src={pokemon.sprite}
                        alt={pokemon.name}
                        variant="square"
                      />
                    ) : (
                      <Avatar
                        className={classes.sprite}
                        src={pokemon.shinySprite}
                        alt={pokemon.name}
                        variant="square"
                      />
                    )}
                    {/* Pokemon's name */}
                    <Typography variant="caption">{pokemon.name}</Typography>
                  </div>
                </Link>
              </Grid>
            )
        )}
      </Grid>
    </Fragment>
  );
};

Dex.propTypes = {
  dex: array.isRequired,
};
