//React Imports
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

//Component Imports
const SubNav = lazy(() => import("./SubNav"));
import { FadeComponent } from "../assets/FadeComponent";
import Loading from "../assets/Loading";
import { useScrollToTop } from "../Components/functions";

//Store Imports
import { fetchBlogByID } from "../store";

//Function Imports
import { readableDate, pics } from "../Components/functions";
import BackButton from "../assets/BackButton";

const BlogpostsContent = ({ filteredPosts, headlinerPost, showPictures = true, maxPosts = null }) => {
  const allBlogposts = useSelector((state) => state.blogposts.allBlogposts);

  if (!filteredPosts) {
    filteredPosts = allBlogposts.filter((post) => post.title !== "What Is Your Valuation and Why Does It Matter?");
  }
  if (!headlinerPost) {
    headlinerPost = allBlogposts.find((post) => post.title === "What Is Your Valuation and Why Does It Matter?");
  }

  const sampleText = (content, length) => {
    content = DOMPurify.sanitize(content);
    const arrContent = content.split(". ");
    content = arrContent.splice(0, 2).join(". ") + ".";
    return parse(content);
  };
  const openSingleBlog = (ev) => {
    console.log("attempt", ev);
    dispatch(fetchBlogByID(ev));
  };

  if (maxPosts != null) {
    filteredPosts = filteredPosts.slice(0, maxPosts);
  }

  return (
    <FadeComponent>
      {filteredPosts.map((blogpost) => {
        let { homePic } = pics(blogpost);
        return (
          <div className="post-content" key={blogpost.id}>
            <div className="post-container">
              {showPictures && homePic != null ? <img src={homePic.awsPicURL} alt={homePic.altText} className="post-div-picture" /> : ""}
              <div className="post-title-div">
                <Link
                  to={`/blog/posts/${blogpost.id}`}
                  onClick={() => openSingleBlog(blogpost.id)}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h2>{blogpost.title}</h2>
                </Link>

                <h3 style={{ fontWeight: 350 }}>{blogpost.subtitle}</h3>

                <div className="post-tags" style={{ marginTop: "1rem" }}>
                  <span className="post-date">Date: {readableDate(blogpost.publishedAt)} </span>
                  || Tags:
                  {blogpost.tags[0] ? (
                    <Link onClick={() => onTagClick(blogpost.tags[0].id)} key={blogpost.tags[0].id} style={{ marginLeft: 4 }}>
                      {blogpost.tags[0].name}
                    </Link>
                  ) : (
                    ""
                  )}
                  {blogpost.tags[1] ? (
                    <Link onClick={() => onTagClick(blogpost.tags[1].id)} key={blogpost.tags[1].id}>
                      , {blogpost.tags[1].name}
                    </Link>
                  ) : (
                    ""
                  )}
                  {blogpost.tags[2] ? (
                    <Link onClick={() => onTagClick(blogpost.tags[2].id)} key={blogpost.tags[2].id}>
                      , {blogpost.tags[2].name}{" "}
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div className="post-body">
                  {sampleText(blogpost.content, 40)}
                  <Link to={`./blog/posts/${blogpost.id}`}>
                    read more
                    <BackButton height={"16px"} facingRight={true} strokeColor="#183333" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="post-bottom-border"> </div>
          </div>
        );
      })}
    </FadeComponent>
  );
};

const defaultOpenSingleBlog = (id) => {
  console.log(`Open blog post with id: ${id}`);
  // Replace this with dispatch logic if needed
};

const defaultSampleText = (content, length) => {
  content = DOMPurify.sanitize(content);
  const arrContent = content.split(". ");
  content = arrContent.splice(0, length).join(". ") + ".";
  return parse(content);
};

export default BlogpostsContent;
