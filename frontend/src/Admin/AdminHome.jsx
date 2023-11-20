//React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Component Imports
import Login from "../Login";
import Nav from "../Nav";

//Store Imports
import { fetchDraftedBlogposts, deleteBlogpost, publishBlogpost } from "../store";
import AdminPosts from "./AdminPosts";

//Component Style Imports
import "./AdminStyles.css";

//Function Imports
import { readableDate } from "../functions";

//////////////////////////////
//////////////////////////////

// things that still need to happen here:

// blog posts don't delete. they stay on AWS, so that admin can download if absolutely needed. maybe the delete function finds a post by its ID and then changes it's name or something?

// blog posts need a save option. submit vs publish. submit saves, publish makes publishedAt == now and published == true
// // saving needs a time stamp

// saving the latest to local storage, regardless of hitting the save button? maybe this happens like every 2-3 minutes?
// // but then would this get it's own load button? like you'd have to get back into editing the same way you get back in from a file you save

// some basic documentation and image-adding help needs to be here.

// pagination.

// form fields do not have css that matches the dark mode / light mode. borders and text invisible on black bg

//////////////////////////////
//////////////////////////////

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const blogposts = useSelector((state) => state.blogposts.allBlogposts);
  const drafts = useSelector((state) => state.blogposts.draftedBlogposts);

  if (!auth.id) {
    return null;
  }

  const hideArchivePost = (blogpost) => {
    console.log("hide and archive");
    console.log(blogpost);
    dispatch(deleteBlogpost(blogpost));
  };
  const publish = (blogpost) => {
    console.log("publish!");
    console.log(blogpost);
    dispatch(publishBlogpost(blogpost));
  };

  return (
    <div>
      <h3 className="admin-header">
        Hey there, boss. Here's where the magic happens. Below is the list of published posts,
        drafted posts, and handy little help guide.{" "}
      </h3>

      <div className="admin-nav">
        <Link to="/admin/posts" state={{ post: null, type: "create" }}>
          Create New Post
        </Link>
        <br />
        <Link to="/admin/posts" state={{ post: null, type: "create" }}>
          Need Help?
        </Link>
      </div>
      <div className="admin-grid">
        <div className="admin-grid-published">
          <h2>Published Posts</h2>
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
        <div className="admin-grid-drafted">
          <h2>Drafted Posts</h2>
          {drafts.map((blogpost) => {
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
                    <button onClick={() => publish(blogpost)}>Publish!</button>
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
        <div className="admin-grid-help">
          <h2>Help</h2>
        </div>
      </div>
    </div>
  );
};

export default Admin;
