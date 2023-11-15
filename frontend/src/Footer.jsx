//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

//Component Imports
import Login from "./Login";

//Store Imports

const Footer = () => {
  const [admin, setAdmin] = useState(0);
  const auth = useSelector((state) => state.auth);

  const adminTools = () => {
    setAdmin((prevAdmin) => prevAdmin + 1);
  };

  useEffect(() => {
    setAdmin(0);
  }, []);

  return (
    <>
      <div
        style={{
          fontSize: "calc(6px + .5vw)",
          color: "rgb(200,200,200)",
          paddingTop: "2rem",
          paddingBottom: "1rem",
        }}
      >
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
    </>
  );
};
export default Footer;
