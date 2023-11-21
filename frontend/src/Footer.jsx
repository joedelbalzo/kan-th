//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Component Imports
import Login from "./Login";

//Store Imports
import { logout } from "./store";

const Footer = () => {
  const [admin, setAdmin] = useState(0);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const adminTools = () => {
    setAdmin((prevAdmin) => prevAdmin + 1);
  };

  useEffect(() => {
    setAdmin(0);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <>
      <div
        style={{
          fontSize: "calc(6px + .5vw)",
          paddingTop: "2rem",
          // paddingBottom: "1rem",
        }}
      >
        <div className="footer">
          <div className="footer-links">
            <Link to="" className="footer-links">
              About
            </Link>
            <Link to="/privacy" className="footer-links">
              Privacy
            </Link>
            <Link to="" className="footer-links">
              Terms{" "}
            </Link>
            <Link to="" className="footer-links">
              Home
            </Link>
            <Link to="/contact" className="footer-links">
              Contact and Feedback
            </Link>
          </div>

          <p onClick={() => adminTools()}>&copy; Vali. Email me at jdelbalzo99@gmail.com.</p>
          {admin >= 5 ? <Login /> : ""}
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
      </div>
    </>
  );
};
export default Footer;
