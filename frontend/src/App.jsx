//React Imports
import React, { useEffect, Suspense, lazy, Profiler } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { HashRouter, Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

//Component Imports
import Loading from "./assets/Loading";
import Nav from "./Nav";
import Home from "./Home";
import Footer from "./Footer";
import LoginPage from "./LoginPage";
import PrivacyPolicy from "./PrivacyPolicy";
import Contact from "./Contact";
import About from "./About";

const BlogWrapper = lazy(() => import("./Blog/BlogWrapper"));
const Blogposts = lazy(() => import("./Blog/Blogposts"));
const Blogposts_Tags = lazy(() => import("./Blog/Blogposts_Tags"));
const Blogpost_Single = lazy(() => import("./Blog/Blogpost_Single"));

const AdminWrapper = lazy(() => import("./Admin/AdminWrapper"));
const AdminHome = lazy(() => import("./Admin/AdminHome"));
const AdminPosts = lazy(() => import("./Admin/AdminPosts"));
const AdminHelp = lazy(() => import("./Admin/AdminHelp"));
const AdminUsers = lazy(() => import("./Admin/AdminUsers"));
const AdminMailingList = lazy(() => import("./Admin/AdminMailingList"));
const OAuthHandler = lazy(() => import("./Components/OAuthHandler"));

const PortfolioWrapper = lazy(() => import("./Portfolio/PortfolioWrapper"));
const PortfolioHome = lazy(() => import("./Portfolio/PortfolioHome"));
const PortfolioPersonalize = lazy(() => import("./Portfolio/PortfolioPersonalize"));

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
  const { children } = props;

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const smoothScrollToTop = (duration) => {
    const scrollStep = -window.scrollY / (duration / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
      }, 15);
  };

  const handleClick = () => {
    smoothScrollToTop(200);
  };

  return (
    <Fade in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: "fixed", bottom: 24, right: 24, zIndex: "1000" }}>
        {children}
      </Box>
    </Fade>
  );
}

function App(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchPublishedBlogposts());
      dispatch(fetchTags());
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (auth && auth.username == "admin") {
    dispatch(fetchDraftedBlogposts());
  }

  function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
  }

  return (
    <div id="background-image">
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Nav />
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, margin: "0", padding: "0" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/client-route"
              element={
                <Suspense
                  fallback={
                    <div style={{ margin: "4rem auto" }}>
                      <Loading height={"100px"} width={"100px"} borderWidth={"20px"} />
                    </div>
                  }
                >
                  <OAuthHandler />{" "}
                </Suspense>
              }
            />
            {/* <Route path="/client-route" element={<PrivacyPolicy />} /> */}

            <Route path="/login" element={<LoginPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/blog/*"
              element={
                <Suspense
                  fallback={
                    <div style={{ margin: "4rem auto" }}>
                      <Loading height={"100px"} width={"100px"} borderWidth={"20px"} />
                    </div>
                  }
                >
                  <BlogWrapper />{" "}
                </Suspense>
              }
            >
              <Route index element={<Blogposts />} />
              <Route path="posts/:id" element={<Blogpost_Single />} />
              <Route path="tags/:id" element={<Blogposts_Tags />} />
            </Route>

            {auth.id && (
              <Route
                path="/portfolio/*"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading height={"100px"} width={"100px"} borderWidth={"20px"} />
                      </div>
                    }
                  >
                    <PortfolioWrapper />
                  </Suspense>
                }
              >
                <Route index element={<PortfolioHome />} />
                <Route path="home" element={<PortfolioHome />} />
                <Route path="edit" element={<PortfolioPersonalize />} />
              </Route>
            )}

            {auth.username == "admin" && (
              <Route
                path="/admin/*"
                element={
                  <Suspense
                    fallback={
                      <div>
                        <Loading height={"100px"} width={"100px"} borderWidth={"20px"} />
                      </div>
                    }
                  >
                    <AdminWrapper />
                  </Suspense>
                }
              >
                <Route index element={<AdminHome />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="help" element={<AdminHelp />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="mailinglist" element={<AdminMailingList />} />
              </Route>
            )}
          </Routes>
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
    </div>
  );
}

export default App;
