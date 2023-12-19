import axios from "axios";

const initialState = {
  allBlogposts: [],
  filteredBlogposts: [],
  draftedBlogposts: [],
  currentBlogpost: null,
};

const blogposts = (state = initialState, action) => {
  if (action.type === "REQUEST_BLOGPOSTS") {
    return { ...state, allBlogposts: action.blogposts };
  }
  if (action.type === "FILTER_BLOGPOSTS_BY_TAG") {
    const filtered = state.allBlogposts.filter((blogpost) => blogpost.tags.some((tag) => tag.id === action.tagId));
    return { ...state, filteredBlogposts: filtered };
  }
  if (action.type === "REQUEST_DRAFTS") {
    return { ...state, draftedBlogposts: action.blogposts };
  }
  if (action.type === "REQUEST_POST") {
    return { ...state, currentBlogpost: action.blogpost };
  }

  if (action.type === "CREATE_BLOGPOST") {
    return { ...state, allBlogposts: [action.blogpost, ...state.allBlogposts] };
  }
  if (action.type === "PUBLISH_BLOGPOST") {
    return {
      ...state,
      draftedBlogposts: state.draftedBlogposts.filter((blogpost) => blogpost.id !== action.blogpost.id),
      allBlogposts: [action.blogpost, ...state.allBlogposts],
    };
  }
  if (action.type === "HIDE_BLOGPOST") {
    return {
      ...state,
      allBlogposts: state.allBlogposts.filter((blogpost) => blogpost.id !== action.blogpost.id),
      draftedBlogposts: [action.blogpost, ...state.draftedBlogposts],
    };
  }

  if (action.type === "EDIT_BLOGPOST") {
    return {
      ...state,
      allBlogposts: state.allBlogposts.map((blogpost) => (blogpost.id === action.blogpost.id ? action.blogpost : blogpost)),
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

export const filterBlogpostsByTag = (tagId) => {
  return { type: "FILTER_BLOGPOSTS_BY_TAG", tagId };
};

export const fetchPublishedBlogposts = () => {
  return async (dispatch) => {
    const response = await axios.get(`/api/blogposts`);
    dispatch({ type: "REQUEST_BLOGPOSTS", blogposts: response.data });
  };
};
export const fetchDraftedBlogposts = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/blogposts/drafted");
    dispatch({ type: "REQUEST_DRAFTS", blogposts: response.data });
  };
};

export const fetchBlogByID = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`/api/blogposts/${id}`);
    dispatch({ type: "REQUEST_POST", blogpost: response.data });
  };
};

export const createBlogpost = (formData, captions, blogData, tagData) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");

    let blogResponse = await axios.post(`/api/blogposts/`, blogData, {
      headers: {
        authorization: token,
      },
    });

    let imageResponse = await axios.post(
      `/api/images/${blogResponse.data.id}`,
      { formData, captions },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token,
        },
      }
    );
    let tagResponse = await axios.put(`/api/tags/${blogResponse.data.id}`, tagData, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_BLOGPOST", blogpost: blogResponse.data });
    return blogResponse.data.id;
  };
};

export const publishBlogpost = (blogpost) => {
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

//SO this is going to have to make two axios calls, one to blogposts and one to images. the ID needs to go with each.
//
export const editBlogpost = (formData, captions, blogData, tagData, id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    let blogResponse;
    let tagResponse;
    const imageResponse = await axios.put(
      `/api/images/${id}`,
      { formData, captions },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token,
        },
      }
    );
    if (imageResponse.status === 200) {
      tagResponse = await axios.put(`/api/tags/${id}`, tagData, {
        headers: {
          authorization: token,
        },
      });
    }
    if (tagResponse.status === 200) {
      blogResponse = await axios.put(`/api/blogposts/${id}`, blogData, {
        headers: {
          authorization: token,
        },
      });
    }
    dispatch({ type: "EDIT_BLOGPOST", blogpost: blogResponse.data });
  };
};

export const hideBlogpost = (blogpost) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const blogResponse = await axios.put(`/api/blogposts/hidden/${blogpost.id}`, blogpost, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "HIDE_BLOGPOST", blogpost: blogResponse.data });
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
