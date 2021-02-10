import React, { Fragment, useContext } from "react";
import { UserContext } from "../../context";
import { MenuItem } from "./MenuItem";

export const Menu = () => {
  const { user } = useContext(UserContext);
  return (
    <Fragment>
      <h1 className="large text-primary">Menu</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.username}</i>
        {/*if the user exists, show the user's name*/}
      </p>
      <MenuItem>catch</MenuItem>
      <MenuItem>forage</MenuItem>
      <MenuItem>train</MenuItem>
      <MenuItem>breed</MenuItem>
      <MenuItem>shop</MenuItem>
      <MenuItem>recycle</MenuItem>
      <MenuItem>battle</MenuItem>
      <MenuItem>contest</MenuItem>
      {/* THIS IS WHERE ALL THE BUTTONS FOR CATCHING, FORAGING, TRAINING, ETC GO */}
    </Fragment>
  );
};
