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
import SideNav from "./SideNav";
import { readableDate } from "./Blogposts";

//Store Imports
import { fetchBlogByID } from "./store";

//The is my terrible blog that really needs an overhaul: https://blog.usetheo.com/. I want it to look more consumery and friendly, rounded fonts, subtle colors.

const Blogpost_Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    state.blogposts.allBlogposts.find((post) => post.id.toString() === id)
  );

  if (!post) {
    return null;
  }

  let homePic;
  let bannerPic;
  let contentPic;

  for (let image of post.images) {
    if (image.position == "home") {
      homePic = image;
    } else if (image.position == "content") {
      contentPic = image;
    } else if (image.position == "banner") {
      bannerPic = image;
    }
  }

  console.log(homePic);

  // };
  //GOTTA INSERT A WAY TO CREDIT WHOEVER TOOK THE PHOTO. This should go in the database.
  const textReplace = (content) => {
    const bannerRegex = /%% banner picture goes here %%/g;
    const contentRegex = /%% content picture goes here %%/g;
    console.log(bannerPic);
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
        <div className="post-info">
          <SideNav />
        </div>{" "}
        <div className="post-content">
          <div className="post-title-div">
            <span className="post-date">Date: {readableDate(post.publishedAt)}</span>
            <h1>{post.title}</h1>
            <img src={homePic.awsPicURL} className="post-title-div-picture" />
            <div className="picture-caption">{homePic.picCaption}</div>
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
