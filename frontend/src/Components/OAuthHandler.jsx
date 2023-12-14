import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../store";

function OAuthHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  const [isTokenHandled, setTokenHandled] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(loginWithGoogle(token)).then(() => {
        setTokenHandled(true);
        navigate("/portfolio");
      });
      // navigate("/");
    }
  }, [token]);

  return <div>Success</div>;
}

export default OAuthHandler;
