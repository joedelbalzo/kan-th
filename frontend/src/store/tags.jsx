import axios from "axios";

const tags = (state = [], action) => {
  if (action.type === "REQUEST_TAGS") {
    return action.tags;
  }
  if (action.type === "CREATE_TAG") {
    return [action.tag, ...state];
  }
  if (action.type === "EDIT_TAG") {
    return state.map((tag) => (tag.id === action.tag.id ? action.tag : tag));
  }

  if (action.type === "DELETE_TAG") {
    return state.filter((_tag) => _tag.id !== action.tag.id);
  }

  return state;
};

export const fetchTags = () => {
  return async (dispatch) => {
    const response = await axios.get("/api/tags");
    dispatch({ type: "REQUEST_TAGS", tags: response.data });
  };
};

export const createTag = (tag) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.post("/api/tags/", tag, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "CREATE_TAG", tag: response.data });
  };
};

export const deleteTag = (tag) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    await axios.delete(`/api/tags/${tag.id}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "DELETE_TAG", tag });
  };
};

export default tags;
