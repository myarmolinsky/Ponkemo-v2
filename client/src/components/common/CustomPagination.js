import React from "react";
import { any, number, func } from "prop-types";
import Pagination from "@material-ui/lab/Pagination";

export const CustomPagination = ({ children, pages, currentPage, setPage }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Pagination
        count={pages}
        page={currentPage}
        showFirstButton
        showLastButton
        onChange={handleChange}
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
      {children}
      <Pagination
        count={pages}
        page={currentPage}
        showFirstButton
        showLastButton
        onChange={handleChange}
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    </>
  );
};

CustomPagination.propTypes = {
  children: any.isRequired,
  pages: number.isRequired,
  currentPage: number.isRequired,
  setPage: func.isRequired,
};
