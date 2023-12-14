import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleGoogleOAuthResponse } from "../store";

function OAuthHandler() {
  // console.log("we did it, Joe");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const [isTokenHandled, setTokenHandled] = useState(false);

  // console.log("Token received in OAuthHandler:", token);

  useEffect(() => {
    if (token) {
      dispatch(handleGoogleOAuthResponse(token));
      setTokenHandled(true);
    }
  }, [token]);

  useEffect(() => {
    // console.log("token handled");
    if (isTokenHandled) {
      navigate("/");
    }
  }, [isTokenHandled]);

  return <div>Success</div>;
}

export default OAuthHandler;
