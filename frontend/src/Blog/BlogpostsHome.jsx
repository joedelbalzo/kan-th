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
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right top, #f1f1f1, #e8ebf280 30%, #d4e3ee80 50%, #bddde5 80%, /*#a9d6d5, */ #86bbd8), url('https://images.unsplash.com/photo-1690321607902-2799a1e8eaaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            height: "fit-content",
            filter: "saturate(90%) brightness(110%)",
            backgroundSize: "130%",
            boxShadow: "inset 0 0 0 1000px #d4e3eecc",
            padding: "0 0 3rem 0",
          }}
        >
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
                          {blogpost.tags.map((tag, index) => (
                            <React.Fragment key={tag.id}>
                              {index > 0 && ", "}
                              <Link to={`/blog/tags/${tag.id}`} style={{ marginLeft: 4 }}>
                                {tag.name}
                              </Link>
                            </React.Fragment>
                          ))}
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
