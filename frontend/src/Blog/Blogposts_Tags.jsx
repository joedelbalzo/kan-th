//React Imports
import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

//Component Imports

import ShareButtons from "../Components/ShareButtons";
import SubNav from "./SubNav";

//Store Imports

//Function Imports
import { readableDate, pics } from "../Components/functions";

const Blogposts_Tags = () => {
  const blogposts = useSelector((state) => state.blogposts.filteredBlogposts);
  let { id } = useParams();
  // console.log(id);

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

  console.log("confirm code usage in console");

  return (
    <div>
      <div className="post-grid">
        <div className="post-info">
          <SubNav id={id} />
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
                    <Link to={`/blog/posts/${blogpost.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <h2>{blogpost.title}</h2>
                    </Link>

                    <h3 style={{ fontWeight: 400 }}>{blogpost.subtitle}</h3>
                    <div className="post-tags">
                      Tags:
                      {blogpost.tags[0] ? (
                        <Link key={blogpost.tags[0].id} to={`/blog/tags/${blogpost.tags[0].id}`} style={{ marginLeft: 4 }}>
                          {blogpost.tags[0].name}
                        </Link>
                      ) : (
                        ""
                      )}
                      ,
                      {blogpost.tags[1] ? (
                        <Link key={blogpost.tags[1].id} to={`/blog/tags/${blogpost.tags[1].id}`} style={{ marginLeft: 4 }}>
                          {blogpost.tags[1].name}
                        </Link>
                      ) : (
                        ""
                      )}
                      ,
                      {blogpost.tags[2] ? (
                        <Link key={blogpost.tags[2].id} to={`/blog/tags/${blogpost.tags[2].id}`} style={{ marginLeft: 4 }}>
                          {blogpost.tags[2].name}{" "}
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                    <ShareButtons post={blogpost} />
                    <div className="post-body">
                      {sampleText(blogpost.content)} <Link to={`/blog/posts/${blogpost.id}`}>...read more</Link>
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
