//React Imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
// import * as DOMPurify from "dompurify";

//Component Imports

import ShareButtons from "../ShareButtons";
import SideNav from "./SideNav";

//Store Imports

//Function Imports
import { readableDate, pics } from "../functions";

//The is my terrible blog that really needs an overhaul: https://blog.usetheo.com/. I want it to look more consumery and friendly, rounded fonts, subtle colors.

const Blogpost_Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.blogposts.allBlogposts.find((post) => post.id.toString() === id));

  if (!post) {
    return null;
  }

  const { homePic, bannerPic, contentPic } = pics(post);

  // console.log(homePic, bannerPic, contentPic);

  // };
  //GOTTA INSERT A WAY TO CREDIT WHOEVER TOOK THE PHOTO. This should go in the database.
  const textReplace = (content) => {
    const bannerRegex = /%% banner picture goes here %%/g;
    const contentRegex = /%% content picture goes here %%/g;
    bannerPic
      ? (content = content.replace(
          bannerRegex,
          `<div><img src="${bannerPic.awsPicURL}" style="height: 240px; width: 100%; object-fit: contain;" /></div>`
        ))
      : "";

    contentPic
      ? (content = content.replace(
          contentRegex,
          `<img src="${contentPic.awsPicURL}" style="height: 240px; width: 180px; object-fit: contain;" />`
        ))
      : "";

    content = DOMPurify.sanitize(content);
    return parse(content);
  };

  return (
    <div>
      <div className="post-grid">
        <div className="post-info">
          <SideNav />
        </div>
        <div className="post-content">
          <div className="post-title-div">
            <span className="post-date">Date: {readableDate(post.publishedAt)}</span>
            <h1>{post.title}</h1>
            {homePic ? (
              <>
                <img src={homePic.awsPicURL} className="post-title-div-picture" />
                <div className="picture-caption">{homePic.picCaption}</div>
              </>
            ) : (
              ""
            )}

            <h2 style={{ fontWeight: 400 }}>{post.subtitle}</h2>
            {/* tags */}
            <ShareButtons />
          </div>
          <br />
          <br />
          <div className="post-content">{textReplace(post.content)}</div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Blogpost_Single;
