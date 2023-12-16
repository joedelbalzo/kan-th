//React Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Component Imports
import AdminHelp from "./AdminHelp";
import AdminNav from "./AdminNav";

//Store Imports
import { publishBlogpost, hideBlogpost } from "../store";

//Component Style Imports
import "./AdminStyles.css";

//Function Imports
// import { readableDate } from "../functions";

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
  const [hidden, setHidden] = useState(0);
  const [archive, setArchive] = useState(0);

  const auth = useSelector((state) => state.auth);
  const blogposts = useSelector((state) => state.blogposts.allBlogposts);
  const drafts = useSelector((state) => state.blogposts.draftedBlogposts);

  if (!auth.id) {
    return null;
  }

  const hidePost = (blogpost) => {
    console.log("Hidden");
    dispatch(hideBlogpost(blogpost));
  };
  const publish = (blogpost) => {
    dispatch(publishBlogpost(blogpost));
  };

  return (
    <div>
      <AdminNav />

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
                    {hidden === blogpost.id ? (
                      <>
                        <button className="admin-confirm" onClick={() => hidePost(blogpost)}>
                          Confirm Hide
                        </button>
                        <button className="admin-cancel" onClick={() => setHidden(0)}>
                          Cancel Hide
                        </button>
                      </>
                    ) : (
                      <button onClick={() => setHidden(blogpost.id)}>Hide</button>
                    )}
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
                    {archive ? (
                      <>
                        <button className="admin-confirm" onClick={() => hidePost(blogpost)}>
                          Confirm Archive
                        </button>
                        <button className="admin-cancel" onClick={() => setArchive(0)}>
                          Cancel Archive
                        </button>
                      </>
                    ) : (
                      <button onClick={() => setArchive(blogpost.id)}>Archive</button>
                    )}
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
      </div>
    </div>
  );
};

export default Admin;
