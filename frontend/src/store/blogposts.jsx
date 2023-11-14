import axios from "axios";

const blogposts = (state = [], action) => {
  if (action.type === "REQUEST_BLOGPOSTS") {
    return action.blogposts;
  }
  if (action.type === "CREATE_BLOGPOST") {
    return [action.blogpost, ...state];
  }
  if (action.type === "EDIT_BLOGPOST") {
    return state.map((blogpost) =>
      blogpost.id === action.blogpost.id ? action.blogpost : blogpost
    );
  }

  if (action.type === "DELETE_BLOGPOST") {
    return state.filter((_blogpost) => _blogpost.id !== action.blogpost.id);
  }

  return state;
};

export const fetchBlogposts = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/blogposts");
    console.log("response in store", response);
    console.log("response DATA in store", response.data);
    dispatch({ type: "REQUEST_BLOGPOSTS", blogposts: response.data });
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
