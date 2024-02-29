//React Imports
import React from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";

//Style imports
import "./PortfolioStyles.css";
import Person from "../assets/PortfolioIcons/Person";
import Home from "../assets/PortfolioIcons/Home";
import Dashboard from "../assets/PortfolioIcons/Dashboard";

const PortfolioNav = () => {
  const auth = useSelector((state) => state.auth);
  // need businesses in the state to be able to pull information with the user's businessId
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!auth) {
    return null;
  }

  console.log(<Dashboard />);

  return (
    <>
      <div className="portfolio-nav-container">
        <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
          <Link to="/portfolio/home" className="portfolio-nav-links">
            <Home />
          </Link>
          <Link to="/portfolio/dashboard" className="portfolio-nav-links">
            <Dashboard />
          </Link>{" "}
          <Link to="/portfolio/edit" className="portfolio-nav-links">
            <Person />
          </Link>
        </nav>
      </div>
    </>
  );
};

export default PortfolioNav;
