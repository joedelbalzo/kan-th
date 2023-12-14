//React Imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate, Link } from "react-router-dom";

//Component Imports

//Store Imports
// import { contact } from "./store";

//Etc Imports
import axios from "axios";

//notes - create a thanks for your submission page for redirecting. set timeout there for 4 seconds to redirect home

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
    try {
      const response = await axios.post("/api/contact", ev);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="contact-div">
        <div className="contact-div-inner">
          <h2 className="contact-title">Contact Us</h2>
        </div>
      </div>

      <h3 className="contact-subheader">Feel free to contact me and I'll be in touch shortly!</h3>
      <form className="contact-main-form" onSubmit={handleSubmit}>
        <input id="name" type="name" name="name" placeholder="Your Name" value={emailForm.name} onChange={handleChange} />
        <input id="email" type="email" name="email" placeholder="Your Email Address" value={emailForm.email} onChange={handleChange} />
        <input id="subject" type="subject" name="subject" placeholder="Subject" value={emailForm.subject} onChange={handleChange} />
        <textarea id="message" name="message" placeholder="Your message" value={emailForm.message} onChange={handleChange} />
        <button type="submit">SUBMIT</button>
        {/* <h3 className="page-subheader">or email us at vali@usevali.com</h3> */}
      </form>
    </div>
  );
}

export default Contact;
