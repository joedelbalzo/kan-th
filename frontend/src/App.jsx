//React Imports
import React, { useEffect, Suspense, lazy, Profiler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Component Imports
import Loading from "./assets/Loading";
import Login from "./Login";
import Home from "./Home";
import Nav from "./Nav";

const Blogposts = lazy(() => import("./Blog/Blogposts"));
const Blogposts_Tags = lazy(() => import("./Blog/Blogposts_Tags"));
const Blogpost_Single = lazy(() => import("./Blog/Blogpost_Single"));

// import Blogposts from "./Blog/Blogposts";
// import Blogposts_Tags from "./Blog/Blogposts_Tags";
// import Blogpost_Single from "./Blog/Blogpost_Single";
import Footer from "./Footer";
import Search from "./Search";
const Admin = lazy(() => import("./Admin/AdminHome"));
const AdminPosts = lazy(() => import("./Admin/AdminPosts"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const Contact = lazy(() => import("./Contact"));

//Store Imports
import { fetchPublishedBlogposts, fetchTags, fetchDraftedBlogposts } from "./store";

//MUI imports
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

//scroll
function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: "fixed", bottom: 24, right: 24 }}>
        {children}
      </Box>
    </Fade>
  );
}

function App(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPublishedBlogposts());
    dispatch(fetchTags());
  }, []);

  if (auth && auth.username == "admin") {
    dispatch(fetchDraftedBlogposts());
  }

  function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ position: "sticky" }}>
        {/* <Profiler id="Nav" onRender={onRender}> */}
        <Nav />
        {/* </Profiler> */}
      </div>
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* <Profiler id="Home" onRender={onRender}> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/blog/"
            element={
              <Suspense
                fallback={
                  <div>
                    <Loading />
                    Loading Posts...
                  </div>
                }
              >
                <Blogposts />{" "}
              </Suspense>
            }
          />
          <Route
            path="/blog/posts/:id"
            element={
              <Suspense
                fallback={
                  <div>
                    <Loading />
                    Loading Posts...
                  </div>
                }
              >
                <Blogpost_Single />{" "}
              </Suspense>
            }
          />
          <Route
            path="/blog/tags/:id"
            element={
              <Suspense
                fallback={
                  <div>
                    <Loading />
                    Loading Posts...
                  </div>
                }
              >
                <Blogposts_Tags />{" "}
              </Suspense>
            }
          />
          <Route
            path="/privacy"
            element={
              <Suspense
                fallback={
                  <div>
                    <Loading />
                    Loading Privacy Policy...
                  </div>
                }
              >
                <PrivacyPolicy />{" "}
              </Suspense>
            }
          />
          <Route path="/contact" element={<Contact />} />

          {auth.username == "admin" && (
            <Route
              path="/admin"
              element={
                <Suspense
                  fallback={
                    <div>
                      <Loading />
                      Loading Admin...
                    </div>
                  }
                >
                  <Admin />{" "}
                </Suspense>
              }
            />
          )}
          {auth.username == "admin" && (
            <Route
              path="/admin/posts"
              element={
                <Suspense
                  fallback={
                    <div>
                      <Loading />
                      Loading Admin Posts...
                    </div>
                  }
                >
                  <AdminPosts />{" "}
                </Suspense>
              }
            />
          )}
        </Routes>
        {/* </Profiler> */}
      </div>
      <ScrollTop {...props}>
        <Fab
          size="large"
          sx={{
            border: "1px solid rgb(20,30,70)",
            height: "36px",
            width: "36px",
            borderRadius: "4px",
            boxShadow: "2px 2px 2px rgba(20,30,70, .5)",
          }}
          className="scroll-button"
          aria-label="scroll back to top"
        >
          <ArrowUpwardOutlinedIcon />
        </Fab>
      </ScrollTop>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
