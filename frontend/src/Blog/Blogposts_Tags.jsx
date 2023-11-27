//React Imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

//Component Imports

import ShareButtons from "../ShareButtons";
import SideNav from "./SideNav";

//Store Imports

//Function Imports
import { readableDate, pics } from "../functions";

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
        {blogposts
          // .filter((post) => post !== blogposts[0])
          .map((blogpost) => {
            let { homePic } = pics(blogpost);
            return (
              <div className="post-content" key={blogpost.id}>
                <div className="post-container">
                  {homePic != null ? <img src={homePic.awsPicURL} className="post-div-picture" /> : ""}
                  <div className="post-title-div">
                    <span className="post-date">Date: {readableDate(blogpost.publishedAt)}</span>
                    <Link to={`/posts/${blogpost.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <h2>{blogpost.title}</h2>
                    </Link>

                    <h3 style={{ fontWeight: 400 }}>{blogpost.subtitle}</h3>
                    <div className="post-tags">
                      Tags:
                      {blogpost.tags[0] ? (
                        <Link key={blogpost.tags[0].id} style={{ marginLeft: 4 }}>
                          {blogpost.tags[0].tagName}
                        </Link>
                      ) : (
                        ""
                      )}
                      ,
                      {blogpost.tags[1] ? (
                        <Link key={blogpost.tags[1].id} style={{ marginLeft: 4 }}>
                          {blogpost.tags[1].tagName}
                        </Link>
                      ) : (
                        ""
                      )}
                      ,
                      {blogpost.tags[2] ? (
                        <Link key={blogpost.tags[2].id} style={{ marginLeft: 4 }}>
                          {blogpost.tags[2].tagName}{" "}
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                    <ShareButtons />
                    <div className="post-body">
                      {sampleText(blogpost.content)} <Link to={`/posts/${blogpost.id}`}>...read more</Link>
                    </div>
                  </div>
                  <div className="post-bottom-border"></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Blogposts_Tags;
