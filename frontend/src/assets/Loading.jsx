import React from "react";
import "./Loading.css";

const Loading = ({ height, width, borderWidth }) => {
  return (
    <div className="container">
      <div className="spinner" style={{ height: height, width: width, borderWidth: borderWidth, borderTopWidth: borderWidth }}></div>
    </div>
  );
};

export default Loading;
