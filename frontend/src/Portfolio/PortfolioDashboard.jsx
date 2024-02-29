//React Imports
import React from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { createUserProfile, editUserProfile, logout } from "../store";

//Component and Function Imports
import PortfolioNav from "./PortfolioNav";
import BlogpostsContent from "../Blog/BlogpostsContent";
import { formatToDollar } from "../Components/functions";
import { businessPaperImg } from "../assets/ImageObjects";

//Style imports
import "./PortfolioStyles.css";

const PortfolioDashboard = () => {
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
        <div className="portfolio-home-div-inner">THE DASHBOARD.</div>
      </div>
      <main className="portfolio-dashboard-container-grid">
        <div className="portfolio-dashboard-explore-services">
          <div>
            <div className="explore-services-heading">Explore Our Resources</div>
            <div className="explore-services-desc">Finding helpful tips, tools, and guides to master your business loans.</div>
            <Link>Link</Link>
          </div>
          <div>
            <div className="explore-services-heading">Talk with Vali</div>
            <div className="explore-services-desc">Friendly loan and equity experts, that are happy to help!</div>
            <Link>Link</Link>
          </div>
          <div>
            <div className="explore-services-heading">Whiteglove Service</div>
            <div className="explore-services-desc">
              From selling your business to utilizing more complex financing, Vali has you covered.
            </div>
            <Link>Link</Link>
          </div>
        </div>
        <ul className="portfolio-dashboard-information">
          <li>Latest Dashboard Version. All fake data.</li>
          <li>ID: {auth.id}</li>
          <li>Username: {auth.username}</li>
          <li>Admin Status: {auth.adminStatus.toString()}</li>
          <li>Email: {auth.email}</li>
          <li>First Name: {auth.firstName}</li>
          <li>Last Name: {auth.lastName}</li>
          <li>City: {auth.city}</li>
          <li>State: {auth.state}</li>
          <li>Google ID: {auth.googleId}</li>
          <li>Mailing List: {auth.mailingList.toString()}</li>
          <li>Is New User: {auth.isNewUser.toString()}</li>
          <li>
            Business:
            <ul>
              <li>ID: {auth.business.id}</li>
              <li>Name: {auth.business.name}</li>
              <li>User ID: {auth.business.userId}</li>
              <li>Category of Business: {auth.business.categoryOfBusiness}</li>
              <li>Years Open: {auth.business.yearsOpen}</li>
              <li>Number of Partners: {auth.business.numberOfPartners}</li>
              <li>Number of Locations: {auth.business.numberOfLocations}</li>
              <li>Description: {auth.business.description}</li>
              <li>Legal Structure: {auth.business.legalStructure}</li>
              <li>Main Products: {auth.business.mainProducts}</li>
              <li>Services Offered: {auth.business.servicesOffered}</li>
              <li>Key Markets: {auth.business.keyMarkets}</li>
              <li>Major Competitors: {auth.business.majorCompetitors}</li>

              <li>
                Financial Info:
                {auth.business.financial_infos.map((info) => (
                  <ul key={info.id}>
                    {info.year}
                    <li>Net Income: {formatToDollar(info.netIncome)}</li>
                    <li>Debt: {formatToDollar(info.debt)}</li>
                    <li>Equity: {formatToDollar(info.equity)}</li>
                    <li>Revenue: {formatToDollar(info.revenue)}</li>
                    <li>Assets: {formatToDollar(info.assets)}</li>
                    <li>Liabilities: {formatToDollar(info.liabilities)}</li>
                    <li>Operating Expenses: {formatToDollar(info.operatingExpenses)}</li>
                    <li>Cash Flow: {formatToDollar(info.cashFlow)}</li>
                  </ul>
                ))}
              </li>
            </ul>
          </li>
        </ul>
        <div className="portfolio-dashboard-learning-center">
          <h1 className="portfolio-dashboard-learning-center-title">Learning Center</h1>
          <BlogpostsContent showPictures={false} maxPosts={4} />
        </div>
      </main>
    </div>
  );
};

export default PortfolioDashboard;
