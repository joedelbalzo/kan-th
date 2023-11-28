import React from "react";
import { Outlet } from "react-router-dom";

const BlogWrapper = () => {
  return (
    <div>
      <h1>Blog Section</h1>
      <Outlet />
    </div>
  );
};

export default BlogWrapper;
