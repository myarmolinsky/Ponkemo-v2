import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { array } from "prop-types";
import { Button, Divider, Grid } from "@material-ui/core";
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
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => toggleShowFormes(e)}
          >
            Toggle Formes
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => toggleShinySprites(e)}
          >
            Toggle Shiny Sprites
          </Button>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <div style={{ textAlign: "center" }}>
        <Grid container spacing={3}>
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
                    <div
                      className="pokedex-item"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <img
                        className="sprite"
                        src={
                          shinySprites ? pokemon.shinySprite : pokemon.sprite
                        }
                        alt={pokemon.name}
                      />
                      {/* Pokemon's name */}
                      <p variant="caption">{pokemon.name}</p>
                    </div>
                  </Link>
                </Grid>
              )
          )}
        </Grid>
      </div>
    </Fragment>
  );
};

Dex.propTypes = {
  dex: array.isRequired,
};
