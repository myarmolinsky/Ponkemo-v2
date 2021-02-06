import React from "react";

export const AccessDenied = () => {
  return (
    <div className="center">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i> Access Denied
      </h1>
      <p className="large">Sorry, you are not allowed to access this page</p>
    </div>
  );
};
