//React Imports
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

//Component Imports
import Login from "./Login";
import Nav from "./Nav";
import ShareButtons from "./ShareButtons";
import SideNav from "./SideNav";

//Store Imports
import { fetchBlogpostsByTag } from "./store";

//Function Imports
import { readableDate, pics } from "./functions";

//The is my terrible blog that really needs an overhaul: https://blog.usetheo.com/. I want it to look more consumery and friendly, rounded fonts, subtle colors.

const Blogposts_Tags = () => {
  let tag = useParams();
  tag = tag.id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogposts = useSelector((state) => state.blogposts.filteredBlogposts);

  if (!blogposts) {
    return null;
  } else {
    console.log(blogposts);
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
        <div className="post-info">
          <SideNav />
        </div>
        {blogposts.map((blogpost) => {
          const { homePic, bannerPic, contentPic } = pics(blogpost);
          console.log(homePic, bannerPic, contentPic);

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
                {homePic ? (
                  <>
                    <img src={homePic.awsPicURL} className="post-title-div-picture" />{" "}
                    <div className="picture-caption">{homePic.picCaption}</div>
                  </>
                ) : (
                  ""
                )}
                <h3 style={{ fontWeight: 400 }}>{blogpost.subtitle}</h3>
                <div>
                  {" "}
                  tags:
                  {blogpost.tags.map((tag) => {
                    return <Link key={tag.id}>{tag.tagName},</Link>;
                  })}
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

export default Blogposts_Tags;
