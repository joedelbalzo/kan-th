import axios from "axios";

let authState = null;
export const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  return state;
};
//auth
export const loginWithGoogle = (token) => {
  return async (dispatch) => {
    try {
      // const urlParams = new URLSearchParams(window.location.search);
      // const token = urlParams.get("token");

      if (token) {
        window.localStorage.setItem("token", token);
        const response = await axios.get("/api/auth/me", {
          headers: {
            authorization: token,
          },
        });
        dispatch({ type: "SET_AUTH", auth: response.data });
        dispatch({ type: "UPDATE_USERS_AND_PROFILES", data: response.data });
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
  return async (dispatch) => {
    window.localStorage.removeItem("token");
    dispatch({ type: "UPDATE_USERS_AND_PROFILES", currentUser: null });
    dispatch({ type: "SET_AUTH", auth: {} });
  };
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
        dispatch({ type: "UPDATE_USERS_AND_PROFILES", data: response.data });
        return response.data.adminStatus;
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
    const dispatchResponse = await dispatch(loginWithToken());
    return dispatchResponse;
  };
};

export const register = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth/register", credentials);
    window.localStorage.setItem("token", response.data.token);
    dispatch(loginWithToken());
  };
};

//users
const initialState = {
  allUsers: [],
  filteredUsers: [],
  currentUser: null,
};

export const usersAndProfiles = (state = initialState, action) => {
  if (action.type === "FETCH_USERS") {
    return { allUsers: action.users };
  }
  if (action.type === "FETCH_ONE_USER") {
    return { filteredUsers: action.user };
  }
  if (action.type === "FETCH_FILTERED_USERS") {
    if (state.currentUser.adminStatus === true) {
      return { ...state, filteredUsers: action.users };
    }
  }
  if (action.type === "CREATE_USER_PROFILE" || action.type === "EDIT_USER_PROFILE") {
    if (state.currentUser.adminStatus === true || state.currentUser.id === action.user.id) {
      return { ...state, currentUser: action.user };
    }
  }
  if (action.type === "ARCHIVE_USER_PROFILE") {
    if (state.currentUser.adminStatus === true || state.currentUser.id === action.user.id) {
      return {
        ...state,
        allUsers: state.allUsers.filter((user) => user.id !== action.user.id),
      };
    }
  }
  if (action.type === "UPDATE_USERS_AND_PROFILES") {
    return { ...state, currentUser: action.data };
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

export const createUserProfile = (formData, user) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");

    let response = await axios.put(
      `/api/auth/user/${user.id}`,
      { formData, user },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: "CREATE_USER_PROFILE", user: response.data });
    return response.data;
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
    // console.log("blog response in store", blogResponse);
    dispatch({ type: "HIDE_BLOGPOST", blogpost: blogResponse.data });
  };
};

//mailing list
const mailingListState = {
  mailingList: [],
};

export const mailingList = (state = mailingListState, action) => {
  if (action.type === "FETCH_MAILINGLIST") {
    if (initialState.currentUser.adminStatus === true) {
      return action.list;
    }
    return state;
  }
};
export const fetchMailingList = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get(`/api/auth/mailinglist`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "FETCH_MAILINGLIST", list: response.data });
    return response;
  };
};
