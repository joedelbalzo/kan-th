//React Imports
import React from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";

const PortfolioHome = () => {
  const auth = useSelector((state) => state.auth);
  // need businesses in the state to be able to pull information with the user's businessId
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!auth) {
    return null;
  }

  return (
    <div>
      Hey, {auth.username}! You're successfully in the portfolio page. Your company's name is {auth.businessId}
    </div>
  );
};

export default PortfolioHome;
