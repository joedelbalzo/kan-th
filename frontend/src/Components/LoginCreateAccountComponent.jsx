//React Imports
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//Component Imports

//Store Imports

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

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const login = async (ev) => {
    ev.preventDefault();
    try {
      window.localStorage.removeItem("token");
      await dispatch(attemptLogin(credentials));
      //insert redirect to profile page
    } catch (err) {
      setErrorMessage("username or password is incorrect");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  console.log("is the logincreateaccountcomponent ever used?");

  const handleGoogleLogin = () => {
    window.localStorage.removeItem("token");
    window.location.href = "http://localhost:3000/api/auth/google";
    dispatch(loginWithGoogle());
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
        <h2>Create Your Account</h2>
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
        <form onSubmit={login} style={{ display: "flex" }}>
          <TextField label="username" value={credentials.username} name="username" onChange={onChange} />
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
            // <Button type="submit" onClick={() => handleLogout()} style={{ fontSize: "1.2rem" }}>
            <button type="submit" onClick={() => handleLogout()} className="logout-button">
              logout
            </button>
          ) : (
            <button type="submit" className="login-button">
              Login &rarr;
            </button>
            // <Button type="submit" style={{ fontSize: "1.2rem" }}>
            //   Login
            // </Button>
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
      </div>
    </FadeComponent>
  );
};

export default LoginComponent;
