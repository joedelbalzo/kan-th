import React from "react";

const BackButton = ({ width = "20px", height = "40px", facingRight = false, strokeColor = "#f5f5f5" }) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 -0.5 25 25"
      role="img"
      aria-label="Image of a Back Button"
      xmlSpace="preserve"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        color: "none",
        width: width,
        height: height,
        transform: facingRight ? "scaleX(-1)" : "none",
      }}
    >
      <path d="M15 7L10 12L15 17" fill="none" stroke={strokeColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
};

BackButton.defaultProps = {
  width: "20px",
  height: "40px",
};

export default BackButton;
