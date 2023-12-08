//React Imports
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

//Component Imports
import LoginComponent from "./Components/LoginComponent";
import { barberImg } from "./assets/ImageObjects";
import { FadeComponent } from "./assets/FadeComponent";

//Store Imports
import { attemptLogin, loginWithGoogle, logout } from "./store";
import { useDispatch, useSelector } from "react-redux";

//Other Imports

const LoginPage = () => {
  return (
    <FadeComponent>
      <div className="login-page">
        <div className="login-page-image-section">
          <img src={barberImg.src} alt={barberImg.alt} />
        </div>
        <div className="login-page-component">
          <LoginComponent />
        </div>
      </div>
    </FadeComponent>
  );
};

export default LoginPage;
