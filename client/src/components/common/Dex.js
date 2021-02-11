import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { array } from "prop-types";
import { Grid } from "@material-ui/core";

export const Dex = ({ dex, shinySprites, showFormes }) => {
  return (
    <Fragment>
      <div style={{ textAlign: "center" }}>
        <Grid container spacing={3}>
          {dex.map(
            (pokemon, index) =>
              (showFormes ||
                (!showFormes && Math.floor(pokemon.id) === pokemon.id)) && (
                <Grid item key={index} xs={2}>
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
