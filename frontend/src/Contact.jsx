//React Imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";

//Component Imports
import { passItOnImg } from "./assets/ImageObjects";
import { FadeComponent } from "./assets/FadeComponent";

//Store Imports

//Etc Imports
import axios from "axios";

function Contact() {
  const dispatch = useDispatch();

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
    ev.preventDefault();
    console.log(emailForm);
    try {
      const response = await axios.post("https://www.usevali.com/api/contact", emailForm);
      console.log(response, "response");
    } catch (error) {
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
                style={{ height: "100px" }}
                placeholder="Your message"
                value={emailForm.message}
                onChange={handleChange}
              />
              <button type="submit">SUBMIT</button>
              {/* <h3 className="page-subheader">or email us at vali@usevali.com</h3> */}
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
