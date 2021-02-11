import React from "react";
import { func } from "prop-types";
import { Button, Divider, Grid } from "@material-ui/core";
import { useStyles } from "../styles";

export const DexSettingsButtons = ({
  toggleShinySprites,
  toggleShowFormes,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => toggleShowFormes()}
          >
            Toggle Formes
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => toggleShinySprites()}
          >
            Toggle Shiny Sprites
          </Button>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </>
  );
};

DexSettingsButtons.propTypes = {
  toggleShinySprites: func.isRequired,
  toggleShowFormes: func.isRequired,
};
