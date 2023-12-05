// import axios from "axios";
// import store from "./index";

// const initialState = {
//   allUsers: [],
//   filteredUsers: [],
//   user: null,
// };

// const userprofile = (state = initialState, action) => {
//   const authState = store.getState().auth;
//   console.log("in the store", authState);

//   if (action.type === "FETCH_USERS") {
//     if (authState.adminStatus === true) {
//       return { allUsers: action.users };
//     }
//   }
//   if (action.type === "FETCH_ONE_USER") {
//     return { filteredUsers: action.user };
//   }
//   if (action.type === "FETCH_FILTERED_USERS") {
//     if (authState.admin === true) {
//       return { ...state, filteredUsers: action.users };
//     }
//   }
//   if (action.type === "CREATE_USER_PROFILE" || action.type === "EDIT_USER_PROFILE") {
//     if (authState.admin === true || state.currentUser.id === action.user.id) {
//       return { ...state, currentUser: action.user };
//     }
//   }
//   if (action.type === "ARCHIVE_USER_PROFILE") {
//     if (state.currentUser.role === "admin" || state.currentUser.id === action.user.id) {
//       return {
//         ...state,
//         allUsers: state.allUsers.filter((user) => user.id !== action.user.id),
//       };
//     }
//   }
//   return state;
// };

// export const fetchUsers = () => {
//   // only done by admin to get the list of all users
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     const response = await axios.get(`/api/auth/users`, {
//       headers: {
//         authorization: token,
//       },
//     });
//     dispatch({ type: "FETCH_USERS", users: response.data });
//   };
// };
// export const fetchOneUser = (user) => {
//   // done by admin or done by user themselves
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     const response = await axios.get(`/api/auth`, user, {
//       headers: {
//         authorization: token,
//       },
//     });
//     dispatch({ type: "FETCH_ONE_USER", user: response.data });
//   };
// };

// export const fetchFilteredUsers = (param) => {
//   //again, done only by admin
//   return async (dispatch) => {
//     const response = await axios.get(`/api/auth/filteredusers`, param);
//     dispatch({ type: "REQUEST_POST", users: response.data });
//   };
// };

// export const createUserProfile = (user) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     let response = await axios.post(`/api/users/`, user, {
//       headers: {
//         authorization: token,
//       },
//     });
//     dispatch({ type: "CREATE_USER_PROFILE", user: response.data });
//   };
// };

// export const editUserProfile = (blogpost) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");

//     let blogResponse = await axios.put(`/api/blogposts/publish/${blogpost.id}`, blogpost.id, {
//       headers: {
//         authorization: token,
//       },
//     });
//     dispatch({ type: "PUBLISH_BLOGPOST", blogpost: blogResponse.data });
//   };
// };

// export const archiveUserProfile = (blogpost) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     const blogResponse = await axios.put(`/api/blogposts/hidden/${blogpost.id}`, blogpost, {
//       headers: {
//         authorization: token,
//       },
//     });
//     console.log("blog response in store", blogResponse);
//     dispatch({ type: "HIDE_BLOGPOST", blogpost: blogResponse.data });
//   };
// };
// export default userprofile;
