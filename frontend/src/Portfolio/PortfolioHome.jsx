//React Imports
import React from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { createUserProfile, editUserProfile } from "../store";

//Style imports
import "./PortfolioStyles.css";

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
      Hey, {auth.firstName}! You're successfully in the portfolio page. Now that you're here, let's get you on our mailing list to you can
      see our new features as they come. Let's get you and your business the financing you've earned. you deserve.
    </div>
  );
};

export default PortfolioHome;
