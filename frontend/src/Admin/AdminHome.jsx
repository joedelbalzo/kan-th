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

//Component Style Imports
import "./adminstyles.css";

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
      <h3 className="admin-header">Hey there, boss. Here's where the magic happens:</h3>

      <div className="admin-nav">
        <Link to="/admin/posts" state={{ post: null, type: "create" }}>
          Create New Post
        </Link>
        <br />
        <Link to="/admin/posts" state={{ post: null, type: "create" }}>
          Need Help?
        </Link>
      </div>
      {blogposts.map((blogpost) => {
        return (
          <div key={blogpost.id} className="admin-blogpost">
            <ul>
              <li>Title: {blogpost.title}</li>
              <li>Subtitle: {blogpost.subtitle}</li>
              <div className="admin-blogpost-options">
                <button onClick={() => hideArchivePost(blogpost)}>Hide and Archive</button>
                <button>
                  <Link to="/admin/posts" state={{ post: blogpost, type: "edit" }}>
                    Edit
                  </Link>
                </button>
              </div>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
