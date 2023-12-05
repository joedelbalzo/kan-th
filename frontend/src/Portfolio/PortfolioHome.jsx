//React Imports
import React from "react";
import { useNavigate, Link } from "react-router-dom";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { createUserProfile, editUserProfile } from "../store";

const PortfolioHome = () => {
  const auth = useSelector((state) => state.auth);
  // need businesses in the state to be able to pull information with the user's businessId
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    event.preventDefault();
    if (validateForm()) {
      // Submit the form data or perform additional actions here
      console.log(formData);
    }
  };
  return (
    <div>
      Hey, {auth.username}! You're successfully in the portfolio page. Please update this contact info, so we can stay in touch as our
      features progress and we can begin to personalize your business portfolio.
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
      </form>
    </div>
  );
};

export default PortfolioHome;
