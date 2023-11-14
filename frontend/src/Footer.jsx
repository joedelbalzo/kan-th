//React Imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Component Imports
import Login from "./Login";

//Store Imports

const Footer = () => {
  const [admin, setAdmin] = useState(0);

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
        <p onClick={() => adminTools()}>&copy; Theo. Email me at jdelbalzo99@gmail.com.</p>
        {admin >= 5 ? <Login /> : ""}
      </div>
    </>
  );
};
export default Footer;
