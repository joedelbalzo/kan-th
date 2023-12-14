import React from "react";

const Person = ({ width = "40px", height = "40px" }) => {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 -0.5 25 25"
      role="img"
      aria-label="Outline of a Person for adjusting Account Settings"
      xmlSpace="preserve"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        width: width,
        height: height,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="none"
        d="M14.9769 14H10.0229C8.56488 14.0724 7.2731 14.963 6.68693 16.3C5.97993 17.688 7.39093 19 9.03193 19H15.9679C17.6099 19 19.0209 17.688 18.3129 16.3C17.7268 14.963 16.435 14.0724 14.9769 14Z"
        stroke="#183333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="none"
        d="M15.4999 8C15.4999 9.65685 14.1568 11 12.4999 11C10.8431 11 9.49994 9.65685 9.49994 8C9.49994 6.34315 10.8431 5 12.4999 5C13.2956 5 14.0587 5.31607 14.6213 5.87868C15.1839 6.44129 15.4999 7.20435 15.4999 8Z"
        stroke="#183333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </svg>
  );
};

Person.defaultProps = {
  width: "40px",
  height: "60px",
};

export default Person;
