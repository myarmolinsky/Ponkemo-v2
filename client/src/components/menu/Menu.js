import React from "react";
import { Grid } from "@material-ui/core";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  return (
    <div className="center">
      <Grid container>
        <Grid item xs={12}>
          <MenuItem text="catch" color="#426ff5" />
          <MenuItem text="forage" color="#6ff542" />
        </Grid>
        <Grid item xs={12}>
          <MenuItem text="train" color="#f5f542" />
          <MenuItem text="breed" color="#ff9cf3" />
        </Grid>
        <Grid item xs={12}>
          <MenuItem text="shop" color="#f59e42" />
          <MenuItem text="recycle" color="#2ac0f7" />
        </Grid>
        <Grid item xs={12}>
          <MenuItem text="battle" color="red" />
          <MenuItem text="contest" color="#ff00e0" />
        </Grid>
      </Grid>
    </div>
  );
};
