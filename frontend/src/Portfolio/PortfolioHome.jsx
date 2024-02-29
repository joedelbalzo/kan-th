//React Imports
import React from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { createUserProfile, editUserProfile, logout } from "../store";
import { businessPaperImg } from "../assets/ImageObjects";

//Style imports
import "./PortfolioStyles.css";
import PortfolioNav from "./PortfolioNav";

const PortfolioHome = () => {
  const auth = useSelector((state) => state.auth);
  // need businesses in the state to be able to pull information with the user's businessId
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!auth) {
    return null;
  }

  return (
    <div className="portfolio-grid">
      <PortfolioNav />
      <div className="portfolio-home-div">
        <div className="portfolio-home-div-inner">Hey, {auth.firstName}. We're glad you're here.</div>
        {auth.username == "jimbo" && auth.lastName == "Del Balzo" && (
          <div style={{ textAlign: "center" }}>
            And because you're a fake account, you can{" "}
            <Link to="/portfolio/dashboard" style={{ textDecoration: "underline" }}>
              click here
            </Link>{" "}
            to see your dashboard.
          </div>
        )}
      </div>
      <div className="portfolio-grid-container">
        <img src={businessPaperImg.src} alt={businessPaperImg.alt} className="portfolio-image" />
        <main style={{ margin: "2rem auto", width: "80%", fontSize: "24px", textAlign: "center" }}>
          We've added you to our mailing list! You'll be regularly informed about updates and changes, especially as new features become
          available. We're excited to have you here.
          <br />
          <br />
          Let's get you and your business the financing you've earned!
          <Link to="/" className="portfolio-submit-button">
            Home
          </Link>
          <Link to="/" className="portfolio-submit-button" onClick={() => dispatch(logout())} id="logout">
            Logout
          </Link>
        </main>
      </div>
    </div>
  );
};

export default PortfolioHome;
