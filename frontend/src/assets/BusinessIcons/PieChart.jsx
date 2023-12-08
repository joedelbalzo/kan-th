import React from "react";

const PieChart = ({ width, height }) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 -0.5 25 25"
      role="img"
      aria-label="Image of a pie chart graph."
      xmlSpace="preserve"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        color: "#030712",
        width: width,
        height: height,
      }}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx=".2" dy=".2" stdDeviation=".2" floodColor="rgba(200,200,200,1)" />
        </filter>
        <filter id="shadow2">
          <feDropShadow dx=".4" dy=".4" stdDeviation=".2" floodColor="rgba(200,200,200,.1)" />
        </filter>
      </defs>
      <path
        fill="#96ccee"
        d="M9.85,4.28a.59.59,0,0,1,.44.15.54.54,0,0,1,.18.41c0,1.11,0,3.43,0,4.41a.58.58,0,0,1-.45.56,3.42,3.42,0,1,0,4.25,3.81.55.55,0,0,1,.55-.49c1,0,3.34,0,4.4,0a.52.52,0,0,1,.39.17.54.54,0,0,1,.15.4,8.89,8.89,0,1,1-9.92-9.4Z"
        filter="url(#shadow)"
      ></path>
      <path
        fill="#ffeabb"
        d="M13.5,2.34l-.38.07V7a.58.58,0,0,0,.5.57,3.38,3.38,0,0,1,2.88,2.86.56.56,0,0,0,.56.49c1,0,3.29,0,4.36,0a.56.56,0,0,0,.42-.18.57.57,0,0,0,.15-.42A8.89,8.89,0,0,0,13.55,2C13.4,2,13.64,2.34,13.5,2.34Z"
      ></path>
      <path
        fill="#f7bf75"
        d="M13.12,2.2a.19.19,0,0,1,.19-.2h.35A8.33,8.33,0,0,1,22,9.76l0,.53a.57.57,0,0,1-.15.42.56.56,0,0,1-.42.18H18.7a8.88,8.88,0,0,0-5.58-8.25Z"
        filter="url(#shadow2)"
      ></path>
      <path
        fill="#6f73d5"
        d="M17.07,13.11a8.89,8.89,0,0,1-7.53,8.78A8.81,8.81,0,0,0,10.9,22a8.9,8.9,0,0,0,8.87-8.32.59.59,0,0,0-.15-.4.55.55,0,0,0-.39-.16Z"
      ></path>
    </svg>
  );
};

PieChart.defaultProps = {
  width: "200px",
  height: "200px",
};

export default PieChart;
