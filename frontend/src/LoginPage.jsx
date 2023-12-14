//React Imports
import React from "react";

//Component Imports
import LoginComponent from "./Components/LoginComponent";
import { barberImg } from "./assets/ImageObjects";
import { FadeComponent } from "./assets/FadeComponent";

//Store Imports

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
