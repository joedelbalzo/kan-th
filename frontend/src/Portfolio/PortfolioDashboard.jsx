//React Imports
import React from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";

//Component and Function Imports
import PortfolioNav from "./PortfolioNav";
import BlogpostsContent from "../Blog/BlogpostsContent";
import { formatToDollar } from "../Components/functions";

//Style imports
import "./PortfolioStyles.css";

const PortfolioDashboard = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!auth) {
    return null;
  }

  console.log(auth);
  console.log(auth.business);

  return (
    <div className="portfolio-grid">
      <PortfolioNav />
      <div className="portfolio-home-div">
        <div className="portfolio-home-div-inner">
          <h1>Welcome back, {auth.firstName}!</h1>
          <p>Your Business Dashboard</p>
        </div>
      </div>
      <main className="portfolio-dashboard-container-grid">
        <section className="portfolio-dashboard-information">
          <div className="business-profile card">
            <div className="card-header">
              <h2>Your Business</h2>
            </div>
            <div className="card-content">
              {auth.business ? (
                <>
                  <p>
                    <strong>Business Name:</strong> {auth.business.name}
                  </p>
                  <p>
                    <strong>Category:</strong> {auth.business.categoryOfBusiness}
                  </p>
                  <p>
                    <strong>Years Open:</strong> {auth.business.yearsOpen}
                  </p>
                  <p>
                    <strong>Description:</strong> {auth.business.description}
                  </p>
                  <p>
                    <strong>Legal Structure:</strong> {auth.business.legalStructure}
                  </p>
                </>
              ) : (
                <p>No business data available.</p>
              )}
            </div>
          </div>
          <div className="financial-information card">
            <div className="card-header">
              <h2>Financial Information</h2>
            </div>
            <div className="card-content">
              {auth.business && auth.business.financial_infos && auth.business.financial_infos.length > 0 ? (
                auth.business.financial_infos.map((info) => (
                  <div key={info.id} className="financial-year">
                    <h3>{info.year}</h3>
                    <p>
                      <strong>Revenue:</strong> {formatToDollar(info.revenue)}
                    </p>
                    <p>
                      <strong>Net Income:</strong> {formatToDollar(info.netIncome)}
                    </p>
                    <p>
                      <strong>Assets:</strong> {formatToDollar(info.assets)}
                    </p>
                    <p>
                      <strong>Liabilities:</strong> {formatToDollar(info.liabilities)}
                    </p>
                    <p>
                      <strong>Equity:</strong> {formatToDollar(info.equity)}
                    </p>
                    <p>
                      <strong>Debt:</strong> {formatToDollar(info.debt)}
                    </p>
                    <p>
                      <strong>Operating Expenses:</strong> {formatToDollar(info.operatingExpenses)}
                    </p>
                    <p>
                      <strong>Cash Flow:</strong> {formatToDollar(info.cashFlow)}
                    </p>
                  </div>
                ))
              ) : (
                <p>No financial data available.</p>
              )}
            </div>
          </div>
          <div className="user-profile card">
            <div className="card-header">
              <h2>User Profile</h2>
            </div>
            <div className="card-content">
              <p>
                <strong>Username:</strong> {auth.username}
              </p>
              <p>
                <strong>Email:</strong> {auth.email}
              </p>
              <p>
                <strong>First Name:</strong> {auth.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {auth.lastName}
              </p>
              <p>
                <strong>Location:</strong> {auth.city}, {auth.state}
              </p>
            </div>
          </div>
        </section>
        <section className="portfolio-dashboard-learning-center">
          <div className="resources-section">
            <h2>Explore Our Resources</h2>
            <div className="resources-grid">
              <div className="resource-card">
                <h3>Helpful Tips & Guides</h3>
                <p>Find tools and guides to master your business loans.</p>
                <Link to="/resources">Learn More &rarr;</Link>
              </div>
              <div className="resource-card">
                <h3>Talk with Vali</h3>
                <p>Friendly loan and equity experts are happy to help!</p>
                <Link to="/contact">Get in Touch &rarr;</Link>
              </div>
              <div className="resource-card">
                <h3>Whiteglove Service</h3>
                <p>We have you covered for complex financing and selling your business.</p>
                <Link to="/services">Explore Services &rarr;</Link>
              </div>
            </div>
          </div>
          <div className="learning-center">
            <h2>Learning Center</h2>
            <BlogpostsContent showPictures={false} maxPosts={2} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PortfolioDashboard;
