//React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Component Imports
import Login from "./Login";
import Nav from "./Nav";
import Blogposts from "./Blogposts";
import Blogposts_Tags from "./Blogposts_Tags";
import Blogpost_Single from "./Blogpost_Single";
import Footer from "./Footer";
import Search from "./Search";
import Admin from "./Admin/AdminHome";
import AdminPosts from "./Admin/AdminPosts";
import PrivacyPolicy from "./PrivacyPolicy";

//Store Imports
import { fetchBlogposts, fetchTags } from "./store";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBlogposts());
    dispatch(fetchTags());
    // fetch only this page?
  }, []);

  return (
    <div>
      <Nav />
      <div style={{ display: "flex", flexDirection: "column" }}></div>
      <hr />
      <div style={{ flexGrow: 100 }}>
        <Routes>
          <Route path="/" element={<Blogposts />} />
          <Route path="/posts/:id" element={<Blogpost_Single />} />
          <Route path="/tags/:id" element={<Blogposts_Tags />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {auth.id && <Route path="/admin" element={<Admin />} />}
          {auth.id && <Route path="/admin/posts" element={<AdminPosts />} />}
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
