import axios from "axios";
const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  return state;
};

export const loginWithGoogle = () => {
  return async (dispatch) => {
    try {
      // Extract the token from the URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        window.localStorage.setItem("token", token);
        const response = await axios.get("/api/auth/me", {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: "SET_AUTH", auth: response.data });
      }
    } catch (error) {
      console.error("Error handling Google OAuth response:", error);
    }
  };
};

export const handleGoogleOAuthResponse = (token) => {
  return async (dispatch) => {
    window.localStorage.setItem("token", token);
    dispatch(loginWithToken());
  };
};

export const logout = () => {
  window.localStorage.removeItem("token");
  return { type: "SET_AUTH", auth: {} };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("/api/auth", {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: "SET_AUTH", auth: response.data });
      } catch (ex) {
        return console.log("Login Invalid");
      }
    }
  };
};

export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth", credentials);
    window.localStorage.setItem("token", response.data.token);
    dispatch(loginWithToken());
  };
};

export const register = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth/register", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export default auth;
