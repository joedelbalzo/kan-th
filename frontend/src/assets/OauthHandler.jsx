// OAuthHandler.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleGoogleOAuthResponse } from "./reduxActions"; // Import your action

const OAuthHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      dispatch(handleGoogleOAuthResponse(token));
    }
  }, [dispatch]);

  return <div>Processing login...</div>;
};

export default OAuthHandler;
