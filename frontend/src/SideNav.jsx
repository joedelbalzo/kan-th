//React Imports
import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//Component Imports

import "../styles.css";

//Store Imports
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogpostsByTag } from "./store";

const SideNav = () => {
  const tags = useSelector((state) => state.tags);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!tags) {
    return null;
  }

  const onTagClick = async (tag) => {
    await dispatch(fetchBlogpostsByTag(tag.id));
    navigate(`/tags/${tag.id}`);
  };

  return (
    <div>
      Search by Tag:
      <ul>
        {tags.map((tag) => {
          return (
            <li key={tag.id} style={{ listStyleType: "none" }}>
              <Link onClick={() => onTagClick(tag)}>{tag.tagName}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideNav;