import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PortfolioWrapper = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isNewUser) {
      navigate("/portfolio/edit");
    }
  }, [auth, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default PortfolioWrapper;
