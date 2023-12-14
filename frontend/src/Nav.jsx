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
    closeNav();
    await dispatch(logout());
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
          <Link to="/portfolio" className="nav-links" id="large" style={{ fontSize: "18px" }}>
            portfolio
          </Link>
        )}

        <Link to="/blog" className="nav-links" id="large" style={{ fontSize: "18px" }}>
          <div>blog</div>
        </Link>
        <Link to="/about" className="nav-links" id="large" style={{ fontSize: "18px" }}>
          <div>about</div>
        </Link>
        {!auth.id ? (
          <Link to="/login" className="nav-links" id="large" style={{ fontSize: "18px" }}>
            <div>login</div>
          </Link>
        ) : (
          <Link to="/" onClick={handleLogout} className="nav-links" id="large" style={{ fontSize: "18px" }}>
            <div>logout</div>
          </Link>
        )}
        {auth.id && auth.adminStatus === true && (
          <Link to="/admin" className="nav-links" id="large" style={{ fontSize: "18px" }}>
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

            {auth.id && (
              <Link to="/portfolio" onClick={closeNav}>
                portfolio
              </Link>
            )}

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
              <Link to="/admin" onClick={closeNav}>
                <div>admin tools</div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Nav;
