//React Imports
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//Component Imports

//Store Imports
import { attemptLogin, register, logout } from "../store";
import { useDispatch, useSelector } from "react-redux";

//Other Imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FadeComponent } from "../assets/FadeComponent";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginComponent = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginComponentState, setLoginComponentState] = useState("login");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    try {
      window.localStorage.removeItem("token");
      const response = await dispatch(attemptLogin(credentials));
      if (response == true) {
        navigate("/admin");
      } else navigate("/portfolio");
    } catch (err) {
      setErrorMessage("username or password is incorrect");
    }
  };

  const create = async (ev) => {
    ev.preventDefault();
    try {
      window.localStorage.removeItem("token");
      const response = await dispatch(register(credentials));
      if (response == "success") {
        navigate("/portfolio");
      }
      //insert redirect to profile page
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
    // console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV == "development") {
      window.location.href = "https://localhost:3000/api/auth/google";
    } else {
      window.location.href = "https://usevali.com/api/auth/google";
    }
  };

  if (errorMessage) {
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  }

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
      <div className="login" style={{ paddingTop: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-around", borderBottom: "1px solid #183333", paddingBottom: "4px" }}>
          <h2
            onClick={() => {
              setLoginComponentState("login");
            }}
            style={{ cursor: "pointer", color: loginComponentState == "login" ? "#183333" : "#18333340" }}
          >
            Sign in to Vali
          </h2>
          <h2
            onClick={() => {
              setLoginComponentState("create");
            }}
            style={{ cursor: "pointer", color: loginComponentState == "create" ? "#183333" : "#18333340" }}
          >
            Create Account
          </h2>
        </div>

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
            margin: ".2rem auto",
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
        {loginComponentState == "login" ? (
          <>
            <form onSubmit={login} style={{ display: "flex" }}>
              <TextField label="email" value={credentials.username} name="username" onChange={onChange} />
              <div style={{ marginBottom: 1 }} />
              <TextField
                id="filled-password-input"
                label="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {auth.id != null ? (
                <button type="submit" onClick={() => handleLogout()} className="logout-button">
                  logout
                </button>
              ) : (
                <button type="submit" className="login-button">
                  Login &rarr;
                </button>
              )}
            </form>
            {auth.username == "admin" && (
              <div>
                <Link to="/admin" style={buttonStyles}>
                  Admin Tools
                </Link>
              </div>
            )}
            <div
              style={{
                margin: "0 auto",
                color: "darkred",
                fontSize: "calc(10px + 0.5vw)",
                fontStyle: "italic",
                minHeight: "2vh",
              }}
            >
              {errorMessage ? errorMessage : <div style={{ minHeight: "16px" }}></div>}
            </div>
          </>
        ) : (
          <>
            <form onSubmit={create} style={{ display: "flex" }}>
              <TextField label="email" value={credentials.username} name="username" onChange={onChange} />
              <div style={{ marginBottom: 1 }} />
              <TextField
                id="filled-password-input"
                label="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="filled-password-input"
                label="confirm password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={credentials.confirmPassword}
                onChange={onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <button type="submit" className="login-button">
                Create &rarr;
              </button>
            </form>

            <div
              style={{
                margin: "0 auto",
                color: "darkred",
                fontSize: "calc(10px + 0.5vw)",
                fontStyle: "italic",
                minHeight: "2vh",
              }}
            >
              {errorMessage ? errorMessage : <div style={{ minHeight: "16px" }}></div>}
            </div>
          </>
        )}
      </div>
    </FadeComponent>
  );
};

export default LoginComponent;
