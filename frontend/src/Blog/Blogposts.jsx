//React Imports
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

//Component Imports

import ShareButtons from "../ShareButtons";
const SideNav = lazy(() => import("./SideNav"));

import { FadeComponent } from "../assets/FadeComponent";
import Loading from "../assets/Loading";

//Store Imports
// import { fetchPublishedBlogposts } from "./store";

//Function Imports
import { readableDate, pics } from "../functions";
// import { Fade } from "@mui/material";

const Blogposts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const blogposts = useSelector((state) => state.blogposts.allBlogposts);

  // useEffect(() => {
  //   if (!blogposts) {
  //     return <Loading />;
  //   } else {
  //     setLoading(false);
  //   }
  // }, [blogposts]);

  if (!blogposts) {
    return null;
  }

  if (!blogposts[0]) {
    return null;
  }

  const sampleText = (content) => {
    content = DOMPurify.sanitize(content);
    const arrContent = content.split(" ");
    content = arrContent.splice(0, 25).join(" ");
    return parse(content);
  };

  let headlinerPic;
  for (let image of blogposts[0].images) {
    if (image.position === "home") {
      headlinerPic = image;
    }
  }
  return (
    <FadeComponent>
      <div>
        <div className="post-headliner" key={blogposts[0].id}>
          <div className="post-container">
            {headlinerPic != null ? <img src={headlinerPic.awsPicURL} className="post-headline-div-picture" /> : ""}
            <div className="post-title-div">
              {/* <span className="post-date">Date: {readableDate(blogposts[0].publishedAt)}</span> */}
              <Link to={`/blog/posts/${blogposts[0].id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h2>{blogposts[0].title}</h2>
              </Link>

              <h3 style={{ fontWeight: 400 }}>{blogposts[0].subtitle}</h3>
              <div className="post-tags">
                Tags:
                {blogposts[0].tags[0] ? (
                  <Link to={`/blog/tags/${blogposts[0].tags[0].id}`} key={blogposts[0].tags[0].id} style={{ marginLeft: 4 }}>
                    {blogposts[0].tags[0].tagName}
                  </Link>
                ) : (
                  ""
                )}
                ,
                {blogposts[0].tags[1] ? (
                  <Link to={`/blog/tags/${blogposts[0].tags[1].id}`} key={blogposts[0].tags[1].id} style={{ marginLeft: 4 }}>
                    {blogposts[0].tags[1].tagName}
                  </Link>
                ) : (
                  ""
                )}
                ,
                {blogposts[0].tags[2] ? (
                  <Link to={`/blog/tags/${blogposts[0].tags[2].id}`} key={blogposts[0].tags[2].id} style={{ marginLeft: 4 }}>
                    {blogposts[0].tags[2].tagName}{" "}
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <ShareButtons fillColor={"whitesmoke"} />
              <div className="post-body">
                {sampleText(blogposts[0].content)} <Link to={`/blog/posts/${blogposts[0].id}`}>...read more</Link>
              </div>
            </div>
          </div>
        </div>

        {/* break between headliner and other latest posts */}
        {/* break between headliner and other latest posts */}
        {/* break between headliner and other latest posts */}

        <div className="post-grid">
          <div className="post-info">
            <Suspense
              fallback={
                <div>
                  <Loading />
                  Loading Posts...
                </div>
              }
            >
              <SideNav />
            </Suspense>
          </div>
          {blogposts
            .filter((post) => post !== blogposts[0])
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
                          <Link to={`/blog/tags/${blogpost.tags[0].id}`} key={blogpost.tags[0].id} style={{ marginLeft: 4 }}>
                            {blogpost.tags[0].tagName}
                          </Link>
                        ) : (
                          ""
                        )}
                        ,
                        {blogpost.tags[1] ? (
                          <Link to={`/blog/tags/${blogpost.tags[1].id}`} key={blogpost.tags[1].id} style={{ marginLeft: 4 }}>
                            {blogpost.tags[1].tagName}
                          </Link>
                        ) : (
                          ""
                        )}
                        ,
                        {blogpost.tags[2] ? (
                          <Link to={`/blog/tags/${blogpost.tags[2].id}`} key={blogpost.tags[2].id} style={{ marginLeft: 4 }}>
                            {blogpost.tags[2].tagName}{" "}
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                      <ShareButtons fillColor={"#183333"} />
                      <div className="post-body">
                        {sampleText(blogpost.content)} <Link to={`./blog/posts/${blogpost.id}`}>...read more</Link>
                      </div>
                    </div>
                    <div className="post-bottom-border"></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </FadeComponent>
  );
};

export default Blogposts;
