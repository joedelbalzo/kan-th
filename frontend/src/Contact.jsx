//React Imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";

//Component Imports
import { passItOnImg } from "./assets/ImageObjects";
import { FadeComponent } from "./assets/FadeComponent";
import Loading from "./assets/Loading";

//Store Imports

//Etc Imports
import axios from "axios";

function Contact() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [emailForm, setEmailForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailForm({
      ...emailForm,
      [name]: value,
    });
  };

  const handleSubmit = async (ev) => {
    setLoading(true);
    ev.preventDefault();
    try {
      const response = await axios.post("https://www.usevali.com/api/contact", emailForm);
      if (response.status == 200) {
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error("Error:", error.response);
    }
  };

  return (
    <FadeComponent>
      <div>
        <div className="contact-div">
          <div className="contact-div-inner">
            <h2 className="contact-title">Questions or Comments?</h2> <h3 className="contact-subtitle"> Feel free to connect with us.</h3>
          </div>
        </div>
        <div className="contact-page">
          <div className="contact-page-component">
            {" "}
            <form className="contact-main-form" onSubmit={handleSubmit}>
              <input id="name" type="name" name="name" placeholder="Your Name" value={emailForm.name} onChange={handleChange} />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={emailForm.email}
                onChange={handleChange}
              />
              <input id="subject" type="subject" name="subject" placeholder="Subject" value={emailForm.subject} onChange={handleChange} />
              <textarea
                id="message"
                name="message"
                style={{ height: "100px", fontFamily: "Rubik" }}
                placeholder="Your message"
                value={emailForm.message}
                onChange={handleChange}
              />
              {loading ? (
                <button type="submit" disabled>
                  <Loading height={"10px"} width={"10px"} />
                </button>
              ) : (
                <button type="submit">SUBMIT</button>
              )}
              {error && (
                <div style={{ color: "red", fontSize: "14px" }}>Submission error! Please email us at vali@usevali.com. Thank you!</div>
              )}
            </form>
          </div>
          <div className="contact-page-image-section">
            <img src={passItOnImg.src} alt={passItOnImg.alt} />
          </div>
        </div>
      </div>
    </FadeComponent>
  );
}

export default Contact;
