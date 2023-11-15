//React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

//Component Imports
import Login from "./Login";
import Nav from "./Nav";
import ShareButtons from "./ShareButtons";

//Store Imports
import { fetchBlogposts } from "./store";

//The is my terrible blog that really needs an overhaul: https://blog.usetheo.com/. I want it to look more consumery and friendly, rounded fonts, subtle colors.

export const readableDate = (date) => {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, date.length);
  let months = [
    0,
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (month[0] == 0) {
    month = months[month[1]];
  } else month = months[month];

  return `${month} ${day}, ${year}`;
};

const Blogposts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { blogposts } = useSelector((state) => state);

  if (!blogposts) {
    return null;
  }

  const sampleText = (content) => {
    content = DOMPurify.sanitize(content);
    const arrContent = content.split(" ");
    content = arrContent.splice(0, 70).join(" ");
    return parse(content);
  };

  return (
    <div>
      <div>
        <h1>The Vali Blog</h1>
      </div>
      <div>
        <h2>Helping SMBs achieve their full potential.</h2>
      </div>
      <div className="post-grid">
        <div className="post-info">Tags, Author, Etc</div>
        {blogposts.map((blogpost) => {
          return (
            <div className="post-content" key={blogpost.id}>
              <div className="post-title-div">
                <span className="post-date">Date: {readableDate(blogpost.publishedAt)}</span>
                <Link
                  to={`/posts/${blogpost.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h2>{blogpost.title}</h2>
                </Link>
                <img src={blogpost.homePicURL} className="post-title-div-picture" />
                <h3 style={{ fontWeight: 400 }}>{blogpost.subtitle}</h3>
                <ShareButtons />
                <div className="post-body">
                  {sampleText(blogpost.content)}{" "}
                  <Link to={`/posts/${blogpost.id}`}>...read more</Link>
                </div>
              </div>
              <div className="post-bottom-border"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogposts;
