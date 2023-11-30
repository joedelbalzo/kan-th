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
import BackButton from "../assets/BackButton";
// import { Fade } from "@mui/material";

const Blogposts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const blogposts = useSelector((state) => state.blogposts.allBlogposts);

  useEffect(() => {
    if (!blogposts) {
      return <Loading />;
    } else {
      setLoading(false);
    }
  }, [blogposts]);

  if (!blogposts) {
    return null;
  }

  if (!blogposts[0]) {
    return null;
  }

  let headlinerPost = blogposts.find((post) => post.title == "What Is Your Valuation and Why Does It Matter?");
  let headlinerPic;
  if (!headlinerPost.images) {
    return;
  } else {
    for (let image of headlinerPost.images) {
      if (image.position === "home") {
        headlinerPic = image;
      }
    }
  }

  const sampleText = (content, length) => {
    content = DOMPurify.sanitize(content);
    const arrContent = content.split(". ");
    content = arrContent.splice(0, 2).join(". ") + ".";
    return parse(content);
  };

  return (
    <FadeComponent>
      <div>
        <div className="post-headliner" key={headlinerPost.id}>
          <div className="post-container">
            {headlinerPic != null ? <img src={headlinerPic.awsPicURL} className="post-headline-div-picture" /> : ""}
            <div className="post-title-div">
              <Link to={`/blog/posts/${headlinerPost.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h2>{headlinerPost.title}</h2>
              </Link>

              {/* <h3 style={{ fontWeight: 350 }}>{headlinerPost.subtitle}</h3> */}
              {/* <div className="post-tags" style={{ fontWeight: 350 }}>
                Tags:
                {headlinerPost.tags[0] && (
                  <Link to={`/blog/tags/${headlinerPost.tags[0].id}`} key={headlinerPost.tags[0].id} style={{ marginLeft: 4 }}>
                    {headlinerPost.tags[0].name}
                  </Link>
                )}
                ,
                {headlinerPost.tags[1] && (
                  <Link to={`/blog/tags/${headlinerPost.tags[1].id}`} key={headlinerPost.tags[1].id} style={{ marginLeft: 4 }}>
                    {headlinerPost.tags[1].name}
                  </Link>
                )}
                ,
                {headlinerPost.tags[2] && (
                  <Link to={`/blog/tags/${headlinerPost.tags[2].id}`} key={headlinerPost.tags[2].id} style={{ marginLeft: 4 }}>
                    {headlinerPost.tags[2].name}{" "}
                  </Link>
                )}
              </div> */}
              <div className="post-share-buttons">{/* <ShareButtons fillColor={"whitesmoke"} style={{ fontWeight: 350 }} /> */}</div>
              <div className="post-body">
                {sampleText(headlinerPost.content, 25)}{" "}
                <Link to={`/blog/posts/${headlinerPost.id}`}>
                  read more <BackButton facingRight={true} strokeColor="whitesmoke" />
                </Link>
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
            .filter((post) => post !== headlinerPost)
            .map((blogpost) => {
              let { homePic } = pics(blogpost);
              return (
                <div className="post-content" key={blogpost.id}>
                  <div className="post-container">
                    {homePic != null ? <img src={homePic.awsPicURL} className="post-div-picture" /> : ""}
                    <div className="post-title-div">
                      <Link to={`/blog/posts/${blogpost.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h2>{blogpost.title}</h2>
                      </Link>

                      <h3 style={{ fontWeight: 350 }}>{blogpost.subtitle}</h3>

                      <div className="post-tags" style={{ marginTop: "1rem" }}>
                        <span className="post-date">Date: {readableDate(blogpost.publishedAt)} </span>
                        || Tags:
                        {blogpost.tags[0] ? (
                          <Link to={`/blog/tags/${blogpost.tags[0].id}`} key={blogpost.tags[0].id} style={{ marginLeft: 4 }}>
                            {blogpost.tags[0].name}
                          </Link>
                        ) : (
                          ""
                        )}
                        ,
                        {blogpost.tags[1] ? (
                          <Link to={`/blog/tags/${blogpost.tags[1].id}`} key={blogpost.tags[1].id} style={{ marginLeft: 4 }}>
                            {blogpost.tags[1].name}
                          </Link>
                        ) : (
                          ""
                        )}
                        ,
                        {blogpost.tags[2] ? (
                          <Link to={`/blog/tags/${blogpost.tags[2].id}`} key={blogpost.tags[2].id} style={{ marginLeft: 4 }}>
                            {blogpost.tags[2].name}{" "}
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <ShareButtons fillColor={"#183333"} /> */}
                      <div className="post-body">
                        {sampleText(blogpost.content, 40)}
                        <Link to={`./blog/posts/${blogpost.id}`}>
                          read more
                          <BackButton height={"16px"} facingRight={true} strokeColor="#183333" />
                        </Link>
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
