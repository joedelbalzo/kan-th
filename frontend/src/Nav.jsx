//React Imports
import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//Component Imports
import Login from "./Login";
import Admin from "./Admin/AdminHome";
import GlassesIcon from "./assets/GlassesIcon";
import { ThemeContext } from "./ThemeContext";
import "../styles.css";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store";

const Nav = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <div className="header-container">
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="company-name-and-logo">
          <GlassesIcon width="24px" height="20px" />
          <span className="brand-name">theo</span>
        </div>
      </Link>

      <button onClick={toggleTheme} className="theme-toggle">
        Toggle Theme
      </button>
      {auth.id != null ? (
        <div>
          <Link to="/admin" className="theme-toggle">
            Admin Tools
          </Link>
          <button onClick={() => handleLogout()} className="theme-toggle">
            Admin Logout
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Nav;
