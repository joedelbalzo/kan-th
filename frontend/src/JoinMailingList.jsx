//React Imports
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//Component Imports

//Store Imports
import { useDispatch } from "react-redux";
import axios from "axios";

//Other Imports
import FinanceUpArrow from "./assets/FinanceUpArrow";

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
    console.log(email);
    const emailError = validateEmail(email);
    if (emailError) {
      setError(true);
    } else {
      const response = await axios.post(`/api/auth/mailinglist`, { email: email });
      console.log(response);
      setSuccess(true);
    }
  };

  const styles = {
    div: {
      maxWidth: "500px",
      minWidth: "350px",
      margin: "0 auto",
    },
    form: {
      display: "flex",

      width: "400px",
      margin: "4px auto",
    },
    input: {
      width: "250px",
      padding: ".5rem",
      borderRadius: ".5rem",
      margin: "0 auto",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "130px",
      height: "45px",
      padding: ".5rem",
      borderRadius: ".5rem",
      margin: "0 auto",
      backgroundColor: "#183333",
      color: "whitesmoke",
    },
  };

  return (
    <div className="join-mailing-list" style={styles.div}>
      <strong>Subscribe for updates.</strong>
      <br /> Weekly updates on financing trends, valuations and platform features.
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
