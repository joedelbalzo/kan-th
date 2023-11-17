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
import SideNav from "./SideNav";

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

  const blogposts = useSelector((state) => state.blogposts.allBlogposts);

  if (!blogposts) {
    return null;
  }

  const sampleText = (content) => {
    content = DOMPurify.sanitize(content);
    const arrContent = content.split(" ");
    content = arrContent.splice(0, 70).join(" ");
    return parse(content);
  };

  let homePic;
  let bannerPic;
  let contentPic;
  const pics = (blogpost) => {
    homePic = null;
    bannerPic = null;
    contentPic = null;
    for (let image of blogpost.images) {
      if (image.position == "home") {
        homePic = image.awsPicURL;
      } else if (image.position == "content") {
        contentPic = image.awsPicURL;
      } else if (image.position == "banner") {
        bannerPic = image.awsPicURL;
      }
    }
  };

  return (
    <div>
      <div>
        <h1>The Vali Blog</h1>
      </div>
      <div style={{ marginBottom: "2rem" }}>
        <h2>Helping SMBs achieve their full potential.</h2>
      </div>
      <div className="post-grid">
        <div className="post-info">
          <SideNav />
        </div>
        {blogposts.map((blogpost) => {
          pics(blogpost);
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
                <img src={homePic} className="post-title-div-picture" />
                <h3 style={{ fontWeight: 400 }}>{blogpost.subtitle}</h3>
                <div className="post-tags">
                  Tags:
                  <Link key={blogpost.tags[0].id} style={{ marginLeft: 4 }}>
                    {blogpost.tags[0].tagName}
                  </Link>
                  ,
                  <Link key={blogpost.tags[1].id} style={{ marginLeft: 4 }}>
                    {blogpost.tags[1].tagName}
                  </Link>
                  ,
                  <Link key={blogpost.tags[2].id} style={{ marginLeft: 4 }}>
                    {blogpost.tags[2].tagName}{" "}
                  </Link>
                </div>
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
