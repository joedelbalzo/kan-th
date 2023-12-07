//React Imports
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { createUserProfile, editUserProfile } from "../store";

//Component Imports
import Loading from "../assets/Loading";

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
      Welcome! Let's personalize your experience.
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </label>
        <br />

        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </label>
        <br />

        <label>
          Company Name:
          <input type="text" name="businessName" value={formData.businessName} onChange={handleInputChange} />
        </label>
        <br />

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <br />

        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
        </label>
        <br />

        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
        </label>
        <br />

        <label>
          <input type="checkbox" name="updates" checked={formData.updates} onChange={handleInputChange} />
          Would you like to be updated as new features arrive?
        </label>
        <br />

        <button type="submit">Submit</button>
        {loading && <Loading height={"10px"} width={"10px"} borderWidth={"3px"} />}
      </form>
    </div>
  );
};

export default PortfolioPersonalize;
