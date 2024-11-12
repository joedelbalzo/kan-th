//React Imports
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navStyle, setNavStyle] = useState({ width: "0", left: "100%", right: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const navRef = useRef(null);

  const handleLogout = async () => {
    closeNav();
    await dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 250);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (navRef.current) {
      setPlaceholderHeight(navRef.current.offsetHeight);
    }
  }, []);

  const navbarStyle = {
    position: scrolled ? "fixed" : "absolute",
    top: scrolled ? "10px" : "0",
    width: scrolled ? "75%" : "100%",
    backgroundColor: scrolled ? "#f5f5f5" : "inherit",
    borderRadius: scrolled ? "4rem" : "0",
    height: "fit-content",
    zIndex: "1000",
    transition: "all 0.3s ease",
    left: "50%",
    transform: "translateX(-50%)",
    boxShadow: scrolled ? "0px 8px 1rem 1px #18333380" : "none",
  };

  const mobileNavBarStyle = {
    position: scrolled ? "absolute" : "inherit",
    right: scrolled ? "25%" : "unset",
  };

  const openNav = () => {
    setNavStyle({ width: "100%", left: "0%" });
  };

  const closeNav = () => {
    setNavStyle({ width: "0", left: "-100%" });
    setTimeout(() => {
      setNavStyle({ left: "100%" });
    }, 350);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div style={{ height: placeholderHeight }} />

      <div className="nav-container" ref={navRef} style={navbarStyle}>
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
            <div onClick={openNav} style={mobileNavBarStyle}>
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
    </>
  );
});

export default Nav;
