//React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Component Imports
import Login from "./Login";
import Home from "./Home";
import Nav from "./Nav";
import Blogposts from "./Blog/Blogposts";
import Blogposts_Tags from "./Blog/Blogposts_Tags";
import Blogpost_Single from "./Blog/Blogpost_Single";
import Footer from "./Footer";
import Search from "./Search";
import Admin from "./Admin/AdminHome";
import AdminPosts from "./Admin/AdminPosts";
import PrivacyPolicy from "./PrivacyPolicy";
import Contact from "./Contact";

//Store Imports
import { fetchPublishedBlogposts, fetchTags, fetchDraftedBlogposts } from "./store";

//MUI imports
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";

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
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
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
    dispatch(fetchDraftedBlogposts());
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex", flexDirection: "column" }}></div>
      {/* <hr /> */}
      <div style={{ flexGrow: 100 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/" element={<Blogposts />} />
          <Route path="/blog/posts/:id" element={<Blogpost_Single />} />
          <Route path="/blog/tags/:id" element={<Blogposts_Tags />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />

          {auth.id && <Route path="/admin" element={<Admin />} />}
          {auth.id && <Route path="/admin/posts" element={<AdminPosts />} />}
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
  );
}

export default App;
