//React Imports
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { createUserProfile } from "../store";

//Component Imports
import Loading from "../assets/Loading";
import image from "../assets/pexels-tim-douglas.webp";

//Style imports
import "./PortfolioStyles.css";
import PortfolioNav from "./PortfolioNav";

// notes
// needs a confirmation when everything is submitted.

const PortfolioAccountInfo = () => {
  const auth = useSelector((state) => state.auth);
  // need businesses in the state to be able to pull information with the user's businessId
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!auth) {
    return null;
  }

  const [formData, setFormData] = useState({
    firstName: auth && auth.firstName ? auth.firstName : "",
    lastName: auth && auth.lastName ? auth.lastName : "",
    businessName: auth && auth.businessName ? auth.businessName : "",
    email: auth && auth.email ? auth.email : "",
    city: auth && auth.city ? auth.city : "",
    state: auth && auth.state ? auth.state : "",
    updates: auth && typeof auth.updates === "boolean" ? auth.updates : true,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    // Basic validation checks
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      async function create() {
        try {
          setLoading(true);
          await axios.post(`/api/auth/mailinglist`, { email: formData.email });
          //gotta create a way for a user to get off this
          const response = await dispatch(createUserProfile(formData, auth)).then(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
              navigate("/portfolio/home");
              setSuccess(false);
            }, 2000);
            console.log("Dispatch successful");
          });
          if (!response) {
            setLoading(false);
          }
        } catch (ex) {
          console.log(ex);
          setError("Could not change portfolio. We'll get right on it!");
        }
      }
      create();
    }
  };
  return (
    <div>
      <div className="portfolio-grid">
        <PortfolioNav />
        <div className="portfolio-account-info-home-div">
          {auth.isNewUser ? (
            <div className="portfolio-account-info-home-div-inner">Welcome! Let's personalize your experience.</div>
          ) : (
            <>
              <div className="portfolio-account-info-home-div-inner">Edit Account Settings</div>
            </>
          )}
        </div>
        <div className="portfolio-account-info">
          <form className="portfolio-grid-form" onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input
              type="text"
              className="portfolio-form-input-fields"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}

            <label>Last Name:</label>
            <input
              type="text"
              className="portfolio-form-input-fields"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}

            <label>Company:</label>
            <input
              type="text"
              className="portfolio-form-input-fields"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
            />

            <label>Email:</label>
            <input type="email" className="portfolio-form-input-fields" name="email" value={formData.email} onChange={handleInputChange} />
            {errors.email && <span className="error">{errors.email}</span>}

            <label>City:</label>
            <input type="text" className="portfolio-form-input-fields" name="city" value={formData.city} onChange={handleInputChange} />

            <label>State:</label>
            <input type="text" className="portfolio-form-input-fields" name="state" value={formData.state} onChange={handleInputChange} />

            <div className="checkbox">
              <label className="checkbox-label">Subscribe for Updates?</label>
              <input type="checkbox" className="checkbox-input" name="updates" checked={formData.updates} onChange={handleInputChange} />
            </div>

            {!success && (
              <button type="submit" className="portfolio-account-info-submit-button">
                Submit
              </button>
            )}
            {loading && <Loading height={"10px"} width={"10px"} borderWidth={"3px"} />}
            {success && (
              <button type="submit" style={{ fontSize: "16px" }} className="portfolio-account-info-submit-button" disabled>
                Saved! Redirecting.
              </button>
            )}
          </form>
          <img src={image} className="portfolio-account-info-image" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioAccountInfo;
