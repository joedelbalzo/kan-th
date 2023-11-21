//React Imports
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

//Component Imports

//Store Imports

function Home() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return <div>Hello.</div>;
}

export default Home;
