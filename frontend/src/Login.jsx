//React Imports
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//Component Imports
import Nav from "./Nav";
import { ThemeContext } from "./ThemeContext";

//Store Imports
import { attemptLogin, loginWithGoogle, logout } from "./store";
import { useDispatch, useSelector } from "react-redux";

//Other Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FadeComponent } from "./assets/FadeComponent";

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
      window.localStorage.removeItem("token");

      await dispatch(attemptLogin(credentials));
    } catch (err) {
      setErrorMessage("username or password is incorrect");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  const handleGoogleLogin = () => {
    window.localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/api/auth/google";
    dispatch(loginWithGoogle());
  };

  const buttonStyles = {
    color: "inherit",
    width: "80px",
    padding: "8px",
    margin: "auto",
    border: "2px solid inherit",
    borderRadius: "4px",
  };

  return (
    <FadeComponent>
      <div className="login" style={{ paddingTop: "2rem" }}>
        <h2>Sign in to Vali</h2>
        <div>
          {" "}
          <button className="login-with-google-btn" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "1rem auto",
          }}
        >
          {" "}
          <div
            style={{
              width: "40px",
              height: "1px",
              outline: "1px solid #183333",
              backgroundColor: "darkgray",
              borderRadius: "2rem",
              marginRight: "1rem",
            }}
          ></div>
          or{" "}
          <div
            style={{
              width: "40px",
              height: "1px",
              outline: "1px solid #183333",
              backgroundColor: "darkgray",

              borderRadius: "2rem",
              marginLeft: "1rem",
            }}
          ></div>
        </div>
        <form onSubmit={login} style={{ display: "flex" }}>
          <TextField label="username" value={credentials.username} name="username" onChange={onChange} />
          <div style={{ marginBottom: 1 }} />
          <TextField
            id="filled-password-input"
            label="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={onChange}
          />
          {auth.id != null ? (
            <Button type="submit" onClick={() => handleLogout()} style={{ fontSize: "1.2rem" }}>
              Logout
            </Button>
          ) : (
            <Button type="submit" style={{ fontSize: "1.2rem" }}>
              Login
            </Button>
          )}
        </form>
        {auth.username == "admin" && (
          <div>
            <Link to="/admin" style={buttonStyles}>
              Admin Tools
            </Link>
            <button onClick={() => handleLogout()} style={buttonStyles}>
              Admin Logout
            </button>
          </div>
        )}
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
    </FadeComponent>
  );
};

export default Login;
