//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

//Component Imports
import Login from "./Login";
import Nav from "./Nav";
import ShareButtons from "./ShareButtons";
import { readableDate } from "./Blogposts";

//Store Imports
import { fetchBlogByID } from "./store";

//The is my terrible blog that really needs an overhaul: https://blog.usetheo.com/. I want it to look more consumery and friendly, rounded fonts, subtle colors.

const Blogpost_Single = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.blogposts.find((post) => post.id.toString() === id));

  if (!post) {
    return null;
  }

  // console.log(parse(post.content));

  //GOTTA INSERT A WAY TO CREDIT WHOEVER TOOK THE PHOTO. This should go in the database.
  const textReplace = (content) => {
    const bannerRegex = /%% banner picture goes here %%/g;
    const contentRegex = /%% content picture goes here %%/g;

    content = content.replace(
      bannerRegex,
      `<img src="${post.bannerPicURL}" style="height: 240px; width: 100%; object-fit: contain;" />`
    );
    content = content.replace(
      contentRegex,
      `<img src="${post.contentPicURL}" style="height: 240px; width: 180px; object-fit: contain;" />`
    );

    content = DOMPurify.sanitize(content);
    return parse(content);
  };

  // const readableDate = (date) => {
  //   let year = date.slice(0, 4);
  //   let month = date.slice(5, 7);
  //   let day = date.slice(8, date.length);
  //   let months = [
  //     0,
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  //   if (month[0] == 0) {
  //     month = months[month[1]];
  //   } else month = months[month];

  //   return `${month} ${day}, ${year}`;
  // };

  return (
    <div>
      <div className="post-grid">
        <div className="post-info">Tags, Author, Etc</div>
        <div className="post-content">
          <div className="post-title-div">
            <span className="post-date">Date: {readableDate(post.publishedAt)}</span>
            <h2>{post.title}</h2>
            <img src={post.homePicURL} className="post-title-div-picture" />
            <h3 style={{ fontWeight: 400 }}>{post.subtitle}</h3>
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
