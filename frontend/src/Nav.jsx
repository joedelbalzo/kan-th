//React Imports
import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegSun, FaRegMoon, FaSearch } from "react-icons/fa";

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
  // const { auth } = useSelector((state) => state.auth);
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
      <Link to="/" style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}>
        <div className="company-name-and-logo">
          <GlassesIcon width="26px" height="20px" />
          <span className="brand-name">Vali</span>
        </div>
      </Link>
      {theme == "dark" ? (
        <button onClick={toggleTheme} className="theme-toggle">
          <FaRegMoon />
        </button>
      ) : (
        <button onClick={toggleTheme} className="theme-toggle">
          <FaRegSun />
        </button>
      )}
      <button onClick={toggleTheme} className="theme-toggle">
        <FaSearch />
      </button>
    </div>
  );
};

export default Nav;
