//React Imports
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Component Imports

//Store Imports
import { useDispatch } from "react-redux";
import axios from "axios";

//Other Imports
import FinanceUpArrow from "../assets/FinanceUpArrow";

const JoinMailingList = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || email.length === 0) {
      return "Email is required";
    }
    if (!regex.test(email)) {
      return "Invalid email format";
    }
    return null;
  };

  const joinMailingList = async (ev) => {
    ev.preventDefault();
    // console.log(email);
    const emailError = validateEmail(email);
    if (emailError) {
      setError(true);
    } else {
      const response = await axios.post(`/api/auth/mailinglist`, { email: email });
      // console.log(response);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail("");
      }, 3000);
    }
  };

  const styles = {
    div: {
      width: "325px",
      margin: "0 auto",
    },
    form: {
      display: "flex",
      width: "325px",
      margin: "4px auto",
    },
    input: {
      width: "200px",
      padding: ".2rem",
      borderRadius: ".5rem",
      margin: "0 5px",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100px",
      height: "30px",
      padding: ".5rem",
      borderRadius: ".5rem",
      margin: "0 5px",
      backgroundColor: "#183333",
      color: "whitesmoke",
      cursor: "pointer",
    },
  };

  return (
    <div className="join-mailing-list" style={styles.div}>
      <strong>Subscribe for Updates</strong>
      <br /> <span style={{ fontSize: "13px" }}>Financing trends, valuations, and platform features.</span>
      <form onSubmit={joinMailingList} style={styles.form}>
        <input type="email" id="email" style={styles.input} onChange={(ev) => setEmail(ev.target.value)}></input>

        {success ? (
          <button style={styles.button} disabled>
            Success!
          </button>
        ) : (
          <button type="submit" style={styles.button}>
            Subscribe{"  "} <FinanceUpArrow height="26px" width="26px" />
          </button>
        )}
      </form>
    </div>
  );
};

export default JoinMailingList;
