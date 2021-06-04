import React, { useEffect, useContext } from "react";
import { Divider } from "@material-ui/core";
import { useStyles } from "../styles";
import { UserContext } from "../../context";
import { Spinner } from "../layout";

export const Profile = () => {
  const classes = useStyles();

  const { user, loading, loadUser } = useContext(UserContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        Badges
      </div>
      <div>BADGES TODO</div>
    </>
  );
};
