import React from "react";

const Hamburger = ({ width = "30px", height = "30px" }) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      role="img"
      xmlSpace="preserve"
      style={{
        display: "inline-block",
        display: "inline-block",
        verticalAlign: "middle",
        color: "none",
        width: width,
        height: height,
      }}
    >
      <path d="M4 6H20M4 12H20M4 18H20" stroke="#183333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
};

Hamburger.defaultProps = {
  width: "30px",
  height: "30px",
};

export default Hamburger;
