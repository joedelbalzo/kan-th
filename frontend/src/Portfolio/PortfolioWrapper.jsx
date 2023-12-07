import React from "react";
import { Outlet } from "react-router-dom";

const PortfolioWrapper = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PortfolioWrapper;
