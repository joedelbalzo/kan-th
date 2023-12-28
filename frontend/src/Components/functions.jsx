export const pics = (post) => {
  let homePic = null;
  let bannerPic = null;
  let contentPic = null;
  if (post.images) {
    for (let image of post.images) {
      if (image.position === "home") {
        homePic = image;
      } else if (image.position === "content") {
        contentPic = image;
      } else if (image.position === "banner") {
        bannerPic = image;
      }
    }
  }
  return { homePic, bannerPic, contentPic };
};

export const readableDate = (date) => {
  // console.log(date);
  if (!date) {
    return null;
  }
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, date.indexOf("T"));
  let months = [
    0,
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (month[0] == 0) {
    month = months[month[1]];
  } else month = months[month];

  return `${month} ${day}, ${year}`;
};

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
};

export const formatToDollar = (value) => {
  const number = parseFloat(value);
  if (isNaN(number)) {
    return "Invalid number";
  }
  return "$" + number.toLocaleString("en-US");
};
