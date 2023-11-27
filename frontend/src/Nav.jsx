//React Imports
import React, { useContext, useEffect, useState } from "react";
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

//mui
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const Nav = () => {
  const auth = useSelector((state) => state.auth);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [width, setWidth] = useState(0);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [currPage, setCurrPage] = useState("/");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  useEffect(() => {
    try {
      const width = window.innerWidth;
      setWidth(width);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setTimeout(() => {
      setCurrPage(window.location.hash.slice(2));
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="header-container">
      <Link to="/" style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}>
        <div className="company-name-and-logo">
          <GlassesIcon width="42px" height="38px" />
          <span className="brand-name">vali</span>
        </div>
      </Link>
      {!auth.id ? (
        <Link to="/login" className="nav-links" id="large" style={{ fontSize: "24px" }}>
          <div>login</div>
        </Link>
      ) : (
        <Link
          to="/"
          onClick={handleLogout}
          className="nav-links"
          id="large"
          style={{ fontSize: "24px" }}
        >
          <div>logout</div>
        </Link>
      )}
      <Link to="/blog" className="nav-links" id="large" style={{ fontSize: "24px" }}>
        <div>blog</div>
      </Link>
      <Link to="/" className="nav-links" id="large" style={{ fontSize: "24px" }}>
        <div>about</div>
      </Link>

      {/* {theme == "dark" ? (
        <button onClick={toggleTheme} id="large" className="theme-toggle">
          <FaRegMoon />
        </button>
      ) : (
        <button onClick={toggleTheme} id="large" className="theme-toggle">
          <FaRegSun />
        </button>
      )}
      <button onClick={toggleTheme} id="large" className="theme-toggle">
        <FaSearch />
      </button> */}

      <div className="menuItems" id="small">
        <Box
          sx={{
            padding: "0px",
            margin: "0px",
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            slotProps={{ className: "menu-paper-root" }}
            sx={{
              padding: 0,
              display: { xs: "block", md: "none" },
              "& .MuiPaper-root": { className: "menu-paper-root" },
            }}
          >
            <MenuItem key={"home"} onClick={scrollToTop}>
              <Link
                offset="10"
                to="/"
                id={currPage === "" ? "activelinks" : "links"}
                onClick={handleCloseNavMenu}
              >
                Home
              </Link>
            </MenuItem>
            <MenuItem key={"join"}>
              <Link
                offset="10"
                to="/join"
                id={currPage === "portfolio" ? "activelinks" : "links"}
                onClick={handleCloseNavMenu}
              >
                Login
              </Link>
            </MenuItem>
            <MenuItem key={"about"}>
              <Link
                offset="10"
                to="/about"
                id={currPage === "about" ? "activelinks" : "links"}
                onClick={handleCloseNavMenu}
              >
                About
              </Link>
            </MenuItem>
            <MenuItem key={"blog"}>
              <Link
                offset="10"
                to="/blog"
                id={currPage === "blog" ? "activelinks" : "links"}
                onClick={handleCloseNavMenu}
              >
                Blog
              </Link>
            </MenuItem>

            <MenuItem key={"login"}>
              <Link
                offset="10"
                to="/login"
                id={currPage === "login" ? "activelinks" : "links"}
                onClick={handleCloseNavMenu}
              >
                Login
              </Link>
            </MenuItem>
            {/* {theme == "dark" ? (
              <MenuItem key={"light"} onClick={toggleTheme}>
                <FaRegSun />
              </MenuItem>
            ) : (
              <MenuItem key={"dark"} onClick={toggleTheme}>
                <FaRegMoon />
              </MenuItem>
            )} */}
          </Menu>
        </Box>
      </div>
    </div>
  );
};

export default Nav;
