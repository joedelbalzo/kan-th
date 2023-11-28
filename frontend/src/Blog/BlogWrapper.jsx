import React from "react";
import { Outlet } from "react-router-dom";

const BlogWrapper = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BlogWrapper;
