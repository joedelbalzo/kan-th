import axios from "axios";

const initialState = {
  allBlogposts: [],
  filteredBlogposts: [],
};

const blogposts = (state = initialState, action) => {
  if (action.type === "REQUEST_BLOGPOSTS") {
    return { ...state, allBlogposts: action.blogposts };
  }
  if (action.type === "REQUEST_BLOGPOSTS_BY_TAG") {
    return { ...state, filteredBlogposts: action.blogposts };
  }
  if (action.type === "REQUEST_POST") {
    return { ...state, allBlogposts: action.blogposts };
  }

  if (action.type === "CREATE_BLOGPOST") {
    return { ...state, allBlogposts: [action.blogpost, ...state.allBlogposts] };
  }

  if (action.type === "EDIT_BLOGPOST") {
    return {
      ...state,
      allBlogposts: state.allBlogposts.map((blogpost) =>
        blogpost.id === action.blogpost.id ? action.blogpost : blogpost
      ),
    };
  }

  if (action.type === "DELETE_BLOGPOST") {
    return {
      ...state,
      allBlogposts: state.allBlogposts.filter((blogpost) => blogpost.id !== action.blogpost.id),
    };
  }

  return state;
};

export const fetchBlogposts = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/blogposts");
    const sorted = response.data.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    dispatch({ type: "REQUEST_BLOGPOSTS", blogposts: sorted });
  };
};

export const fetchBlogByID = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/blogposts/${id}`);
    console.log("response DATA in store", response.data);
    dispatch({ type: "REQUEST_POST", blogposts: response.data });
  };
};

export const fetchBlogpostsByTag = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/tags/${id}`);
    const sorted = response.data.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    dispatch({ type: "REQUEST_BLOGPOSTS_BY_TAG", blogposts: sorted });
  };
};

export const createBlogpost = (blogpost) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/blogposts/", blogpost, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_BLOGPOST", blogpost: response.data });
  };
};

//SO this is going to have to make two axios calls, one to blogposts and one to images. the ID needs to go with each.
//
export const editBlogpost = (formData, blogData, id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    let blogResponse;
    const imageResponse = await axios.put(`/api/images/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: token,
      },
    });
    if (imageResponse.status === 200) {
      blogResponse = await axios.put(`/api/blogposts/${id}`, blogData, {
        headers: {
          authorization: token,
        },
      });
      console.log("blog response in store", blogResponse);
    }
    dispatch({ type: "EDIT_BLOGPOST", blogpost: blogResponse.data });
  };
};

export const deleteBlogpost = (blogpost) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/blogposts/${blogpost.id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "DELETE_BLOGPOST", blogpost });
  };
};

export default blogposts;
