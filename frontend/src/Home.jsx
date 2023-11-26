//React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Component Imports

//Store Imports

function Home() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <div className="home-div">
        <div className="home-div-text">
          <h1 className="home-div-title">Financing shouldn't be a guessing game.</h1>
          <h2 className="home-div-subtitle">Small and Medium Business Owners Deserver Better.</h2>
          <div className="home-div-body">
            Vali is here to help small and medium business owners get competitive funding quickly
            and easily.
          </div>
        </div>
        <div className="home-div-image">
          <img
            src="../images/pexels-tim-mossholder-3345876.jpg"
            style={{ borderRadius: "2rem" }}
            //
            // id="home-div-image-shadow"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
