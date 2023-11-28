import React from "react";
import { Outlet } from "react-router-dom";

const PortfolioWrapper = () => {
  return (
    <div>
      <h1>Portfolio Section</h1>
      <Outlet />
    </div>
  );
};

export default PortfolioWrapper;
