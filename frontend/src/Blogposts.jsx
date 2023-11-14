//React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

//Component Imports
import Login from "./Login";
import Nav from "./Nav";

//Store Imports
import { fetchBlogposts } from "./store";

//The is my terrible blog that really needs an overhaul: https://blog.usetheo.com/. I want it to look more consumery and friendly, rounded fonts, subtle colors.

const Blogposts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogposts } = useSelector((state) => state);

  if (!blogposts) {
    return null;
  } else {
    console.log(blogposts);
  }

  return (
    <div>
      {blogposts.map((blogpost) => {
        return (
          <div key={blogpost.id}>
            Title: {blogpost.title}
            <br />
            Date: {blogpost.publishedAt}
            <br />
            <img src={blogpost.homePicURL} style={{ height: 240, width: 180, fit: "contain" }} />
            Content: {parse(blogpost.content)}
            <br />
            <br />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Blogposts;
