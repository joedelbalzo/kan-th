//React Imports
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//Component Imports
import Nav from "./Nav";
import { ThemeContext } from "./ThemeContext";

//Store Imports
import { attemptLogin } from "./store";
import { useDispatch, useSelector } from "react-redux";

//Other Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Login = () => {
  const auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useContext(ThemeContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    try {
      await dispatch(attemptLogin(credentials));
    } catch (err) {
      setErrorMessage("username or password is incorrect");
    }
  };

  return (
    <div id="login" style={{ paddingTop: "2rem" }}>
      <h2 style={{ paddingBottom: "1rem" }}>Login</h2>
      <form style={{ display: "flex" }}>
        <TextField
          label="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
        />
        <div style={{ marginBottom: 1 }} />
        <TextField
          id="filled-password-input"
          label="password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={onChange}
        />
        <Button type="submit" onClick={login} style={{ fontSize: "1.2rem" }}>
          Login
        </Button>
      </form>
      <div
        style={{
          margin: "0 auto",
          color: "darkred",
          fontSize: "calc(4px + 0.5vw)",
          fontStyle: "italic",
          minHeight: "2vh",
        }}
      >
        {errorMessage ? errorMessage : <div style={{ minHeight: "(6px + 0.5vw)" }}></div>}
      </div>
    </div>
  );
};

export default Login;
