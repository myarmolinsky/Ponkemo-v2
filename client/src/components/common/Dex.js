import React, { useState } from "react";
import { Link } from "react-router-dom";
import { array } from "prop-types";
import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

export const Dex = ({ dex }) => {
  const pageLength = 48;
  const pages = Math.ceil(dex.length / pageLength);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Pagination
        count={pages}
        page={page}
        showFirstButton
        showLastButton
        onChange={handleChange}
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Grid container spacing={3}>
        {dex
          .slice((page - 1) * pageLength, page * pageLength)
          .map((pokemon, index) => (
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
                    src={pokemon.sprite}
                    alt={pokemon.name}
                  />
                  {/* Pokemon's name */}
                  <p variant="caption">{pokemon.name}</p>
                </div>
              </Link>
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={pages}
        page={page}
        showFirstButton
        showLastButton
        onChange={handleChange}
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    </div>
  );
};

Dex.propTypes = {
  dex: array.isRequired,
};
