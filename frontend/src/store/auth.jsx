import axios from "axios";

let authState;
export const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    authState = action.auth;
    return action.auth;
  }
  return state;
};
//auth
export const loginWithGoogle = () => {
  return async (dispatch) => {
    try {
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
  authState = null;
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

//users
const initialState = {
  allUsers: [],
  filteredUsers: [],
  user: null,
};

export const usersAndProfiles = (state = initialState, action) => {
  if (action.type === "FETCH_USERS") {
    if (authState.adminStatus === true) {
      return { allUsers: action.users };
    }
  }
  if (action.type === "FETCH_ONE_USER") {
    return { filteredUsers: action.user };
  }
  if (action.type === "FETCH_FILTERED_USERS") {
    if (authState.admin === true) {
      return { ...state, filteredUsers: action.users };
    }
  }
  if (action.type === "CREATE_USER_PROFILE" || action.type === "EDIT_USER_PROFILE") {
    if (authState.admin === true || state.currentUser.id === action.user.id) {
      return { ...state, currentUser: action.user };
    }
  }
  if (action.type === "ARCHIVE_USER_PROFILE") {
    if (state.currentUser.role === "admin" || state.currentUser.id === action.user.id) {
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user.id !== action.user.id),
      };
    }
  }
  return state;
};

export const fetchUsers = () => {
  // only done by admin to get the list of all users
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get(`/api/auth/users`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "FETCH_USERS", users: response.data });
    return response;
  };
};
export const fetchOneUser = (user) => {
  // done by admin or done by user themselves
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get(`/api/auth`, user, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "FETCH_ONE_USER", user: response.data });
    return response;
  };
};

export const fetchFilteredUsers = (param) => {
  //again, done only by admin
  return async (dispatch) => {
    const response = await axios.get(`/api/auth/filteredusers`, param);
    dispatch({ type: "REQUEST_POST", users: response.data });
  };
};

export const createUserProfile = (user) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    let response = await axios.post(`/api/users/`, user, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_USER_PROFILE", user: response.data });
  };
};

export const editUserProfile = (blogpost) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");

    let blogResponse = await axios.put(`/api/blogposts/publish/${blogpost.id}`, blogpost.id, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "PUBLISH_BLOGPOST", blogpost: blogResponse.data });
  };
};

export const archiveUserProfile = (blogpost) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const blogResponse = await axios.put(`/api/blogposts/hidden/${blogpost.id}`, blogpost, {
      headers: {
        authorization: token,
      },
    });
    console.log("blog response in store", blogResponse);
    dispatch({ type: "HIDE_BLOGPOST", blogpost: blogResponse.data });
  };
};
// export default {
//   userprofile,
//   auth,
// };
