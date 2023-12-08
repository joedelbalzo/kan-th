//React Imports
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { createUserProfile } from "../store";

//Component Imports
import Loading from "../assets/Loading";
import image from "../assets/pexels-tim-douglas.webp";

//Style imports
import "./PortfolioStyles.css";

const PortfolioPersonalize = () => {
  const auth = useSelector((state) => state.auth);
  // need businesses in the state to be able to pull information with the user's businessId
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    city: "",
    state: "",
    updates: false,
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
    console.log("handling");
    console.log(formData);
    console.log(auth);
    event.preventDefault();
    if (validateForm() && auth.isNewUser) {
      async function create() {
        try {
          setLoading(true);
          const response = await dispatch(createUserProfile(formData));
          if (response) {
            setLoading(false);
            navigate("/portfolio/home");
            return;
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
      <div className="portfolio-personalize-home-div">
        <div className="portfolio-personalize-home-div-inner">Welcome! Let's personalize your experience.</div>
      </div>
      <div className="portfolio-grid-container">
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

          <button type="submit" className="portfolio-personalize-submit-button">
            Submit
          </button>
          {loading && <Loading height={"10px"} width={"10px"} borderWidth={"3px"} />}
        </form>
        <img src={image} className="portfolio-personalize-image" />
      </div>
    </div>
  );
};

export default PortfolioPersonalize;
