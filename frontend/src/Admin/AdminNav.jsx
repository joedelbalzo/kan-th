//React Imports
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Component Imports

//Store Imports

//Component Style Imports
import "./AdminStyles.css";

const AdminNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(0);
  const [archive, setArchive] = useState(0);

  return (
    <div style={{ textAlign: "center" }}>
      Admin Tools
      <nav className="admin-home-nav">
        <Link to="/admin/users">Home</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/posts">Posts</Link>
        <Link to="/admin/mailinglist">Mailing List</Link>
      </nav>
    </div>
  );
};

export default AdminNav;
