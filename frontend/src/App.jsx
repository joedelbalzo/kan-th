//React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Component Imports
import Login from "./Login";
import Nav from "./Nav";
import Blogposts from "./Blogposts";
import Footer from "./Footer";
import Search from "./Search";
import Admin from "./Admin/AdminHome";
import AdminPosts from "./Admin/AdminPosts";

//Store Imports
import { fetchBlogposts } from "./store";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBlogposts());
    // dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <Nav />
      <div>
        <h1>Helping SMBs achieve their full potential.</h1>
      </div>
      <Routes>
        <Route path="/" element={<Blogposts />} />
        <Route path="/tags/:tag" element={<Search />} />
        {auth.id && <Route path="/admin" element={<Admin />} />}
        {auth.id && <Route path="/admin/posts" element={<AdminPosts />} />}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
