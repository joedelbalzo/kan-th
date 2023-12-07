//React Imports
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { FaRegSun, FaRegMoon, FaSearch } from "react-icons/fa";

//Component Imports

import GlassesIcon from "./assets/GlassesIcon";
import "../styles.css";
import Hamburger from "./assets/Hamburger";

//Store Imports
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { logout } from "./store";

const Nav = React.memo(() => {
  let auth = useSelector((state) => state.auth, shallowEqual);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [currPage, setCurrPage] = useState("/");

  // const windowWidth = useRef(window.innerWidth);
  // console.log("width is", windowWidth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logout());
    auth = null;
    console.log(auth);
    localStorage.clear();
    navigate("/");
  };

  const [navStyle, setNavStyle] = useState({ width: "0", left: "100%", right: 0 });

  const openNav = () => {
    setNavStyle({ width: "100%", left: "0%" });
  };

  const closeNav = () => {
    setNavStyle({ width: "0", left: "-100%" });
    setTimeout(() => {
      setNavStyle({ left: "100%" });
    }, 350);
  };

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="nav-container">
      <div className="header-container">
        <Link to="/" style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}>
          <div className="company-name-and-logo">
            <GlassesIcon width="36px" height="30px" />
            <span className="brand-name">vali</span>
          </div>
        </Link>

        {auth.id && (
          <Link to="/portfolio" className="nav-links" id="large" style={{ fontSize: "22px" }}>
            portfolio
          </Link>
        )}

        <Link to="/blog" className="nav-links" id="large" style={{ fontSize: "22px" }}>
          <div>blog</div>
        </Link>
        <Link to="/about" className="nav-links" id="large" style={{ fontSize: "22px" }}>
          <div>about</div>
        </Link>
        {!auth.id ? (
          <Link to="/login" className="nav-links" id="large" style={{ fontSize: "22px" }}>
            <div>login</div>
          </Link>
        ) : (
          <Link to="/" onClick={handleLogout} className="nav-links" id="large" style={{ fontSize: "22px" }}>
            <div>logout</div>
          </Link>
        )}
        {auth.id && auth.adminStatus === true && (
          <Link to="/admin" className="nav-links" id="large" style={{ fontSize: "22px" }}>
            <div>admin tools</div>
          </Link>
        )}

        <div className="menuItems" id="small">
          <div onClick={openNav}>
            <Hamburger />
          </div>

          <div id="nav-mobile" className="nav-mobile" style={navStyle}>
            <a onClick={closeNav} className="closebtn">
              ×
            </a>
            <Link to="/" style={{ textDecoration: "none", color: "whitesmoke", flexGrow: 1 }} onClick={closeNav}>
              <div className="company-name-and-logo">
                <GlassesIcon width="36px" height="30px" color="whitesmoke" />
                <span className="brand-name">vali</span>
              </div>
            </Link>

            {auth.id && <Link to="/portfolio">portfolio</Link>}

            <Link to="/blog" onClick={closeNav}>
              <div>blog</div>
            </Link>
            <Link to="/about" onClick={closeNav}>
              <div>about</div>
            </Link>
            {!auth.id ? (
              <Link to="/login" onClick={closeNav}>
                <div>login</div>
              </Link>
            ) : (
              <Link to="/" onClick={handleLogout}>
                <div>logout</div>
              </Link>
            )}
            {auth.id && auth.adminStatus === true && (
              <Link to="/admin">
                <div>admin tools</div>
              </Link>
            )}
          </div>
        </div>

        {/* 
          <Box
            sx={{
              padding: "0px",
              margin: "0px",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
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
              onClose={() => setAnchorElNav(null)}
              slotProps={{ className: "menu-paper-root" }}
              sx={{
                padding: 0,
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": { className: "menu-paper-root" },
              }}
            >
              <MenuItem key={"home"} onClick={scrollToTop}>
                <Link offset="10" to="/" id={currPage === "" ? "activelinks" : "links"} onClick={() => setAnchorElNav(null)}>
                  Home
                </Link>
              </MenuItem>
              <MenuItem key={"join"}>
                <Link offset="10" to="/join" id={currPage === "portfolio" ? "activelinks" : "links"} onClick={() => setAnchorElNav(null)}>
                  Login
                </Link>
              </MenuItem>
              <MenuItem key={"about"}>
                <Link offset="10" to="/about" id={currPage === "about" ? "activelinks" : "links"} onClick={() => setAnchorElNav(null)}>
                  About
                </Link>
              </MenuItem>
              <MenuItem key={"blog"}>
                <Link offset="10" to="/blog" id={currPage === "blog" ? "activelinks" : "links"} onClick={() => setAnchorElNav(null)}>
                  Blog
                </Link>
              </MenuItem>

              <MenuItem key={"login"}>
                <Link offset="10" to="/login" id={currPage === "login" ? "activelinks" : "links"} onClick={() => setAnchorElNav(null)}>
                  Login
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </div> */}
      </div>
    </div>
  );
});

export default Nav;
