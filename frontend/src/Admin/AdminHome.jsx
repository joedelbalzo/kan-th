//React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Component Imports
import Login from "../Login";
import Nav from "../Nav";

//Store Imports
import { fetchBlogposts } from "../store";
import AdminPosts from "./AdminPosts";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const blogposts = useSelector((state) => state.blogposts);

  if (!auth.id) {
    return null;
  }

  const hideArchivePost = (blogpost) => {
    console.log("hide and archive");
    console.log(blogpost);
  };

  //posts should never REALLY be gone. They should live in the database and go into an archived folder that we can hide

  return (
    <div>
      <h2>Hey there, boss. Here's where the magic happens:</h2>

      <Link to="/admin/posts" state={{ post: null, type: "create" }}>
        Create New Post
      </Link>

      {blogposts.map((blogpost) => {
        return (
          <div key={blogpost.id} style={{ marginBottom: "1rem" }}>
            Title: {blogpost.title}
            <br />
            <button onClick={() => hideArchivePost(blogpost)}>Hide and Archive</button>
            <Link to="/admin/posts" state={{ post: blogpost, type: "edit" }}>
              Edit
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
