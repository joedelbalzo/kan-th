//React Imports
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

//Component Imports
const SubNav = lazy(() => import("./SubNav"));
const JoinMailingList = lazy(() => import("../Components/JoinMailingList"));
import { FadeComponent } from "../assets/FadeComponent";
import Loading from "../assets/Loading";
import { useScrollToTop } from "../Components/functions";

//Store Imports
import { fetchBlogByID } from "../store";

//Function Imports
import { readableDate, pics } from "../Components/functions";
import BackButton from "../assets/BackButton";
import ShareButtons from "../Components/ShareButtons";
import BlogpostsContent from "./BlogpostsContent";

const BlogpostsHome = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const tags = useSelector((state) => state.tags);
  const [selectedTag, setSelectedTag] = useState(1234);

  let blogposts = useSelector((state) => state.blogposts.allBlogposts);
  const [filteredPosts, setFilteredPosts] = useState(blogposts);

  useEffect(() => {
    if (!blogposts) {
      return <Loading />;
    } else {
      setLoading(false);
      setFilteredPosts(blogposts);
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

  //tag filtering
  const tagToAdd = {
    id: 1234,
    name: "All Posts",
  };

  if (!tags.some((tag) => tag.id === tagToAdd.id && tag.name === tagToAdd.name)) {
    tags.unshift(tagToAdd);
  }
  let posts = blogposts;
  const onTagClick = (ev) => {
    if (ev === "1234") {
      setFilteredPosts(blogposts);
      setSelectedTag(1234);
    } else {
      const filtered = blogposts.filter((post) => post.tags.some((tag) => tag.id === ev));
      setFilteredPosts(filtered);
      setSelectedTag(ev);
    }
  };

  //single blogpost click handling
  const openSingleBlog = (ev) => {
    console.log("attempt", ev);
    dispatch(fetchBlogByID(ev));
  };

  return (
    <FadeComponent>
      {blogposts.length < 1 ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <div className="post-headliner" key={headlinerPost.id}>
            <div className="post-container">
              {headlinerPic != null ? (
                <img src={headlinerPic.awsPicURL} alt={headlinerPic.altText} className="post-headline-div-picture" />
              ) : (
                ""
              )}
              <div className="post-title-div">
                <Link
                  to={`/blog/posts/${headlinerPost.id}`}
                  onClick={() => openSingleBlog(headlinerPost.id)}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h2>{headlinerPost.title}</h2>
                </Link>

                <div className="post-body">{sampleText(headlinerPost.content, 25)} </div>
                <Link to={`/blog/posts/${headlinerPost.id}`} id="read-more">
                  read more <BackButton facingRight={true} strokeColor="whitesmoke" />
                </Link>
              </div>
            </div>
          </div>
          {/* break between headliner and other latest posts */}
          {/* break between headliner and other latest posts */}
          {/* break between headliner and other latest posts */}

          <div className="post-grid">
            <div className="post-info" style={{ marginTop: "2rem" }}>
              <JoinMailingList />
              <div className="tag-styles-container" style={{ marginTop: "2rem", marginBottom: "0" }}>
                sort by tags:
                <select className="tag-styles" value={selectedTag} onChange={(event) => onTagClick(event.target.value)}>
                  {tags.map((tag) => {
                    return (
                      <option value={tag.id} key={tag.id}>
                        {tag.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* <BlogpostsContent
              filteredPosts={filteredPosts}
              headlinerPost={headlinerPost}
              openSingleBlog={openSingleBlog}
              sampleText={sampleText}
            /> */}

            {filteredPosts
              .filter((post) => post !== headlinerPost)
              .map((blogpost) => {
                let { homePic } = pics(blogpost);
                return (
                  <div className="post-content" key={blogpost.id}>
                    <div className="post-container">
                      {homePic != null ? <img src={homePic.awsPicURL} alt={homePic.altText} className="post-div-picture" /> : ""}
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
                        {/* <ShareButtons fillColor={"#183333"} /> */}
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
          </div>
        </div>
      )}
    </FadeComponent>
  );
};

export default BlogpostsHome;
