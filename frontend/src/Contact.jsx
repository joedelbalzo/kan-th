//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Component Imports
import Login from "./Login";

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
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="contact">
      <h2 className="contact-header">CONTACT</h2>
      <h3 className="contact-subheader">Feel free to contact me and I'll be in touch shortly!</h3>
      <form className="contact-main-form" onSubmit={handleSubmit}>
        <input
          id="name"
          type="name"
          name="name"
          placeholder="Your Name"
          value={emailForm.name}
          onChange={handleChange}
        />
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={emailForm.email}
          onChange={handleChange}
        />
        <input
          id="subject"
          type="subject"
          name="subject"
          placeholder="Subject"
          value={emailForm.subject}
          onChange={handleChange}
        />
        <textarea
          id="message"
          name="message"
          placeholder="Your message"
          value={emailForm.message}
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
        {/* <h3 className="page-subheader">or email us at vali@usevali.com</h3> */}
      </form>
    </div>
  );
}

export default Contact;
