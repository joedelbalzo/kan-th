//React Imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
// import * as DOMPurify from "dompurify";

//Component Imports

import ShareButtons from "../Components/ShareButtons";
import SubNav from "./SubNav";
import "./BlogStyles.css";
import { useScrollToTop } from "../Components/functions";

//Store Imports

//Function Imports
import { readableDate, pics } from "../Components/functions";
import BackButton from "../assets/BackButton";

const BlogpostSingle = () => {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => state.blogposts.currentBlogpost);

  if (!post) {
    return null;
  }

  const { homePic, bannerPic, contentPic } = pics(post);

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
      <Link to="../" className="single-post-back-button">
        <BackButton strokeColor="#183333" /> Back to Blog
      </Link>
      <div className="single-post-grid">
        <div className="single-post-heading-div">
          <div className="single-post-headliner" key={post.id}>
            <h1 className="single-post-title">{post.title}</h1>
            <h2 className="single-post-subtitle">
              <span className="single-post-date">
                <br />
                Date: {readableDate(post.publishedAt)}
              </span>
              <div style={{ fontSize: "14px" }}>
                <ShareButtons fillColor={"whitesmoke"} post={post} />
              </div>
              <div className="single-post-tags">
                Tags:
                {post.tags[0] && (
                  <Link to={`/blog/tags/${post.tags[0].id}`} key={post.tags[0].id} style={{ marginLeft: 4 }}>
                    {post.tags[0].name}
                  </Link>
                )}
                ,
                {post.tags[1] && (
                  <Link to={`/blog/tags/${post.tags[1].id}`} key={post.tags[1].id} style={{ marginLeft: 4 }}>
                    {post.tags[1].name}
                  </Link>
                )}
                ,
                {post.tags[2] && (
                  <Link to={`/blog/tags/${post.tags[2].id}`} key={post.tags[2].id} style={{ marginLeft: 4 }}>
                    {post.tags[2].name}{" "}
                  </Link>
                )}
              </div>
            </h2>
            {homePic && (
              <div className="single-post-home-picture">
                <img src={homePic.awsPicURL} alt={homePic.altText} />
                {/* <span className="caption">{homePic.picCaption}</span> */}
              </div>
            )}
          </div>
        </div>

        <div className="single-post-body">
          {post.subtitle}
          {textReplace(post.content)}
        </div>
      </div>

      {/* <div className="post-info">
          <SubNav />
        </div> */}
      <div className="post-content">
        <br />
        <br />
        {/* <div className="post-content">{textReplace(post.content)}</div> */}
      </div>
    </div>
  );
};

export default BlogpostSingle;
